import { Component, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from '../../shared/models/subject.model';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent {
  availableSubjects: Subject[] = [
    { selected: true, name: 'Commerce', abr: 'COM' },
    { selected: true, name: 'English', abr: 'ENGL' },
    { selected: true, name: 'Geography', abr: 'GEOG' },
    { selected: true, name: 'Software Engineering', abr: 'SENG' },
    { selected: true, name: 'Art', abr: 'ART' },
    { selected: true, name: 'Astronomy', abr: 'ASTR' },
    { selected: true, name: 'Computer Science', abr: 'CSC' },
    { selected: true, name: 'Theatre', abr: 'THEA' },
    { selected: true, name: 'Writing', abr: 'WRIT' }
  ];

  selectedSubjects: Subject[] = [];

  constructor(
    public dialogRef: MatDialogRef<SubjectsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    data.selectedSubjects.forEach((subject: Subject) => {
      this.onAddSubjectClick(subject);
    });

    this.dialogRef.beforeClose().subscribe(() => {
      this.dialogRef.close(this.selectedSubjects);
    });
  }

  close() {
    this.dialogRef.close(this.selectedSubjects);
  }

  onAddSubjectClick(subject: Subject): void {
    // Add subject to selected subjects
    this.selectedSubjects.push(subject);

    // Remove it from the available subjects
    const index = this.availableSubjects.findIndex(x => x.abr === subject.abr);
    this.availableSubjects.splice(index, 1);
  }

  onRemoveSubjectClick(subject: Subject): void {
    // Add subject to selected subjects
    this.availableSubjects.push(subject);

    // Remove it from the available subjects
    const index = this.selectedSubjects.findIndex(x => x.abr === subject.abr);
    this.selectedSubjects.splice(index, 1);
  }

}
