import { Component, Input } from '@angular/core';
import { SectionService } from '../../services/section.service';
import { Section } from '../../models/section.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {
  @Input() section: Section;

  constructor(private sectionService: SectionService) { }

  add(section: Section): void {
    this.sectionService.add(section);
  }

  remove(section: Section): void {
    this.sectionService.remove(section);
  }

}
