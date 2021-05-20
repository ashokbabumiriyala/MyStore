import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExcutiveOrdersTableComponent } from './excutive-orders-table.component';

describe('ExcutiveOrdersTableComponent', () => {
  let component: ExcutiveOrdersTableComponent;
  let fixture: ComponentFixture<ExcutiveOrdersTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcutiveOrdersTableComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExcutiveOrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
