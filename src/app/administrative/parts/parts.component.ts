import { Component } from '@angular/core';
import { Parts } from './shared/parts';
import { MatDialog } from '@angular/material/dialog';
import { PartsService } from './shared/parts.service';

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
    private PartsService: PartsService
  ) {}

  ngOnInit(): void {
    this.getPart();
  }

  getPart(): void {
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
      .subscribe(() => this.getPart());
  }

  deletePart(part: Parts) {
    this.PartsService.deletePart(part).subscribe((part) => console.log(part));
  }
}
