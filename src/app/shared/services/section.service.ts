import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Section } from '../models/section.model';
import { Persona } from '../models/persona.model';

const personas: Persona[] = [
  {
    netlinkId: 'cknolls',
    vnumber: 'V00123456',
    name: 'Cathy Knolls'
  },
  {
    netlinkId: 'palab',
    vnumber: 'V00654321',
    name: 'Palashranjan Hari Manidhar Bakshi'
  }
];

@Injectable()
export class SectionService {
  sections: BehaviorSubject<Section[]> = new BehaviorSubject(null);
  activePersona: BehaviorSubject<Persona> = new BehaviorSubject(this.getPersonaAndClasses(null));
  private sectionsData: Section[] = [];

  constructor(private http: HttpClient) { }

  public getPersonaAndClasses(persona: Persona): Persona {
    if (!persona) {
      persona = JSON.parse(localStorage.getItem('persona'));
    } else {
      this.activePersona.next(persona);
    }

    if (persona) {
      this.http.get(`../../../assets/${persona.netlinkId}.json`)
        .subscribe((sections: Section[]) => {
          this.sectionsData = sections;
          this.checkForConflicts();
          this.sections.next(this.sectionsData);
        });
    }

    return persona;
  }

  checkForConflicts() {
    const selectedSections = this.sectionsData.filter((section: Section) => {
      return section.selected || section.registered;
    });

    const notSelected = this.sectionsData.filter((section: Section) => {
      return !section.selected && !section.registered;
    });

    notSelected.forEach((notSelectedSection: Section) => {
      notSelectedSection.conflict = '';
    });

    selectedSections.forEach((selectedSection: Section) => {
      notSelected.forEach((notSelectedSection: Section) => {
        const selectedStart = selectedSection.startHour * 60 + selectedSection.startMinute;
        const selectedEnd = selectedSection.endHour * 60 + selectedSection.endMinute;

        const notSelectedStart = notSelectedSection.startHour * 60 + notSelectedSection.startMinute;
        const notSelectedEnd = notSelectedSection.endHour * 60 + notSelectedSection.endMinute;

        if (notSelectedStart < selectedEnd && notSelectedEnd > selectedStart) {
          notSelectedSection.conflict += 'Time conflict!';
        }

        if (notSelectedSection.subject === selectedSection.subject
          && notSelectedSection.courseNumber === selectedSection.courseNumber
          && notSelectedSection.type === selectedSection.type) {
          if (notSelectedSection.conflict) {
            notSelectedSection.conflict += '\n';
          }
          notSelectedSection.conflict += 'Already selected different section!';
        }
      });
    });

    this.sectionsData = selectedSections.concat(notSelected);
  }

  public add(sectionToAdd: Section): void {
    // Update this section
    this.sectionsData.forEach(section => {
      if (section.crn === sectionToAdd.crn) {
        section.selected = true;
      }
    });

    // Broadcast updated sections
    this.checkForConflicts();
    this.sections.next(this.sectionsData);
  }

  public remove(sectionToRemove): void {
    // Update this section
    this.sectionsData.forEach(section => {
      if (section.crn === sectionToRemove.crn) {
        section.selected = false;
      }
    });

    // Broadcast updated sections
    this.checkForConflicts();
    this.sections.next(this.sectionsData);
  }

  login(netlinkId: string): boolean {
    let newPersona: Persona = null;

    personas.forEach(persona => {
      if (persona.netlinkId === netlinkId) {
        newPersona = persona;
      }
    });

    if (!newPersona) {
      return false;
    }

    localStorage.setItem('persona', JSON.stringify(newPersona));
    this.getPersonaAndClasses(newPersona);
    return true;
  }

  logout() {
    this.activePersona.next(null);
    localStorage.setItem('persona', null);
  }
}
