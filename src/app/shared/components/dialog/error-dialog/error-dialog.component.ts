import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog/dialog.service';

import { Dialog as DialogEvent } from './../../../../model/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: [ './error-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDialogComponent implements OnInit {
  currentToasts: DialogEvent[] = [];

  constructor(private toastService: DialogService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscribeToToasts();
  }

  subscribeToToasts() {
    this.toastService.toastEvents.subscribe((toasts) => {
      const currentToast: DialogEvent = {
        type: toasts.type,
        title: toasts.title,
        message: toasts.message,
      };
      this.currentToasts.push(currentToast);
      this.changeDetector.detectChanges();
    });
  }
  dispose(index: number) {
    this.currentToasts.splice(index, 1);
    this.changeDetector.detectChanges();
  }
}
