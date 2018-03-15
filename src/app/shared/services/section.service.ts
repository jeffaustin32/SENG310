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
  sections: Subject<Section[]> = new Subject();
  activePersona: BehaviorSubject<Persona> = new BehaviorSubject(JSON.parse(localStorage.getItem('persona')));
  private sectionsData: Section[] = [];

  constructor(private http: HttpClient) {
    this.getJSON().subscribe((sections: Section[]) => {
      this.sectionsData = sections;
      console.log(sections);
      this.sections.next(this.sectionsData);
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get('../../../assets/sections.json');
  }

  public add(sectionToAdd: Section): void {
    // Update this section
    this.sectionsData.forEach(section => {
      if (section.crn === sectionToAdd.crn) {
        section.selected = true;
      }
    });

    // Broadcast updated sections
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
    this.activePersona.next(newPersona);
    return true;
  }

  logout() {
    this.activePersona.next(null);
    localStorage.setItem('persona', null);
  }
}
