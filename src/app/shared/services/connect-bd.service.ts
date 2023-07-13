import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ConnectBDService {
  REST_API: string ='http://localhost:3000';
  constructor(private httpclient : HttpClient) {}
  public loginUser (form: FormGroup):Observable<any>{
    //const formData: FormData = new FormData();
    return this.httpclient.post(`${this.REST_API}/loginUser`, form);
  }

  public registroUser (form: FormGroup):Observable<any>{
    return this.httpclient.post(`${this.REST_API}/registrarUsuario`,form);
  }
}
