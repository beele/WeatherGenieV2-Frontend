import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictedTileComponent } from './predicted-tile.component';

describe('PredictedTileComponent', () => {
  let component: PredictedTileComponent;
  let fixture: ComponentFixture<PredictedTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictedTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictedTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
