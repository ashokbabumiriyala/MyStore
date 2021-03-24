import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { CommonApiServiceCallsService} from '../../Shared/common-api-service-calls.service';
@Injectable({
  providedIn: 'root'
})
export class SingleStoreService {

  private apiUrl = environment.storeMasterServiceUrl;
  constructor(private commonApiServiceCallsService:CommonApiServiceCallsService) { }
    singleStoreSave(methodName: string, resouce: any): Observable<any> {
    return this.commonApiServiceCallsService.select(this.apiUrl + methodName, resouce);
    }  
     subStoreListSelect(methodName: string, resouce: any): Observable<any> {
      return this.commonApiServiceCallsService.select(this.apiUrl + methodName, resouce);
      }
}
