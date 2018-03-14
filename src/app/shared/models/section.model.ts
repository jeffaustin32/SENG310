export interface Section {
    subject: string;
    courseNumber: number;
    courseLevel: '100' | '200' | '300' | '400';
    required: boolean;
    registered: boolean;
    selected: boolean;
    daysOfWeek: number[];
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    crn: number;
    type: 'T' | 'A' | 'B';
    sectionNumber: string;
    waitlistCount: number;
    linked: boolean;
}
