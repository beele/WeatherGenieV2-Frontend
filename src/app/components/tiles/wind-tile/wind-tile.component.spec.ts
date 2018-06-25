import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindTileComponent } from './wind-tile.component';

describe('WindTileComponent', () => {
  let component: WindTileComponent;
  let fixture: ComponentFixture<WindTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
