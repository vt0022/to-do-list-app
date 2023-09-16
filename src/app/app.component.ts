import { Component, OnInit } from '@angular/core';
import { ToDo } from './model/to-do';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'to-do-todoList-app';
  todoList: ToDo[] = [];
  todo = new ToDo();
  index?: number;

  constructor() {}

  ngOnInit(): void {
    this.getAllToDoes();
  }

  saveToDo() {
    // Check if new to do
    if (!this.index) {
      // New to-do
      this.todo.status = false;
      this.todoList.push(this.todo);
    } else {
      this.todoList[this.index] = this.todo;
      this.index = undefined;
    }
    this.save();
    this.todo = new ToDo();
  }

  deleteToDo(index: number) {
    if (this.todoList.length > index) {
      this.todoList.splice(index, 1);
      this.save();
    }
  }

  save() {
    localStorage.setItem('todo', JSON.stringify(this.todoList));
  }

  getAllToDoes() {
    let value = localStorage.getItem('todo');
    if (value != '' && value != null && typeof value != 'undefined') {
      this.todoList = JSON.parse(value!);
    }
  }

  getAToDo(index: number) {
    let value = localStorage.getItem('todo');
    if (value != '' && value != null && typeof value != 'undefined') {
      this.index = index; // Pass index of the to-do needed to be updated
      this.todo = JSON.parse(value!)[index];
    }
  }

  updateStatus(index: number) {
    this.todoList[index].status
      ? (this.todoList[index].status = false)
      : (this.todoList[index].status = true);
    this.save();
  }
}
