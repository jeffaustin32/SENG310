import { Pipe, PipeTransform } from '@angular/core';
import { Subject } from '../models/subject.model';

@Pipe({
    name: 'textFilter',
    pure: false
})
export class TextFilter implements PipeTransform {
    transform(subjects: Subject[], input: string): any {
        if (!subjects || !input) {
            return subjects;
        }

        return subjects.filter(subject => subject.name.toLowerCase().indexOf(input.toLowerCase()) !== -1);
    }
}