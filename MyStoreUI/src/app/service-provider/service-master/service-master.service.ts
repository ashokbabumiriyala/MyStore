import { Injectable } from '@angular/core';
import {CommonApiServiceCallsService} from '../../Shared/common-api-service-calls.service';
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceMasterService {
  private apiUrl = environment.serviceMasterServiceUrl;
  constructor(private commonApiServiceCallsService:CommonApiServiceCallsService ) { }

serviceMasterSave(methodName: string, resouce: any): Observable<any> {
  return this.commonApiServiceCallsService.select(this.apiUrl + methodName, resouce);
  }
  
serviceMasterSelect(methodName: string, resouce: any): Observable<any> {
    return this.commonApiServiceCallsService.select(this.apiUrl + methodName, resouce);
    }
}
