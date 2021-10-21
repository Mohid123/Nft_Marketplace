import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { take } from 'rxjs/operators';
import { AddGroup } from './../../../../@core/models/requests/add-group.model';
import { CustomDialogService } from './../../../../@core/services/custom-dialog/custom-dialog.service';
import { GroupService } from './../../../../@core/services/group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent {

  public groupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private customDialogService: CustomDialogService,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
  ) {
    this.groupForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [ Validators.required, Validators.minLength(6) ])
    });
  }

  addGroup():void {
    const param:AddGroup = {
      name: this.groupForm.controls.name.value,
      description: this.groupForm.controls.description.value,
      appPackageId: this.authService.loggedInUser?.appPackageId,
      coverImageUrl:'',
    };
    this.groupService.addGroups(param).pipe(take(1)).subscribe((res)=> {
      if(!res.hasErrors()) {
        this.close();
      } else {
        alert('error :'+res.errors[0]?.error?.message)
      }
      console.log('res:',res);
    });
  }

  close():void {
    this.customDialogService.closeDialogs();
  }
}
