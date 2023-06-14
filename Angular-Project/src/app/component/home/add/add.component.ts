import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from './add.model';
import { ApiService } from '../../../service/api.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  public addForm!: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _api: ApiService,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeModel | undefined
  ) {}

  ngOnInit(): void {
    this.addForm = this._formBuilder.group({
      id: [0],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[A-Z][a-zA-Z]*$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });

    if (this.data) {
      this.addForm.patchValue({
        id: this.data.id,
        name: this.data.name,
        email: this.data.email,
        salary: this.data.salary,
      });
    }

    console.log(this.data);
  }

  postEmployeeDetails() {
    // this.employeeObj.name = this.addForm.value.name;
    // this.employeeObj.id = this.addForm.value.id;
    // this.employeeObj.email = this.addForm.value.email;
    // this.employeeObj.salary = this.addForm.value.salary;
    if (this.addForm.valid) {
      // this.employeeObj = {
      //
      //   // name: this.addForm.value.name,
      //   // id: 0,
      //   // email: this.addForm.value.email,
      //   // salary: this.addForm.value.salary,
      // };

      if (this.data) {
        this._api.updateEmployee(this.addForm.getRawValue()).subscribe(
          () => {
            alert('Employee updated successfully');
          },
          (err) => {
            alert('Updating went wrong');
          }
        );
      } else {
        this._api.postEmployee(this.addForm.getRawValue()).subscribe(
          (res) => {
            alert('Employee added successfully');
            // this._router.navigate(['/home']);
          },
          (err) => {
            alert('Something went wrong');
          }
        );
      }
    }
  }
}
