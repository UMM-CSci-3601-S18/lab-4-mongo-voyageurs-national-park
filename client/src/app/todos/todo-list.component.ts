import {Component, OnInit} from '@angular/core';
import {TodoListService} from './todo-list.service';
import {Todo} from './todo';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: []
})

export class TodoListComponent implements OnInit {
// These are public so that tests can reference them (.spec.ts)
  public todos: Todo[];
  public filteredTodos: Todo[];

  public todoOwner: string;
  public todoStatus: string;
  public todoBody: string;
  public todoCategory: string;
  public todoSortBy: string;
  public todoLimit: number;


// Inject the TodoListService into this component.
// That's what happens in the following constructor.
//
// We can call upon the service for interacting
// with the server.

  constructor(private todoListService: TodoListService) {

  }

  public filterTodos(searchLimit: number, sortBy: string): Todo[] {

    this.filteredTodos = this.todos;

    //limit number of todos displayed
    if(searchLimit != null && searchLimit > 0) {
      this.filteredTodos = this.filteredTodos.slice(0, searchLimit);
    }

    //Sort todos alphabetically by a specified field
    if(sortBy != null) {
      this.filteredTodos = this.sortTodos();
    }

    return this.filteredTodos;
  }

  private sortTodos(): Todo[] {

    switch (this.todoSortBy.toLocaleLowerCase()) {
      case "category": {
        this.filteredTodos = this.filteredTodos.sort((todo1, todo2) => {
          return todo1.category.localeCompare(todo2.category);
        });
        return this.filteredTodos;
      }
      case "owner": {
        this.filteredTodos = this.filteredTodos.sort((todo1, todo2) => {
          return todo1.owner.localeCompare(todo2.owner);
        });
        return this.filteredTodos;
      }
      case "status": {
        this.filteredTodos = this.filteredTodos.sort((todo1, todo2) => {
          return todo1.status.toString().localeCompare(todo2.status.toString());
        });
        return this.filteredTodos;
      }
      case "body": {
        this.filteredTodos = this.filteredTodos.sort((todo1, todo2) => {
          return todo1.body.localeCompare(todo2.body);
        });
        return this.filteredTodos;
      }
    }

    return this.filteredTodos;
  }


  /**
   * Starts an asynchronous operation to update the todos list
   *
   */
  refreshTodos(): Observable<Todo[]> {
    // Get Todos returns an Observable, basically a "promise" that
    // we will get the data from the server.
    //
    // Subscribe waits until the data is fully downloaded, then
    // performs an action on it (the first lambda)

    const todos: Observable<Todo[]> = this.todoListService.getTodos(this.todoOwner, this.todoStatus, this.todoBody, this.todoCategory);
    todos.subscribe(
      returnedTodos => {
        this.todos = returnedTodos;
        this.filterTodos(this.todoLimit, this.todoSortBy);
      },
      err => {
        console.log(err);
      });
    return todos;
  }


  ngOnInit(): void {
    this.refreshTodos();
  }
}
