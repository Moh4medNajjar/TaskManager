import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
[x: string]: any;

  constructor(private TaskService: TaskService, private cdr: ChangeDetectorRef){}

  tasksList:any[] = [];
  taskName!: String;
  modifyName!: String;


  ngOnInit(): void {
    this.TaskService.getTasks().subscribe((tasks) => {
      this.tasksList = this.tasksList.concat(tasks)
      console.log(this.tasksList);
    })




  }

  deleteThisTask(taskId: String): void {
    this.TaskService.deleteTask(taskId).subscribe((deletedTask) => {
      console.log("Task deleted successfully !");
      const taskToDelete = this.tasksList.find(task => task._id === taskId);
      taskToDelete.isHidden = true
    })
  }

  switchStatus(taskId: String): void{
    this.TaskService.getOneTask(taskId).subscribe((taskFound) => {
      console.log(taskFound.title)
      taskFound.isCompleted = !taskFound.isCompleted;
      const taskToSwitchStatus = this.tasksList.find(task => task._id === taskId);
      taskToSwitchStatus.isCompleted = !taskToSwitchStatus.isCompleted;
      this.TaskService.updateTask(taskId, { isCompleted: taskFound.isCompleted }).subscribe();
    })
  }

  createNewTask(taskName: String ) {
    this.TaskService.createTask(taskName).subscribe((createdTask) => {
      this.tasksList.push(createdTask);
    })
    this.taskName = '';
  }

  editTask(newTitle: String){
    this.modifyName = newTitle;
    console.log(this.modifyName)
  }



  modifyTask(taskId: String, newName: String): void {
    console.log('Before update:', this.tasksList);

    this.TaskService.updateTask(taskId, { title: newName }).subscribe(
      (modifiedTask) => {
        console.log('Modified task from service:', modifiedTask);

        const modifiedIndex = this.tasksList.findIndex((task) => task._id === taskId);

        if (modifiedIndex !== -1) {
          // Create a new array instance with the updated task
          this.tasksList = [
            ...this.tasksList.slice(0, modifiedIndex),
            modifiedTask,
            ...this.tasksList.slice(modifiedIndex + 1),
          ];

          this.cdr.detectChanges(); // Manually trigger change detection
          console.log('After update:', this.tasksList);
        } else {
          console.log('Task not found in the array.');
          this.cdr.detectChanges(); // Manually trigger change detection
        }
      },
      (error) => {
        console.error('Error updating task:', error);
        this.cdr.detectChanges(); // Manually trigger change detection
      },
      () => {
        this.cdr.detectChanges(); // Manually trigger change detection
        console.log('Update task request completed.');
      }
    );

    this.modifyName = '';

  }


}

