import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';
import { CommonApiServiceCallsService} from '../Shared/common-api-service-calls.service';

@Injectable({
  providedIn: 'root'
})
export class AdminProductProviderService {
  private apiUrl = environment.adminServiceUrl;
  constructor(private commonApiServiceCallsService:CommonApiServiceCallsService) { }

  adminStoreMasterSelect(methodName: string): Observable<any> {
    return this.commonApiServiceCallsService.getAll(this.apiUrl + methodName);
  }

  StoresUnderStoreMasterSelect(methodName: string,resource:any): Observable<any> {
    return this.commonApiServiceCallsService.select(this.apiUrl + methodName,resource);
  }
}
