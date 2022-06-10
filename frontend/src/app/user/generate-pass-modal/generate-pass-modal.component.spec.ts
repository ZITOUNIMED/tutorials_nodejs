import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePassModalComponent } from './generate-pass-modal.component';

describe('GeneratePassModalComponent', () => {
  let component: GeneratePassModalComponent;
  let fixture: ComponentFixture<GeneratePassModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratePassModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
