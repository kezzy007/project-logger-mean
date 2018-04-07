import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MomentModule } from 'angular2-moment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToasterService, ToasterModule } from 'angular5-toaster';

import { ModalComponent } from './components/modal/modal.component';
import { LoadingIconComponent } from './components/loading-icon/loading-icon.component';




@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        MomentModule,
        ToasterModule,
        BrowserAnimationsModule,
        MDBBootstrapModule.forRoot()
    ],
    exports: [
        MomentModule,
        ModalComponent,
        LoadingIconComponent,
        MDBBootstrapModule,
        FormsModule,
        ToasterModule,
        BrowserAnimationsModule
    ],
    declarations: [
        ModalComponent,
        LoadingIconComponent
    ],
    providers: [ ToasterService ]

})

export class SharedModule {}
