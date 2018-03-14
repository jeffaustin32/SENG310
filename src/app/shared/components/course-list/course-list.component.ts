import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Course } from '../../models/course.model';
import { Section } from '../../models/section.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnChanges {
  @Input() sections: Section[];
  courses: Course[];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.courses = [];

    if (changes.sections) {
      // Add each section to a course
      changes.sections.currentValue.forEach((section: Section) => {
        let courseExists = false;

        // Find if course exists
        this.courses.forEach((course: Course) => {
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
            number: section.courseNumber
          });
        }
      });
    }
  }
}
