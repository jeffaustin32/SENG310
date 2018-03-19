import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/course.model';

@Pipe({
    name: 'coursePipe',
    pure: false
})
export class CoursePipe implements PipeTransform {
    transform(courses: Course[], input: string): any {
        if (!courses || !input) {
            return courses;
        }

        return courses.filter(course => {
            const name = `${course.subject.toLowerCase()}${course.number}`;
            return name.toLowerCase().indexOf(input.toLowerCase()) !== -1;
        });
    }
}
