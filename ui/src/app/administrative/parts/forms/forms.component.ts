import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Parts } from 'src/app/administrative/parts/shared/parts';
import { PartService } from 'src/app/administrative/parts/shared/parts.service';
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
    private PartService: PartService
  ) {}

  ngOnInit() {
    if (this.data.part) {
      this.PartService.getById(this.data.part).subscribe(
        (part) => (this.part = part)
      );
    }
  }

  savePart(form: FormComponent): void {
    if (form.valid()) {
      this.PartService.save(this.part).subscribe();
    }
  }
}
