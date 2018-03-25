import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        MDBBootstrapModule.forRoot()
    ],
    exports: [
        ModalComponent,
        MDBBootstrapModule
    ],
    declarations: [
        ModalComponent
    ]

})

export class SharedModule{}