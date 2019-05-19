import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    MatSidenavModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    DragDropModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule,
    MatRadioModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSlideToggleModule
  ],
  exports: [
    MatSidenavModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    DragDropModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule,
    MatRadioModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSlideToggleModule
  ],
  declarations: [],
  providers: [],
})
export class MaterialModule {
}
