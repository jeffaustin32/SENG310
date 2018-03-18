import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SectionService } from '../shared/services/section.service';
import { Section } from '../shared/models/section.model';
import { FiltersComponent } from './filters/filters.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { Filter } from '../shared/models/filter.model';
import { Subject } from '../shared/models/subject.model';

@Component({
  selector: 'app-elective-courses',
  templateUrl: './elective-courses.component.html',
  styleUrls: ['./elective-courses.component.css']
})
export class ElectiveCoursesComponent implements OnInit {
  @Output() sectionMouseEnter: EventEmitter<Section> = new EventEmitter();
  @Output() sectionMouseLeave: EventEmitter<Section> = new EventEmitter();
  allSections: Section[] = [];
  sections: Section[] = [];
  filter: Filter;

  constructor(private sectionService: SectionService, public dialog: MatDialog) { }

  ngOnInit() {
    this.filter = new Filter();

    this.sectionService.sections.subscribe((sections: Section[]) => {
      if (!sections) {
        return;
      }

      this.allSections = sections;
      this.applyFilters();
      this.sections = this.sections.filter((section: Section) => {
        return !section.registered && !section.required && !section.selected;
      });
    });
  }

  openFiltersDialog(): void {
    const dialogRef = this.dialog.open(FiltersComponent, {
      width: '750px',
      data: { filter: this.filter }
    });

    dialogRef.afterClosed().subscribe((filter: Filter) => {
      this.filter = filter;
      this.applyFilters();
      this.sections = this.sections.filter((section: Section) => {
        return !section.registered && !section.required && !section.selected;
      });
    });
  }

  applyFilters() {
    this.sections = this.allSections.filter((section: Section) => {
      let display = true;
      // Apply Course number filter
      if (this.filter.courseNumber && this.filter.courseNumber !== section.courseNumber) {
        display = false;
      }

      // Apply Course level filter
      if (this.filter.courseLevel[section.courseLevel] === false) {
        display = false;
      }

      // Apply Day of week filter
      section.daysOfWeek.forEach((day: number) => {
        if (day === 0 && !this.filter.dayOfWeek.sun) {
          display = false;
        } else if (day === 1 && !this.filter.dayOfWeek.mon) {
          display = false;
        } else if (day === 2 && !this.filter.dayOfWeek.tue) {
          display = false;
        } else if (day === 3 && !this.filter.dayOfWeek.wed) {
          display = false;
        } else if (day === 4 && !this.filter.dayOfWeek.thu) {
          display = false;
        } else if (day === 5 && !this.filter.dayOfWeek.fri) {
          display = false;
        } else if (day === 6 && !this.filter.dayOfWeek.sat) {
          display = false;
        }
      });

      // Apply Start time filter
      if (this.filter.start.hour && this.filter.start.minute != null) {
        let filterStart = this.filter.start.hour * 60;
        if (this.filter.start.ampm === 'pm') {
          filterStart *= 12;
        }
        filterStart += this.filter.start.minute;

        const sectionStart = (section.startHour * 60) + section.startMinute;
        if (sectionStart < filterStart) {
          display = false;
        }
      }

      // Apply End time filter
      if (this.filter.end.hour && this.filter.end.minute != null) {
        let filterEnd = this.filter.end.hour * 60;
        if (this.filter.end.ampm === 'pm') {
          filterEnd *= 12;
        }
        filterEnd += this.filter.end.minute;

        const sectionEnd = (section.endHour * 60) + section.endMinute;
        if (sectionEnd > filterEnd) {
          display = false;
        }
      }

      // Apply subject filter
      this.filter.subjects.forEach((subject: Subject) => {
        if (section.subject === subject.abr) {
          if (!subject.selected) {
            display = false;
          }
        }
      });

      return display;
    });
  }

  onMouseEnter(section: Section) {
    this.sectionMouseEnter.emit(section);
  }

  onMouseLeave(section: Section) {
    this.sectionMouseLeave.emit(section);
  }
}
