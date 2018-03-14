import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatExpansionModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'angular-calendar';
import { CalendarWeekHoursViewModule } from 'angular-calendar-week-hours-view';

import { AppComponent } from './app.component';
import { RequiredCoursesComponent } from './required-courses/required-courses.component';
import { ElectiveCoursesComponent } from './elective-courses/elective-courses.component';
import { RegisteredCoursesComponent } from './registered-courses/registered-courses.component';
import { SelectedCoursesComponent } from './selected-courses/selected-courses.component';
import { CalendarComponent } from './calendar/calendar.component';

import { SectionService } from './shared/services/section.service';
import { CourseListComponent } from './shared/components/course-list/course-list.component';
import { SectionComponent } from './shared/components/section/section.component';

@NgModule({
  declarations: [
    AppComponent,
    RequiredCoursesComponent,
    ElectiveCoursesComponent,
    RegisteredCoursesComponent,
    SelectedCoursesComponent,
    CalendarComponent,
    CourseListComponent,
    SectionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatExpansionModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    CalendarModule.forRoot(),
    CalendarWeekHoursViewModule
  ],
  providers: [
    SectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
