import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcajeComponent } from './marcaje.component';

describe('MarcajeComponent', () => {
  let component: MarcajeComponent;
  let fixture: ComponentFixture<MarcajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
