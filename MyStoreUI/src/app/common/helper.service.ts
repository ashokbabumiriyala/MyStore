import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IProviderDetails} from 'src/app/common/provider-details';
@Injectable({
  providedIn: 'root'
})
export class HelperService { 
 iProviderDetails:IProviderDetails;
// public providerSource = new BehaviorSubject<IProviderDetails>(this.iProviderDetails)
// providerDetails = this.providerSource.asObservable();

constructor() { }


private profileObs$: BehaviorSubject<IProviderDetails> = new BehaviorSubject(null);

getProfileObs(): Observable<any> {
    return this.profileObs$.asObservable();
}

setProfileObs(profile: IProviderDetails) {
    this.profileObs$.next(profile);   
}
}
