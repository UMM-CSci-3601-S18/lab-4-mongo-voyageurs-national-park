import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {FormsModule} from '@angular/forms';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import {CustomModule} from '../custom.module';

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
        // stub UserService for test purposes
        todoListServiceStub = {
            getTodos: () => Observable.of([
                {
                    _id: 'hunter_id',
                    owner: 'Hunter',
                    status: true,
                    category: 'Redshirt',
                    body: 'Freedom Premium'
                },
                {
                    _id: 'sungjae_id',
                    owner: 'Sungjae',
                    status: false,
                    category: 'Morrissweater',
                    body: 'Morris cougars!'
                },
                {
                    _id: 'david_id',
                    owner: 'David',
                    status: true,
                    category: 'Purpleshirt',
                    body: 'Plain shirt, how sad'
                },
            ])
        };


        TestBed.configureTestingModule({
            imports: [CustomModule],
            declarations: [TodoListComponent],
            // providers:    [ UserListService ]  // NO! Don't provide the real service!
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

    it('contains all the owners', () => {
        expect(todoList.todos.length).toBe(3);
    });

    it('contains a user named \'Hunter\'', () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === 'Hunter')).toBe(true);
    });

    it('contains a user named \'David\'', () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === 'David')).toBe(true);
    });

    it('contains a user named \'Darth Vader\'', () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === 'Darth Vader')).toBe(false);
    });

    it('has two todos that are true', () => {
        expect(todoList.todos.filter((todo: Todo) => todo.status === true).length).toBe(2);
    });

    it('todo list filters by owner', () => {
        expect(todoList.filteredTodos.length).toBe(3);
        todoList.todoOwner = 'a';
        todoList.refreshTodos().subscribe(() => {
            expect(todoList.filteredTodos.length).toBe(2);
        });
    });


    it('todo list filters by category', () => {
        expect(todoList.filteredTodos.length).toBe(3);
        todoList.todoCategory = 'shirt';
        todoList.refreshTodos().subscribe(() => {
            expect(todoList.filteredTodos.length).toBe(2);
        });
    });

    /*
    it('user list filters by name and age', () => {
        expect(userList.filteredUsers.length).toBe(3);
        userList.userAge = 37;
        userList.userName = 'i';
        userList.refreshUsers().subscribe(() => {
            expect(userList.filteredUsers.length).toBe(1);
        });
    });

});

describe('Misbehaving User List', () => {
    let userList: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;

    let userListServiceStub: {
        getUsers: () => Observable<User[]>
    };

    beforeEach(() => {
        // stub UserService for test purposes
        userListServiceStub = {
            getUsers: () => Observable.create(observer => {
                observer.error('Error-prone observable');
            })
        };

        TestBed.configureTestingModule({
            imports: [FormsModule, CustomModule],
            declarations: [UserListComponent],
            providers: [{provide: UserListService, useValue: userListServiceStub},
                {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(UserListComponent);
            userList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('generates an error if we don\'t set up a UserListService', () => {
        // Since the observer throws an error, we don't expect users to be defined.
        expect(userList.users).toBeUndefined();
    });
});


describe('Adding a user', () => {
    let userList: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;
    const newUser: User = {
        _id: '',
        name: 'Sam',
        age: 67,
        company: 'Things and stuff',
        email: 'sam@this.and.that'
    };
    const newId = 'sam_id';

    let calledUser: User;

    let userListServiceStub: {
        getUsers: () => Observable<User[]>,
        addNewUser: (newUser: User) => Observable<{'$oid': string}>
    };
    let mockMatDialog: {
        open: (AddUserComponent, any) => {
            afterClosed: () => Observable<User>
        };
    };

    beforeEach(() => {
        calledUser = null;
        // stub UserService for test purposes
        userListServiceStub = {
            getUsers: () => Observable.of([]),
            addNewUser: (newUser: User) => {
                calledUser = newUser;
                return Observable.of({
                    '$oid': newId
                });
            }
        };
        mockMatDialog = {
            open: () => {
                return {
                    afterClosed: () => {
                        return Observable.of(newUser);
                    }
                };
            }
        };

        TestBed.configureTestingModule({
            imports: [FormsModule, CustomModule],
            declarations: [UserListComponent],
            providers: [
                {provide: UserListService, useValue: userListServiceStub},
                {provide: MatDialog, useValue: mockMatDialog},
                {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(UserListComponent);
            userList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('calls UserListService.addUser', () => {
        expect(calledUser).toBeNull();
        userList.openDialog();
        expect(calledUser).toEqual(newUser);
    });

    */

});
