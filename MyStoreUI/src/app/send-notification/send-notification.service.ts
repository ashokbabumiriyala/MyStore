import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendNotificationService {

  constructor(private httpClient:HttpClient ) { }

  getJsonData(): Observable<any> {
    return this.httpClient.get('../assets/admin_service_account.json');
  }
}
