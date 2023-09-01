import { Component, ElementRef, ViewChild } from '@angular/core';
import { Parts } from './shared/parts';
import { MatDialog } from '@angular/material/dialog';
import { PartsService } from './shared/parts.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Observable,
  concat,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss'],
})
export class PartsComponent {
  parts$!: Observable<Parts[]>;

  page: any = {
    pageIndex: 0,
    pageSize: 10,
  };

  @ViewChild('input') input!: ElementRef;

  constructor(
    private matDialog: MatDialog,
    private PartsService: PartsService,
    private _snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    const searchParts$: Observable<Parts[]> = fromEvent<any>(
      this.input.nativeElement,
      'keyup'
    ).pipe(
      map((event) => event.target.value),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((search) => this.getParts(search))
    );

    const initialParts$ = this.getParts();

    this.parts$ = concat(initialParts$, searchParts$);
  }

  getParts(name?: string): Observable<Parts[]> {
    return this.PartsService.get(name);
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
      .pipe(
        switchMap((result) => {
          return result ? this.PartsService.delete(part) : result;
        })
      )
      .subscribe(() => {
        this.getParts();
        this._snackBar.open(`${part.name} excluido com sucesso!`, 'OK');
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
}
