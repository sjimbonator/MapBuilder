import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';

import { FormsModule} from '@angular/forms'

import { LoginComponent } from './login/login.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AngularOpenlayersModule } from "ngx-openlayers";





//Angular Material Components
import 
{
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
} from '@angular/material';
import { RegisterComponent } from './register/register.component';
import { MapViewerComponent } from './map-viewer/map-viewer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MapBuilderComponent } from './map-builder-components/map-builder/map-builder.component';
import { MapBuilderShellComponent } from './map-builder-components/map-builder-shell/map-builder-shell.component';
import { LayersListComponent } from './map-builder-components/layers-list/layers-list.component';
import { ToolbarComponent } from './map-builder-components/toolbar/toolbar.component';
import { LayerEditorComponent } from './map-builder-components/layer-editor/layer-editor.component';
import { DndDirective } from './directives/dnd.directive';
import { MapViewerShellComponent } from './map-viewer-shell/map-viewer-shell.component';
import { MapViewComponent } from './map-view/map-view.component';

const appRoutes = [
  {path: 'map-viewer', component : MapViewerComponent},
  {path: 'map-viewer-shell', component : MapViewerShellComponent},
  {path: 'map-builder', component : MapBuilderComponent},
  {path: 'map-builder-shell', component : MapBuilderShellComponent},
  {path: 'register', component : RegisterComponent},
  {path: 'login', component : LoginComponent}
]
@NgModule({
  imports: [
    [CommonModule],
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatMenuModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    AngularOpenlayersModule
  ],
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    MapViewerComponent,
    MapBuilderComponent,
    MapBuilderShellComponent,
    LayersListComponent,
    ToolbarComponent,
    LayerEditorComponent,
    DndDirective,
    MapViewerShellComponent,
    MapViewComponent
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
