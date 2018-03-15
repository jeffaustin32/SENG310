import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SectionService } from '../shared/services/section.service';
import { Section } from '../shared/models/section.model';
import { FiltersComponent } from './filters/filters.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { CourseFilter } from '../shared/models/course-filter.model';
import { SubjectFilter } from '../shared/models/subject-filter.model';

@Component({
  selector: 'app-elective-courses',
  templateUrl: './elective-courses.component.html',
  styleUrls: ['./elective-courses.component.css']
})
export class ElectiveCoursesComponent implements OnInit {
  sections: Section[] = [];
  courseFilter: CourseFilter;
  subjectFilter: SubjectFilter;

  constructor(private sectionService: SectionService, public dialog: MatDialog) { }

  ngOnInit() {
    this.sectionService.sections.subscribe((sections: Section[]) => {
      this.sections = sections.filter((section: Section) => {
        return !section.registered && !section.required && !section.selected;
      });
    });
  }

  openFiltersDialog(): void {
    const dialogRef = this.dialog.open(FiltersComponent, {
      width: '750px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openSubjectsDialog(): void {
    const dialogRef = this.dialog.open(SubjectsComponent, {
      width: '750px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
