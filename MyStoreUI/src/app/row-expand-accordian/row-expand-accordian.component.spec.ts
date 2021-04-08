import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RowExpandAccordianComponent } from './row-expand-accordian.component';

describe('RowExpandAccordianComponent', () => {
  let component: RowExpandAccordianComponent;
  let fixture: ComponentFixture<RowExpandAccordianComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RowExpandAccordianComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RowExpandAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
