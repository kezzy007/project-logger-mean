import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() projectProps;

  constructor() { }

  ngOnInit() {

      // $('myModal').modal('show');
  }

}
