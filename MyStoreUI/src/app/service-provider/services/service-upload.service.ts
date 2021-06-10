import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { CommonApiServiceCallsService} from '../../Shared/common-api-service-calls.service';
@Injectable({
  providedIn: 'root'
})
export class ServiceUploadService {
  private apiUrl = environment.serviceMasterServiceUrl;
  private apiStoreUrl = environment.storeMasterServiceUrl;

  constructor(private commonApiServiceCallsService:CommonApiServiceCallsService) { }
  uploadServiceDocument(methodName: string, resouce: any): Observable<any> {
    return this.commonApiServiceCallsService.select(this.apiUrl + methodName, resouce);
  }
  serviceProductList(methodName: string, resouce: any): Observable<any> {
    return this.commonApiServiceCallsService.select(this.apiUrl + methodName, resouce);
  }

  serviceDelete(methodName: string, resouce: any): Observable<any> {
    return this.commonApiServiceCallsService.select(this.apiUrl + methodName, resouce);
  }

  
  getUploadDocuments(methodName: string, resouce: any): Observable<any> {
    return this.commonApiServiceCallsService.select(this.apiStoreUrl + methodName, resouce);
  }

  deleteDocument(methodName: string, resouce: any): Observable<any> {
    return this.commonApiServiceCallsService.select(this.apiStoreUrl + methodName, resouce);
  }

  updateServiceStatus(methodName: string, resouce: any): Observable<any> {
    return this.commonApiServiceCallsService.select(this.apiUrl + methodName, resouce);
  }


}
