import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Section } from '../models/section.model';

@Injectable()
export class SectionService {
  sections: Subject<Section[]> = new Subject();
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
}
