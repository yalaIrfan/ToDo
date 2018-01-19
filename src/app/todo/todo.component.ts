import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {TodoListComponent} from './todo-list/todo-list.component';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [DatePipe,TodoListComponent]
})
export class TodoComponent implements OnInit {
  bsValue: Date = new Date();
  bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private fb: FormBuilder, private datePipe: DatePipe, private todoListComponent:TodoListComponent) { 
    this.bsConfig.containerClass ="theme-dark-blue";
    this.bsConfig.showWeekNumbers=false;
    this.bsConfig.dateInputFormat="DD/MM/YYYY";

  }
  rForm: FormGroup;
  todo: Todo;
  list: any[];
  ngOnInit() {
    

    this.rForm = this.fb.group({date: null,
      'name': [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(75)
      ])]
      ,
      'plans': [null, [
        Validators.maxLength(100),

      ]]

    });
    this.getlisttodos();

  }


  onSubmit(form) {


    this.todo = new Todo();
    let pasDate: Date = new Date(this.bsValue.getFullYear(), this.bsValue.getMonth() - 1, this.bsValue.getDate());

    let Newdob = this.datePipe.transform(pasDate, 'dd/MM/yyyy');

    form.value.date = Newdob;

    this.todo.id = Math.random() * 100000000000000;
    this.todo.name = form.value.name;
    this.todo.plans = form.value.plans;
    this.todo.date = form.value.date;

    this.list = this.getTodos();
    this.todoListComponent.getOldTodoList();
        
    if (this.list != null) {
      this.list.push(this.todo);
      this.localStorageService(this.list);
    }
    else
    {
      this.localStorageService([this.todo]);
    }

    this.todoListComponent.getOldTodoList();
    this.rForm.reset();
  }

  localStorageService(currentForm) {
    if (currentForm) {
      const storage = localStorage;
      storage.setItem("todo", JSON.stringify(currentForm));
    }
  }

  getTodos() {
    let todos = JSON.parse(localStorage.getItem("todo"));
    return todos;
  }

  
  getlisttodos() {
    return this.list;
  }


  //   function getUsers() {

  //     return JSON.parse(localStorage.todos);
  // }
}
class Todo {
  id: number;
  name: string;
  plans?: string;
  date: string;
}