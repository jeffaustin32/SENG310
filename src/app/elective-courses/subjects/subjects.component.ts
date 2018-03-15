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
    { name: 'Art', abbreviation: 'ART' },
    { name: 'Astronomy', abbreviation: 'ASTR' },
    { name: 'Computer Science', abbreviation: 'CSC' },
    { name: 'English', abbreviation: 'ENGL' },
    { name: 'Geography', abbreviation: 'GEOG' },
    { name: 'Software Engineering', abbreviation: 'SENG' },
    { name: 'Theatre', abbreviation: 'THEA' }
  ];

  selectedSubjects: Subject[] = [];

  constructor(
    public dialogRef: MatDialogRef<SubjectsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
