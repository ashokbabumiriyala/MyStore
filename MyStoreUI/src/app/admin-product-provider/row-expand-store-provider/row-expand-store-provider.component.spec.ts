import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RowExpandStoreProviderComponent } from './row-expand-store-provider.component';

describe('RowExpandStoreProviderComponent', () => {
  let component: RowExpandStoreProviderComponent;
  let fixture: ComponentFixture<RowExpandStoreProviderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RowExpandStoreProviderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RowExpandStoreProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
