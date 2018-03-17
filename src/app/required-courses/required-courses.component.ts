import { Component, OnInit } from '@angular/core';
import { SectionService } from '../shared/services/section.service';
import { Section } from '../shared/models/section.model';

@Component({
  selector: 'app-required-courses',
  templateUrl: './required-courses.component.html',
  styleUrls: ['./required-courses.component.css']
})
export class RequiredCoursesComponent implements OnInit {

  sections: Section[] = [];

  constructor(private sectionService: SectionService) { }

  ngOnInit() {
    this.sectionService.sections.subscribe((sections: Section[]) => {
      if (!sections) {
        return;
      }

      this.sections = sections.filter((section: Section) => {
        return section.required && !section.registered && !section.selected;
      });
    });
  }

}
