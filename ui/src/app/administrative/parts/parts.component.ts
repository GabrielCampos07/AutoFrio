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
  tap,
} from 'rxjs';
import { Dialogs } from 'src/app/shared/utils/dialogs';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss'],
  providers: [Dialogs],
})
export class PartsComponent {
  parts$!: Observable<Parts[]>;

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
    Dialogs.confirmDeleteDialog(this.matDialog, part.name)
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (result) {
            return this.PartsService.delete(part).pipe(
              tap(() =>
                Dialogs.showSuccessDeleteSnackbar(this._snackBar, part.name!)
              ),
              switchMap(() => (this.parts$ = this.getParts()))
            );
          }
          return result;
        })
      )
      .subscribe();
  }

  async openPart(part?: Parts) {
    const { FormsComponent } = await import('./forms/forms.component');
    this.matDialog
      .open(FormsComponent, {
        data: { part: part },
      })
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (result) {
            return (this.parts$ = this.getParts()).pipe(
              tap(() =>
                Dialogs.showSuccessEditSnackBar(
                  this._snackBar,
                  part?.name,
                  part?.id
                )
              )
            );
          }
          return result;
        })
      )
      .subscribe();
  }
}
