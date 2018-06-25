import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightningTileComponent } from './lightning-tile.component';

describe('LightningTileComponent', () => {
  let component: LightningTileComponent;
  let fixture: ComponentFixture<LightningTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightningTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightningTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
