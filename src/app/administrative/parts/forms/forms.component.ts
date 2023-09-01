import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Parts } from 'src/app/administrative/parts/shared/parts';
import { PartsService } from 'src/app/administrative/parts/shared/parts.service';
import { FormComponent } from 'src/app/shared/components/form/form.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  part: Parts = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { part: Parts },
    public dialogRef: MatDialogRef<FormComponent>,
    private partsService: PartsService
  ) {}

  ngOnInit() {
    if (this.data.part) {
      this.partsService
        .getById(this.data.part)
        .subscribe((part) => (this.part = part));
      return;
    }
  }

  savePart(form: FormComponent): void {
    if (form.valid()) {
      this.partsService.save(this.part).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: () => {
          alert('error');
        },
      });
    }
  }
}
