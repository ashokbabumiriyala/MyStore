import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera } from '@ionic-native/camera/ngx';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { File } from '@ionic-native/file/ngx';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Market } from '@ionic-native/market/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [ Camera,
    FCM,
    File,
    AppVersion,
    Market,
    {provide: LocationStrategy, useClass: HashLocationStrategy}]
  ,
  bootstrap: [AppComponent],
})
export class AppModule {}
