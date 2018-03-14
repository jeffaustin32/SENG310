import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { SectionService } from '../shared/services/section.service';
import { Section } from '../shared/models/section.model';

const colors: any = {
  registered: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  selected: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  hover: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  unavailable: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  viewDate = new Date();
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];

  constructor(private sectionService: SectionService) { }

  ngOnInit() {
    this.sectionService.sections.subscribe((sections: Section[]) => {
      // Only keep registered and selected sections
      sections = sections.filter((section: Section) => {
        return section.registered || section.selected;
      });

      // Add sections as events on the calendar
      this.events = [];

      sections.forEach((section: Section) => {
        let startDate = new Date();
        startDate.setHours(section.startHour);
        startDate.setMinutes(section.startMinute);

        let endDate = new Date();
        endDate.setHours(section.endHour);
        endDate.setMinutes(section.endMinute);

        section.daysOfWeek.forEach((dayOfWeek: number) => {
          startDate = addDays(startDate, dayOfWeek - startDate.getDay());
          endDate = addDays(endDate, dayOfWeek - endDate.getDay());

          this.events.push({
            start: startDate,
            end: endDate,
            title: `${section.subject}${section.courseNumber}`,
            color: section.registered ? colors.registered : colors.selected
          });
        });
      });

      this.refresh.next();
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    // if (isSameMonth(date, this.viewDate)) {
    //   if (
    //     (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
    //     events.length === 0
    //   ) {
    //     this.activeDayIsOpen = false;
    //   } else {
    //     this.activeDayIsOpen = true;
    //     this.viewDate = date;
    //   }
    // }
    console.log('Day clicked');
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action, event);
  }

  // addEvent(): void {
  //   this.events.push({
  //     title: 'New event',
  //     start: startOfDay(new Date()),
  //     end: endOfDay(new Date()),
  //     color: colors.red,
  //     draggable: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     }
  //   });
  //   this.refresh.next();
  // }

  hourSegmentClicked(event) {
    console.log(event);
  }
}
