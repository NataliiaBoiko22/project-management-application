import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescrDialogComponent } from './descr-dialog.component';

describe('DescrDialogComponent', () => {
  let component: DescrDialogComponent;
  let fixture: ComponentFixture<DescrDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescrDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescrDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
