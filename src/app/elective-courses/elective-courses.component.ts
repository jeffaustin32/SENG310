import { Component, OnInit } from '@angular/core';
import { SectionService } from '../shared/services/section.service';
import { Section } from '../shared/models/section.model';

@Component({
  selector: 'app-elective-courses',
  templateUrl: './elective-courses.component.html',
  styleUrls: ['./elective-courses.component.css']
})
export class ElectiveCoursesComponent implements OnInit {
  sections: Section[] = [];

  constructor(private sectionService: SectionService) { }

  ngOnInit() {
    this.sectionService.sections.subscribe((sections: Section[]) => {
      this.sections = sections.filter((section: Section) => {
        return !section.registered && !section.required && !section.selected;
      });
    });
  }

}
