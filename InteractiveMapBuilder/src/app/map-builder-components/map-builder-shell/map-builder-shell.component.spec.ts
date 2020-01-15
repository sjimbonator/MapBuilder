import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapBuilderShellComponent } from './map-builder-shell.component';

describe('MapBuilderShellComponent', () => {
  let component: MapBuilderShellComponent;
  let fixture: ComponentFixture<MapBuilderShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapBuilderShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapBuilderShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
