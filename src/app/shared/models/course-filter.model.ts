export interface CourseFilter {
    courseNumber: number;
    courseLevel: number[];
    dayOfWeek: number[];
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    waitlistCount: number;
}
