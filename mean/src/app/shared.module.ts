import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MomentModule } from 'angular2-moment';

import { ModalComponent } from './components/modal/modal.component';
import { LoadingIconComponent } from './components/loading-icon/loading-icon.component';




@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        MomentModule,
        MDBBootstrapModule.forRoot()
    ],
    exports: [
        MomentModule,
        ModalComponent,
        LoadingIconComponent,
        MDBBootstrapModule,
        FormsModule
    ],
    declarations: [
        ModalComponent,
        LoadingIconComponent
    ]

})

export class SharedModule {}
