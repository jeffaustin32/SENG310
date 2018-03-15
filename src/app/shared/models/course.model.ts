import { Section } from './section.model';

export interface Course {
  subject: string;
  number: number;
  sections: Section[];
  linked: boolean;
  missingSection: boolean;
}
