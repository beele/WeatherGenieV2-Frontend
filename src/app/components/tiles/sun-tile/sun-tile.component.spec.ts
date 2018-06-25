import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SunTileComponent } from './sun-tile.component';

describe('SunTileComponent', () => {
  let component: SunTileComponent;
  let fixture: ComponentFixture<SunTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SunTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SunTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
