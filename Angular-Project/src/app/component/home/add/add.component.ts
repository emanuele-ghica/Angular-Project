import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public addForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() : void {
    this.addForm = this._formBuilder.group( {
      position: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z]*$/)
      ]],
      descrition: ['', [
        Validators.required,
        Validators.maxLength(400)
      ]]
    })
  }

  public submit() : void {
    console.warn(this.addForm.value)
  }

}
