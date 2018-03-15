import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SectionService } from '../shared/services/section.service';
import { Persona } from '../shared/models/persona.model';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css']
})
export class TermComponent implements OnInit {
  persona: Persona;
  currentDate: Date;

  constructor(private sectionService: SectionService, private router: Router) { }

  ngOnInit() {
    this.sectionService.activePersona.subscribe((persona: Persona) => {
      this.persona = persona;
    });
    this.currentDate = new Date();
  }

  onSubmitClick(): void {
    this.router.navigate(['/timetable']);
  }

}
