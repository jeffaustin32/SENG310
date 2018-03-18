import { Component, OnInit } from '@angular/core';
import { SectionService } from '../shared/services/section.service';
import { Section } from '../shared/models/section.model';
import { Persona } from '../shared/models/persona.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  persona: Persona;
  currentDate: Date;
  selectedSessions: Section[] = [];

  constructor(private sectionService: SectionService) { }

  ngOnInit() {
    this.sectionService.sections.subscribe((sections: Section[]) => {
      if (!sections) {
        return;
      }

      this.selectedSessions = sections.filter((section: Section) => {
        return section.selected;
      });
    });

    this.sectionService.activePersona.subscribe((persona: Persona) => {
      if (persona) {
        this.persona = persona;
      }
    });
    this.currentDate = new Date();
  }
}
