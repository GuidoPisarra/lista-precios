import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ScannerPreciosPage } from './scanner-precios.page';

describe('ScannerPreciosPage', () => {
  let component: ScannerPreciosPage;
  let fixture: ComponentFixture<ScannerPreciosPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(ScannerPreciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
