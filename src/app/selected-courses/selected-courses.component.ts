import { Component, OnInit } from '@angular/core';
import { SectionService } from '../shared/services/section.service';
import { Section } from '../shared/models/section.model';

@Component({
  selector: 'app-selected-courses',
  templateUrl: './selected-courses.component.html',
  styleUrls: ['./selected-courses.component.css']
})
export class SelectedCoursesComponent implements OnInit {

  sections: Section[] = [];

  constructor(private sectionService: SectionService) { }

  ngOnInit() {
    this.sectionService.sections.subscribe((sections: Section[]) => {
      this.sections = sections.filter((section: Section) => {
        return section.selected;
      });
    });
  }

}
