import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { CommonApiServiceCallsService} from '../../Shared/common-api-service-calls.service';
@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordServiceService {
  private apiUrl = environment.authenticationServiceUrl;
  constructor(private commonApiServiceCallsService:CommonApiServiceCallsService) { }
  forGotDetails(methodName: string, resouce: any): Observable<any> {
    return this.commonApiServiceCallsService.select(this.apiUrl + methodName, resouce);
  }

}

