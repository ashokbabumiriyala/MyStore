import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RowExpandServiceProviderComponent } from './row-expand-service-provider.component';

describe('RowExpandServiceProviderComponent', () => {
  let component: RowExpandServiceProviderComponent;
  let fixture: ComponentFixture<RowExpandServiceProviderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RowExpandServiceProviderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RowExpandServiceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
