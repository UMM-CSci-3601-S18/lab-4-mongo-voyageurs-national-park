import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Todo} from './todo';
import {environment} from '../../../../../lab-3-angular-and-spark-no-i-in-team/client/src/environments/environment';

@Injectable()
export class TodoListService {
    readonly baseUrl: string = environment.API_URL + "todos";
    private todoUrl: string = this.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  //the todos will be sorted if a parameter is given
  getTodos(owner: string, status: string, body: string, category: string): Observable<Todo[]> {
      this.todoUrl = this.baseUrl + '?';

      //add status filter
      if(status != null) {
          let statusBool: boolean;
          if(status === "complete") {
              statusBool = true;
          }
          else if (status === "incomplete") {
              statusBool = false;
          }

          this.todoUrl += "status=" + statusBool + '&';
      }

      //add owner filter
      if(owner != null) {
          this.todoUrl += "owner=" + owner + '&';
      }

      //add category filter
      if(category != null) {
          this.todoUrl += "category=" + category + '&';
      }

      //add body filter
      if(body != null) {
          this.todoUrl += "body=" + body;
      }

    return this.httpClient.get<Todo[]>(this.todoUrl);
  }

  getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
  }
}
