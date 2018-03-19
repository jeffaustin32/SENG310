import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SectionService } from '../../services/section.service';
import { Section } from '../../models/section.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {
  @Output('sectionAdded') sectionAdded: EventEmitter<null> = new EventEmitter();
  @Input() section: Section;

  constructor(private sectionService: SectionService) { }

  add(section: Section): void {
    this.sectionService.add(section);
    this.sectionAdded.emit();
  }

  remove(section: Section): void {
    this.sectionService.remove(section);
  }

}
