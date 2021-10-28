import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CreateGroupComponent } from './create-group/create-group.component';



@NgModule({
  declarations: [
    CreateGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot( {positionClass: 'toast-top-right'} )
  ]
})
export class CreateGroupDialogModule {

  static getCreateGroupComponent(): typeof CreateGroupComponent {
    return CreateGroupComponent;
  }
}
