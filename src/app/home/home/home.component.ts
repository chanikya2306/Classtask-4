import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatashareService } from 'src/app/Services/datashare.service';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  registerform: any;
  list_of_data: any = [];
  firstnamedispaly: any;
  lastnamedisplay: any;
  jsondata: any = [];
  constructor(private api: DatashareService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.registerform = new FormGroup({
      'firstname': new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]),
      'lastname': new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]),
      'username': new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      'password': new FormControl('', [Validators.required, Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')]),
      'confirmpassword': new FormControl('', [Validators.required, Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')]),
      'gender': new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]),
    });
    this.getMethod();
  }

  get Firstname() {
    return this.registerform.get('firstname');

  }
  get Lastname() {
    return this.registerform.get('lastname');

  }
  get Username() {
    return this.registerform.get('username');

  }
  get password() {
    return this.registerform.get('password');

  }
  get confirmpassword() {
    return this.registerform.get('confirmpassword');

  }
  get gender() {
    return this.registerform.get('gender');

  }


  onsubmit() {
    if (this.registerform.get('password').value == this.registerform.get('confirmpassword').value) {
      console.log('registration successfull');
      this.list_of_data.push(this.registerform.value);
      console.log(this.list_of_data)
      localStorage.setItem("firstname", this.registerform.value.firstname);
      localStorage.setItem("lastname", this.registerform.value.lastname);
      localStorage.setItem("username", this.registerform.value.username);
      localStorage.setItem("passworde", this.registerform.value.passworde);
      localStorage.setItem("confirmpassword", this.registerform.value.confirmpassword);
      localStorage.setItem("gender", this.registerform.value.gender);
      this.firstnamedispaly = localStorage.getItem("firstname");
      this.lastnamedisplay = localStorage.getItem("lastname");
      this.postMethod()
      this.showSuccess()
    }

  }
  postMethod() {
    this.api.createData(this.registerform.value).subscribe((respo: any) => {
      console.log(respo)
    })
  }

  getMethod() {
    this.api.readData().subscribe((response: any) => {
      console.log(response);
      this.jsondata.push(response)
    })

  }
  showSuccess() {
    this.toastr.success('Register successfull');
  }
}


