import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapViewerShellComponent } from './map-viewer-shell.component';

describe('MapViewerShellComponent', () => {
  let component: MapViewerShellComponent;
  let fixture: ComponentFixture<MapViewerShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapViewerShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapViewerShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
