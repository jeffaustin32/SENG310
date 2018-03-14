import { Component, OnInit } from '@angular/core';
import { SectionService } from '../shared/services/section.service';
import { Section } from '../shared/models/section.model';

@Component({
  selector: 'app-registered-courses',
  templateUrl: './registered-courses.component.html',
  styleUrls: ['./registered-courses.component.css']
})
export class RegisteredCoursesComponent implements OnInit {

  sections: Section[] = [];

  constructor(private sectionService: SectionService) { }

  ngOnInit() {
    this.sectionService.sections.subscribe((sections: Section[]) => {
      this.sections = sections.filter((section: Section) => {
        return section.registered;
      });
    });
  }

}
