import { Subject } from './subject.model';

export class Filter {
    courseNumber: number;
    courseLevel: CourseLevel;
    subjects: Subject[];
    dayOfWeek: DayOfWeek;
    start: Time;
    end: Time;

    constructor() {
        this.courseNumber = null;
        this.courseLevel = new CourseLevel();
        this.subjects = [];
        this.dayOfWeek = new DayOfWeek();
        this.start = new Time();
        this.end = new Time();
    }
}

export class CourseLevel {
    l100: boolean;
    l200: boolean;
    l300: boolean;
    l400: boolean;
    l500: boolean;

    constructor() {
        this.l100 = true;
        this.l200 = true;
        this.l300 = true;
        this.l400 = true;
        this.l500 = true;
    }
}

export class DayOfWeek {
    sun: boolean;
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;

    constructor() {
        this.sun = true;
        this.mon = true;
        this.tue = true;
        this.wed = true;
        this.thu = true;
        this.fri = true;
        this.sat = true;
    }
}

export class Time {
    hour: number;
    minute: number;
    ampm: string;

    constructor() {
        this.ampm = 'am';
    }
}
