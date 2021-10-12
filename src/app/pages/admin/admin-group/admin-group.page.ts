import { Component, OnInit } from '@angular/core';
import { CustomDialogService } from './../../../@core/services/custom-dialog/custom-dialog.service';

@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.page.html',
  styleUrls: ['./admin-group.page.scss']
})
export class AdminGroupPage implements OnInit {

  constructor(
    private customDialogService:CustomDialogService,
  ) { }

  ngOnInit(): void {
  }

  newGroup() {
    this.customDialogService.showCreateGroupDialog()
  }

}
