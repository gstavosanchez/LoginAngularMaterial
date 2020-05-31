import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
    imports:[
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatToolbarModule,
        MatTabsModule,
        MatIconModule,
        MatSnackBarModule,
        MatTableModule,
        MatDialogModule
    ],
    exports:[
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatToolbarModule,
        MatTabsModule,
        MatIconModule,
        MatSnackBarModule,
        MatTableModule,
        MatDialogModule
    ]
})
export class MaterialModuel{}