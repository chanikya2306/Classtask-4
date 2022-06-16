import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DatashareService {

  constructor(private http: HttpClient) { }
  createData(form: any) {
    let url = environment.apiDomain + "api/users";
    return this.http.post(url, form)
  }
  readData() {
    let url = environment.apiGet + 'api/User/validateUserName/%7Busername%7D';
    return this.http.get(url);
  }

}
