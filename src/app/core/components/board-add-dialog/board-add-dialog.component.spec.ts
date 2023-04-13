import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardAddDialogComponent } from './board-add-dialog.component';

describe('BoardAddDialogComponent', () => {
  let component: BoardAddDialogComponent;
  let fixture: ComponentFixture<BoardAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardAddDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
