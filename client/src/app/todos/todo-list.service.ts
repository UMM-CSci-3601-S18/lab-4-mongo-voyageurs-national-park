import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Todo} from './todo';
import {environment} from '../../environments/environment';

@Injectable()
export class TodoListService {
    readonly baseUrl: string = environment.API_URL + 'todos';
    private todoUrl: string = this.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  //the todos will be sorted if a parameter is given
  getTodos(status: string, body: string): Observable<Todo[]> {
      this.todoUrl = this.baseUrl + '?';

      //add status filter
      if (status != null) {
          let statusBool: boolean;
          if (status === 'complete') {
              statusBool = true;
          }
          else if (status === 'incomplete') {
              statusBool = false;
          }

          this.todoUrl += 'status=' + statusBool + '&';
      }

      //add body filter
      if (body != null) {
          this.todoUrl += 'body=' + body;
      }

    return this.httpClient.get<Todo[]>(this.todoUrl);
  }

  getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
  }
}
