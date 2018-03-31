import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from './services/profile.service';
import { FormControlDirective } from '@angular/forms';
import { Ng4FilesService, Ng4FilesConfig, Ng4FilesStatus, Ng4FilesSelected } from 'angular4-files-upload';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


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
  selectedFiles;
  private imageConfig: Ng4FilesConfig = {
    acceptExtensions: ['png', 'jpg', 'jpeg'],
    maxFilesCount: 1,
    maxFileSize: 2048000
  };

  uploadProfilePicUrl = 'http://localhost:3200/users/update-profile-pic';


  constructor(private profileService: ProfileService,  private ng4FilesService: Ng4FilesService) { }

  ngOnInit() {

     this.InitializeFormFields();

     this.ng4FilesService.addConfig(this.imageConfig);

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


  filesSelect(selectedFiles: Ng4FilesSelected): void {
    if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
        this.selectedFiles = selectedFiles.status;
        return;
    }

        // Handle error statuses here

    if (selectedFiles.files.length !== Ng4FilesStatus.STATUS_MAX_FILES_COUNT_EXCEED) {
        console.log("You selected more than one image");
        this.selectedFiles = selectedFiles.status;
        return;
    }
        this.selectedFiles = Array.from(selectedFiles.files).map(file => file.name);
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
