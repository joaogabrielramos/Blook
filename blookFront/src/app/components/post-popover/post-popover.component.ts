import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-post-popover',
  templateUrl: './post-popover.component.html',
  styleUrls: ['./post-popover.component.scss'],
})
export class PostPopoverComponent implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {}

  close() {
    this.popoverController.dismiss();
  }

}
