import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RainTileComponent } from './rain-tile.component';

describe('RainTileComponent', () => {
  let component: RainTileComponent;
  let fixture: ComponentFixture<RainTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RainTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RainTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
