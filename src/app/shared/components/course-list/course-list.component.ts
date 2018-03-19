import { Component, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Course } from '../../models/course.model';
import { Section } from '../../models/section.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnChanges {
  @Input() sections: Section[];
  @Input() selectedPanel: boolean;
  @Input() search: boolean;
  @Output() sectionMouseEnter: EventEmitter<Section> = new EventEmitter();
  @Output() sectionMouseLeave: EventEmitter<Section> = new EventEmitter();
  courses: Course[];
  searchValue: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.courses = [];

    if (changes.sections) {
      // Add each section to a course
      changes.sections.currentValue.forEach((section: Section) => {
        let courseExists = false;

        // Find if course exists
        this.courses.forEach((course: Course) => {
          course.missingSection = false;

          if (section.subject === course.subject && section.courseNumber === course.number) {
            courseExists = true;
            course.sections.push(section);
          }
        });

        // Course doesn't yet exist
        if (!courseExists) {
          this.courses.push({
            subject: section.subject,
            sections: [section],
            number: section.courseNumber,
            linked: section.linked,
            missingSection: false
          });
        }

        this.courses.forEach((course: Course) => {
          if (this.selectedPanel && course.linked && course.sections.length < 2) {
            course.missingSection = true;
          }
        });
      });
    }
  }

  onMouseEnter(section: Section) {
    this.sectionMouseEnter.emit(section);
  }

  onMouseLeave(section: Section) {
    this.sectionMouseLeave.emit(section);
  }

  getInfo(event: MouseEvent, course: Course) {
    event.stopPropagation();
    window.open(`https://web.uvic.ca/calendar2018-01/CDs/${course.subject}/${course.number}.html`, '');
  }
}
