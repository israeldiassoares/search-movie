import { Component, Input } from '@angular/core';
import { Error } from 'src/app/model/error';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: [ './error-dialog.component.scss' ]
})
export class ErrorDialogComponent {
  @Input() errorInfo: Error = {
    Error: '',
    Response: ''
  }

}
