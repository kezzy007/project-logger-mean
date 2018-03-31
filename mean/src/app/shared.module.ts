import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ModalComponent } from './components/modal/modal.component';
import { MomentModule } from 'angular2-moment';
import { Ng4FilesModule } from 'angular4-files-upload';


@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        MomentModule,
        Ng4FilesModule,
        MDBBootstrapModule.forRoot()
    ],
    exports: [
        MomentModule,
        ModalComponent,
        Ng4FilesModule,
        MDBBootstrapModule
    ],
    declarations: [
        ModalComponent
    ]

})

export class SharedModule {}
