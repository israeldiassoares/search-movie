import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum toastTypes {
  ERROR = 0,
  SUCCESS = 1,
  DEFAULT = 9
}

export interface ToastData {
  title: string;
  content: string;
  show?: boolean
  type: toastTypes;
  progressWidth?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  data: ToastData = { title: '', content: '', type: 9 };
  public open = new Subject<ToastData>();

  initiate(data: ToastData) {
    if (data.type) {
      this.data!.type = toastTypes.ERROR;
    }
    this.data = { ...data, show: true, progressWidth: '100 %' };
    this.open.next(this.data);
  }
  hide() {
    this.data = { ...this.data, show: false };
    this.open.next(this.data);
  }
  constructor() { }

}
