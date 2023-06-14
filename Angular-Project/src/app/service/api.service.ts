import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EmployeeModel } from '../component/home/add/add.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  public postEmployee(data: any): Observable<EmployeeModel[]> {
    return this._http.post<any>('http://localhost:3000/posts', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public getEmployee(): Observable<EmployeeModel[]> {
    return this._http.get<EmployeeModel[]>('http://localhost:3000/posts');
  }

  public updateEmployee(data: EmployeeModel) {
    return this._http
      .put<any>('http://localhost:3000/posts/' + data.id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  public deleteEmployee(id: number) {
    return this._http.delete<any>('http://localhost:3000/posts/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
