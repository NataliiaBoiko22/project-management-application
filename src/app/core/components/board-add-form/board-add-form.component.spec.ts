import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardAddFormComponent } from './board-add-form.component';

describe('BoardAddFormComponent', () => {
  let component: BoardAddFormComponent;
  let fixture: ComponentFixture<BoardAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardAddFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
