import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TrimModule } from './../../../@core/directives/trim/trim.module';
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
    TrimModule,
    ToastrModule.forRoot( {positionClass: 'toast-top-right'} )
  ]
})
export class CreateGroupDialogModule {

  static getCreateGroupComponent(): typeof CreateGroupComponent {
    return CreateGroupComponent;
  }
}
