import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from '../models/subject.model';

@Injectable()
export class SubjectsService {
  subjects: BehaviorSubject<Subject[]> = new BehaviorSubject(JSON.parse(localStorage.getItem('subjects')));

  constructor(private http: HttpClient) {
    this.http.get(`../../../assets/subjects.json`)
      .subscribe((subjects: Subject[]) => {
        localStorage.setItem('subjects', JSON.stringify(subjects));
        this.subjects.next(subjects);
      });
  }
}
