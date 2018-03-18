import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SectionService } from '../shared/services/section.service';
import { Section } from '../shared/models/section.model';

@Component({
  selector: 'app-selected-courses',
  templateUrl: './selected-courses.component.html',
  styleUrls: ['./selected-courses.component.css']
})
export class SelectedCoursesComponent implements OnInit {

  sections: Section[] = [];

  constructor(private sectionService: SectionService, private router: Router) { }

  ngOnInit() {
    this.sectionService.sections.subscribe((sections: Section[]) => {
      if (!sections) {
        return;
      }

      this.sections = sections.filter((section: Section) => {
        return section.selected;
      });
    });
  }

  onRegisterClick() {
    if (this.sections.length === 0) {
      return;
    }

    this.router.navigate(['register']);
  }

}
