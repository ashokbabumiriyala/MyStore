import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';
import { CommonApiServiceCallsService} from '../Shared/common-api-service-calls.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryManagmentService {
  private apiUrl = environment.storeMasterServiceUrl;
  private adminApiUrl = environment.adminServiceUrl;
  constructor(private commonApiServiceCallsService:CommonApiServiceCallsService) { }


  saveDeliveryExecutive(methodName: string, resouce: any): Observable<any> {
    return this.commonApiServiceCallsService.select(this.apiUrl + methodName, resouce);
  } 

    deliveryExecutiveSelect(methodName: string): Observable<any> {
      return this.commonApiServiceCallsService.getAll(this.apiUrl + methodName);
    } 


    deliveryOrdersSelect(methodName: string): Observable<any> {
      return this.commonApiServiceCallsService.getAll(this.apiUrl + methodName);
    } 


    deliveryOrderItemsSelect(methodName: string,resouce: any): Observable<any> {
      return this.commonApiServiceCallsService.select(this.apiUrl + methodName,resouce);
    } 

    deliveryExecutivies(methodName: string): Observable<any> {
      return this.commonApiServiceCallsService.getAll(this.apiUrl + methodName);
    } 
   executiveOrders(methodName: string, resouce: any): Observable<any> {
      return this.commonApiServiceCallsService.select(this.apiUrl + methodName, resouce);
    } 


    deliveryOrderAssignInsert(methodName: string, resouce: any): Observable<any> {
      return this.commonApiServiceCallsService.select(this.apiUrl + methodName, resouce);
    } 


    storeOrderItemsSelect(methodName: string, resouce: any): Observable<any> {
      return this.commonApiServiceCallsService.select(this.apiUrl + methodName, resouce);
      }


      baseFeeSave(methodName: string, resouce: any): Observable<any> {
        return this.commonApiServiceCallsService.select(this.adminApiUrl + methodName, resouce);
        }
        baseFeeSelect(methodName: string): Observable<any> {
          return this.commonApiServiceCallsService.getAll(this.adminApiUrl + methodName);
          }
    
    
}



