import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagerListComponent} from './manager-list/manager-list.component';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {ManagerListItemComponent} from './manager-list-item/manager-list-item.component';
import {RouterModule} from '@angular/router';
import {ManagerHomeComponent} from './manager-home/manager-home.component';
import {ManagerPanelComponent} from './manager-panel/manager-panel.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {NewDiagramDialogComponent} from './new-diagram-dialog/new-diagram-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatSidenavModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  declarations: [
    ManagerListComponent,
    ManagerListItemComponent,
    ManagerHomeComponent,
    ManagerPanelComponent,
    NewDiagramDialogComponent
  ]
})
export class ManagerModule {
}
