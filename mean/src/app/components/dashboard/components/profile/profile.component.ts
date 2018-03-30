import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ProfileService } from './services/profile.service';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';

import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { FileUploadService } from '../../../../services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {


    passwordsMatch = true;
    temp_confirm_password = '';
    userRecord = null;
    TOAST_OPTIONS = {
        SUCCESS: {
            text: 'CLOSE',
            duration: 5000,
            type: 'success',
        },
        FAILURE: {
            text: 'CLOSE',
            duration: 5000,
            type: 'error',
        }
    };
    statusCreateForm: FormGroup;
    fileDescription: FormControl;
    fileToUpload: File  = null;
    uploadProgress = 0;
    uploadComplete = false;
    uploadingProgressing = false;
    fileUploadSub: any;
    serverResponse: any;
    profilePicUploadUrl = 'users/update-profile-pic';

    @ViewChild('myInput')
    myFileInput: any;


  constructor(private profileService: ProfileService,
              private fileUploadService: FileUploadService) { }

    ngOnInit() {

         this.InitializeFormFields();

        /* initilize the form and/or extra form fields
            Do not initialize the file field
        */
        // this.fileDescription  = new FormControl('', [
        //     Validators.required,
        //     Validators.minLength(4),
        //     Validators.maxLength(280)
        // ]);

        // this.statusCreateForm = new FormGroup({
        //     'description': this.fileDescription,
        // });

    }

    ngOnDestroy() {
        if (this.fileUploadSub) {
            this.fileUploadSub.unsubscribe();
            }
    }

    handleProgress(event) {
        if (event.type === HttpEventType.DownloadProgress) {
            this.uploadingProgressing = true;
            this.uploadProgress = Math.round(100 * event.loaded / event.total)
          }

          if (event.type === HttpEventType.UploadProgress) {
            this.uploadingProgressing = true;
            this.uploadProgress = Math.round(100 * event.loaded / event.total)
          }

          if (event.type === HttpEventType.Response) {
            console.log(event.body);
            this.uploadComplete = true;
            this.serverResponse = event.body;
          }
        }

    handleFileInput(files: FileList) {

        const fileItem = files.item(0);

        console.log('file input has changed. The file is', fileItem);

        this.fileToUpload = fileItem;

    }

    /**
     *  Method specifically used to handle file upload
     */

    handleFormSubmit (event: any, statusNgForm: NgForm) {
        event.preventDefault();
        if (statusNgForm.submitted) {

            this.fileUploadSub = this.fileUploadService
                                .fileUpload(this.fileToUpload, this.profilePicUploadUrl)
                                .subscribe( (progressEvent) => this.handleProgress(progressEvent),
                                            (error) => {
                                                alert(error);
                                                console.log('Server error' + error);
                                            });

            statusNgForm.resetForm({});
        }
    }

    resetFileInput() {

        console.log(this.myFileInput.nativeElement.files);

        this.myFileInput.nativeElement.value = '';

        console.log(this.myFileInput.nativeElement.files);
    }

    InitializeFormFields() {

        const user = window.localStorage.getItem('user');

        this.userRecord = JSON.parse(user);

    }

    updateUserRecordInLocalStorage() {

        window.localStorage.removeItem('user');

        window.localStorage.setItem('user', JSON.stringify(this.userRecord));
    }

    updateUsersProfile() {

        this.profileService.updateUsersProfile(this.userRecord)
            .subscribe((response) => {

                    // console.log(response);

                    if (response.success) {

                        this.displayToast(response.message, this.TOAST_OPTIONS.SUCCESS);

                        window.localStorage.setItem('user', JSON.stringify(this.userRecord));

                    } else {

                        this.displayToast(response.message, this.TOAST_OPTIONS.FAILURE);
                    }

                });
    }



  confirmPasswordsMatch() {

      if (this.userRecord.temp_confirm_password !== '') {

        return this.passwordsMatch = (this.userRecord.password === this.temp_confirm_password);

      }

      return this.passwordsMatch;

  }

  displayToast(message, options) {


  }
}
