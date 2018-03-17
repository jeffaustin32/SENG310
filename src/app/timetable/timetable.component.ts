import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { Section } from '../shared/models/section.model';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent {
  @ViewChild('calendar') calendar: CalendarComponent;

  constructor() { }

  onMouseEnter(section: Section) {
    this.calendar.onMouseEnter(section);
  }

  onMouseLeave(section: Section) {
    this.calendar.onMouseLeave(section);
  }

}
