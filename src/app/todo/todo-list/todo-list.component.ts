import { Component, OnInit,Input } from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  
  @Input() currentList:any;
  todos:any;
  tos:any;
  constructor() { }

  ngOnInit() {
  
console.log('iiiiiii ',this.currentList);
  }

refresh(){
  this.todos=this.getOldTodoList();
    this.todos.subscribe(item => {
      
      this.tos=item;

      });
    }

getOldTodoList(){

  this.todos = JSON.parse(localStorage.getItem("todo"));
  return  Observable.of(this.todos);
}


}
