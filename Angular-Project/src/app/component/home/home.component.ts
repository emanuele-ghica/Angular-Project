import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { EmployeeModel } from './add/add.model';
import { Observable, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  employeeData!: EmployeeModel[];

  constructor(private _api: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this._setEmployee();
  }

  public deleteEmployee(row: any): void {
    this._api.deleteEmployee(row.id).subscribe(() => this._setEmployee());
  }

  public openDialog(row?: EmployeeModel): void {
    const dialogRef = this.dialog.open(AddComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._setEmployee();
      }
    });
  }

  private _setEmployee(): void {
    this._api
      .getEmployee()
      .pipe(take(1))
      .subscribe((next) => (this.employeeData = next));
  }
}
