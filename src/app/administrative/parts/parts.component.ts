import { Component } from '@angular/core';
import { Parts } from './shared/parts';
import { MatDialog } from '@angular/material/dialog';
import { PartsService } from './shared/parts.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss'],
})
export class PartsComponent {
  parts!: Parts[];
  partName: string = '';

  page: any = {
    pageIndex: 0,
    pageSize: 10,
  };

  constructor(
    private matDialog: MatDialog,
    private PartsService: PartsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getParts();
  }

  getParts(): void {
    this.PartsService.getParts().subscribe({
      next: (parts) => {
        this.parts = parts;
      },
    });
  }

  getPartsByName(): void {
    this.PartsService.getPartsByName(this.partName).subscribe({
      next: (parts) => {
        this.parts = parts;
      },
    });
  }

  async openPart(part?: Parts) {
    const { FormsComponent } = await import('./forms/forms.component');
    this.matDialog
      .open(FormsComponent, {
        data: { part: part },
      })
      .afterClosed()
      .subscribe(() => {
        this.getParts();
        this._snackBar.open(
          `${part?.name || 'item'}
          ${part?.id ? 'editado' : 'criado'} com sucesso!`,
          'OK'
        );
      });
  }

  deletePart(part: Parts): void {
    this.matDialog
      .open(ModalComponent, {
        data: {
          message: `Deseja mesmo excluir o item ${part.name}?`,
          buttons: true,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result)
            this.PartsService.deletePart(part).subscribe(() => {
              this.getParts();
              this._snackBar.open(`${part.name} excluido com sucesso!`, 'OK');
            });
        },
      });
  }
}
