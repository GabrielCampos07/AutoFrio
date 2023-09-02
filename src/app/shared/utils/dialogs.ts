import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalComponent } from '../components/modal/modal.component';

export class Dialogs {
  static confirmDeleteDialog(
    matDialog: MatDialog,
    objectName: unknown
  ): MatDialogRef<ModalComponent, any> {
    const dialogRef = matDialog.open(ModalComponent, {
      data: {
        message: `Deseja mesmo excluir o item ${objectName}?`,
        buttons: true,
      },
    });

    return dialogRef;
  }

  static showSuccessDeleteSnackbar(snackBar: MatSnackBar, name: string): void {
    snackBar.open(`${name} excluido com sucesso!`, 'OK');
    setTimeout(() => {
      snackBar.dismiss();
    }, 3000);
  }

  static showSuccessEditSnackBar(
    snackBar: MatSnackBar,
    name?: string,
    id?: number
  ): void {
    snackBar.open(
      `${name || 'item'} ${id ? 'editado' : 'criado'} com sucesso!`,
      'OK'
    );
    setTimeout(() => {
      snackBar.dismiss();
    }, 3000);
  }
}
