import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ModalComponent } from './components/modal/modal.component';
import { MomentModule } from 'angular2-moment';


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
        MDBBootstrapModule,
        FormsModule
    ],
    declarations: [
        ModalComponent
    ]

})

export class SharedModule {}
