import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../shared/models/persona.model';
import { SectionService } from '../shared/services/section.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {
  persona: Persona;

  constructor(private sectionService: SectionService, private router: Router) { }

  ngOnInit() {
    this.sectionService.activePersona.subscribe((persona: Persona) => {
      this.persona = persona;
    });
  }

  onSignInClick(): void {
    this.router.navigate(['/login']);
  }

  onSignOutClick(): void {
    this.sectionService.logout();
    this.router.navigate(['/login']);
  }
}
