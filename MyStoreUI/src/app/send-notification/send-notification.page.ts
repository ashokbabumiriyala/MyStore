import { Component, OnInit } from '@angular/core';
import{ FormControl, FormGroup, Validators}from '@angular/forms'
// import * as admin from 'firebase-admin';
import {SendNotificationService} from '../send-notification/send-notification.service';
import { HelperService } from 'src/app/common/helper.service';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.page.html',
  styleUrls: ['./send-notification.page.scss'],
})
export class SendNotificationPage implements OnInit {
  sendNotificationGroup:FormGroup;
  isFormSubmitted:boolean;
  userType=[{id:1, topic:'Service Provider'},
  {id:2, topic:'Merchants'},
  {id:3, topic:'Users'}];
  serviceAccount = {};
  constructor( private sendNotificationService: SendNotificationService, private helperService: HelperService) {
    }

    ngOnInit() {
      this.createSendNotificationForm();
    this.getJsonObject();
    // admin.initializeApp({
    //   credential: admin.credential.cert(this.serviceAccount)
    // });

  }
  get topic() {
    return this.sendNotificationGroup.get('topic');
  }
  get title() {
    return this.sendNotificationGroup.get('title');
  }
  get text() {
    return this.sendNotificationGroup.get('text');
  }
  createSendNotificationForm (){
    this.sendNotificationGroup = new FormGroup({
      topic: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required)
    });
  }
  private getJsonObject(){
    this.sendNotificationService.getJsonData()
      .subscribe((data: any) => {
        console.log(data);
        this.serviceAccount = data;
      },
        (error: any) => {
        });
  }

  sendNotification(){
    // var message = {
    //   notification: {
    //     title: this.title,
    //     body: this.text
    //   },
    //   topic: condition
    // };
    // admin.messaging().send(message).then((response) => {
    //   console.log('Successfully sent message:', response);
    // })

  }
  async validateForm(): Promise<void> {
    this.isFormSubmitted = true;
    if (this.sendNotificationGroup.invalid) {
      return;
    }
    const loadingController = await this.helperService.createLoadingController("loading");
    await loadingController.present();
    const dataObject = { topic:this.topic.value,title:this.title.value, text: this.text.value };
    console.log(dataObject);
    loadingController.dismiss();

  }

}
