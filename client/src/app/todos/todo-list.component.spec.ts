/*import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {FormsModule} from '@angular/forms';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import {CustomModule} from '../../../../../lab-3-angular-and-spark-no-i-in-team/client/src/app/custom.module';

import {Todo} from './todo';
import {TodoListComponent} from './todo-list.component';
import {TodoListService} from './todo-list.service';

describe('Todo list', () => {

  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodos: () => Observable.of([
        {
          _id: 'chris_id',
          owner: 'Chris',
          status: true,
          body: 'Eat the pop tarts',
          category: 'food'
        },
        {
          _id: 'bill_id',
          owner: 'Bill',
          status: false,
          body: 'Read chapter 7',
          category: 'zoology'
        },
        {
          _id: 'olivia_id',
          owner: 'Olivia',
          status: true,
          body: 'Visit mexico',
          category: 'vacations'
        }
      ])
    };

    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [TodoListComponent],
      // providers:    [ TodoListService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{provide: TodoListService, useValue: todoListServiceStub},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]

    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('contains all the todos', () => {
    expect(todoList.todos.length).toBe(3);
  });

  it('contains a todo named \'Chris\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Chris')).toBe(true);
  });

  it('contain a todo named \'Olivia\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Olivia')).toBe(true);
  });

  it('doesn\'t contain a todo named \'Santa\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Santa')).toBe(false);
  });

  it('todo list filters by owner', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoOwner = 'l';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(2));
  });

  it('todo list filters by status', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoStatus = "complete";
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(2));
  });

  it('todo list filters by owner and status', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoStatus = "incomplete";
    todoList.todoOwner = 'l';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by body', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoBody = 'a';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(2));
  });

  it('todo list filters by category', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoCategory = 'v';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
    expect(todoList.filteredTodos[0]._id === "olivia_id");
  });

  it('todo list can limit number of todos displayed', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoLimit = 2;
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(2));
  });

  it('todo list sorts by owner', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoSortBy = "owner";
    const expectedTodos = [
      {
        _id: 'bill_id',
        owner: 'Bill',
        status: false,
        body: 'Read chapter 7',
        category: 'zoology'
      },
      {
        _id: 'chris_id',
        owner: 'Chris',
        status: true,
        body: 'Eat the pop tarts',
        category: 'food'
      },
      {
        _id: 'olivia_id',
        owner: 'Olivia',
        status: true,
        body: 'Visit mexico',
        category: 'vacations'
      }
    ];
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => {
        for(var i = 0; i < expectedTodos.length; i++) {
        expect(todoList.filteredTodos[i]._id == expectedTodos[i]._id)
        }
      });
  });

  it('todo list sorts by category', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoSortBy = "category";
    const expectedTodos = [
      {
        _id: 'chris_id',
        owner: 'Chris',
        status: true,
        body: 'Eat the pop tarts',
        category: 'food'
      },
      {
        _id: 'olivia_id',
        owner: 'Olivia',
        status: true,
        body: 'Visit mexico',
        category: 'vacations'
      },
      {
        _id: 'bill_id',
        owner: 'Bill',
        status: false,
        body: 'Read chapter 7',
        category: 'zoology'
      }
    ];
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => {
        for(var i = 0; i < expectedTodos.length; i++) {
          expect(todoList.filteredTodos[i]._id == expectedTodos[i]._id)
        }
      });
  });

});

describe('Misbehaving Todo List', () => {
  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodos: () => Observable.create(observer => {
        observer.error('Error-prone observable');
      })
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, CustomModule],
      declarations: [TodoListComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a TodoListService', () => {
    // Since the observer throws an error, we don't expect todos to be defined.
    expect(todoList.todos).toBeUndefined();
  });
});*/
