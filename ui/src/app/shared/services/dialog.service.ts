import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private matDialog: MatDialog) {}

  dialog(
    data: string,
    buttons: boolean = false
  ): MatDialogRef<ModalComponent, any> {
    const dialogRef = this.matDialog.open(ModalComponent, {
      data: {
        message: data,
        buttons: buttons,
      },
    });

    return dialogRef;
  }
}
