import { Injectable } from '@angular/core';
import {CommonApiServiceCallsService} from '../../Shared/common-api-service-calls.service';
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StoreMasterService {
  private apiUrl = environment.storeMasterServiceUrl;
constructor(private commonApiServiceCallsService:CommonApiServiceCallsService) { }
  storeMasterSave(methodName: string, resouce: any): Observable<any> {
  return this.commonApiServiceCallsService.select(this.apiUrl + methodName, resouce);
  }

  storeMasterSelect(methodName: string, resouce: any): Observable<any> {
    return this.commonApiServiceCallsService.select(this.apiUrl + methodName, resouce);
    }
}
