import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange, MatCheckbox, MatListOptionChange } from '@angular/material';
import { SubjectsService } from '../../shared/services/subjects.service';
import { Filter } from '../../shared/models/filter.model';
import { Subject } from '../../shared/models/subject.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  @ViewChild('allSubjectsCheckbox') allSubjectsCheckbox: MatCheckbox;
  filter: Filter;
  subjects: Subject[] = [];
  allSubjects: Subject[] = [];
  value: any;

  constructor(
    public dialogRef: MatDialogRef<FiltersComponent>,
    private subjectsService: SubjectsService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.filter = data.filter;

    this.subjectsService.subjects.subscribe((subjects: Subject[]) => {
      this.filter.subjects = subjects;
    });

    this.dialogRef.beforeClose().subscribe(() => {
      this.dialogRef.close(this.filter);
    });
  }

  close() {
    this.dialogRef.close(this.filter);
  }

  allSubjectsCheckboxClicked(event: MatCheckboxChange) {
    this.filter.subjects.forEach((subject: Subject) => {
      if (subject.selected !== event.checked) {
        subject.selected = !subject.selected;
      }
    });
  }

  subjectClicked(event: MatListOptionChange) {
    if (!event.selected && this.allSubjectsCheckbox.checked) {
      this.allSubjectsCheckbox.checked = false;
    } else if (event.selected) {
      let uncheckedCount = 0;

      this.filter.subjects.forEach((subject: Subject) => {
        if (!subject.selected) {
          uncheckedCount++;
        }
      });

      if (uncheckedCount) {
        this.allSubjectsCheckbox.checked = false;
      } else {
        this.allSubjectsCheckbox.checked = true;
      }
    }
  }
}
