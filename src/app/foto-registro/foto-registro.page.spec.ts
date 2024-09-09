import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FotoRegistroPage } from './foto-registro.page';

describe('FotoRegistroPage', () => {
  let component: FotoRegistroPage;
  let fixture: ComponentFixture<FotoRegistroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoRegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
