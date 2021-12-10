import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExportKeyComponent } from './export-key/export-key.component';



@NgModule({
  declarations: [
    ExportKeyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ExportKeyModule {
  static getExportKeyComponent(): typeof ExportKeyComponent {
    return ExportKeyComponent;
  }
}
