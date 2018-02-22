import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Todo} from './todo';
import {TodoComponent} from './todo.component';
import {TodoListService} from './todo-list.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('Todo component', () => {

  let todoComponent: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  let todoListServiceStub: {
    getTodoById: (todoId: string) => Observable<Todo>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodoById: (todoId: string) => Observable.of([
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
          category: 'homework'
        },
        {
          _id: 'olivia_id',
          owner: 'Olivia',
          status: true,
          body: 'Visit mexico',
          category: 'vacations'
        },
      ].find(todo => todo._id === todoId))
    };

    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoComponent);
      todoComponent = fixture.componentInstance;
    });
  }));

  it('can retrieve Pat by ID', () => {
    todoComponent.setId('chris_id');
    expect(todoComponent.todo).toBeDefined();
    expect(todoComponent.todo.owner).toBe('Chris');
    expect(todoComponent.todo.body).toBe('Eat the pop tarts');
  });

  it('returns undefined for Santa', () => {
    todoComponent.setId('Santa');
    expect(todoComponent.todo).not.toBeDefined();
  });

});
