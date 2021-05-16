import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { CommonApiServiceCallsService} from '../../Shared/common-api-service-calls.service';
@Injectable({
  providedIn: 'root'
})
export class ServiceLocationService {



  private apiUrl = environment.serviceMasterServiceUrl;
  constructor(private commonApiServiceCallsService:CommonApiServiceCallsService) { }
    locationSave(methodName: string, resouce: any): Observable<any> {
    return this.commonApiServiceCallsService.select(this.apiUrl + methodName, resouce);
    }  
    locationListSelect(methodName: string, resouce: any): Observable<any> {
    return this.commonApiServiceCallsService.select(this.apiUrl + methodName, resouce);
    }
    locationDelete(methodName: string, resouce: any): Observable<any> {
       return this.commonApiServiceCallsService.select(this.apiUrl + methodName, resouce);
    }
}
