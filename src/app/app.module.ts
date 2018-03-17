import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatExpansionModule, MatButtonModule, MatCheckboxModule, MatListModule,
  MatDialogModule, MatIconModule, MatInputModule, MAT_DIALOG_DEFAULT_OPTIONS,
  MatTooltipModule, MatRadioModule, MatTabsModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'angular-calendar';
import { CalendarWeekHoursViewModule } from 'angular-calendar-week-hours-view';

// Components
import { AppComponent } from './app.component';
import { RequiredCoursesComponent } from './required-courses/required-courses.component';
import { ElectiveCoursesComponent } from './elective-courses/elective-courses.component';
import { RegisteredCoursesComponent } from './registered-courses/registered-courses.component';
import { SelectedCoursesComponent } from './selected-courses/selected-courses.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CourseListComponent } from './shared/components/course-list/course-list.component';
import { SectionComponent } from './shared/components/section/section.component';
import { FiltersComponent } from './elective-courses/filters/filters.component';
import { SubjectsComponent } from './elective-courses/subjects/subjects.component';
import { LoginComponent } from './login/login.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { TermComponent } from './term/term.component';
import { TimetableComponent } from './timetable/timetable.component';

// Services
import { SectionService } from './shared/services/section.service';
import { SubjectsService } from './shared/services/subjects.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'term', component: TermComponent },
  { path: 'timetable', component: TimetableComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RequiredCoursesComponent,
    ElectiveCoursesComponent,
    RegisteredCoursesComponent,
    SelectedCoursesComponent,
    CalendarComponent,
    CourseListComponent,
    SectionComponent,
    FiltersComponent,
    SubjectsComponent,
    LoginComponent,
    ToolBarComponent,
    TermComponent,
    TimetableComponent
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
    MatListModule,
    MatInputModule,
    MatTooltipModule,
    MatRadioModule,
    MatTabsModule,
    FormsModule,
    CalendarModule.forRoot(),
    CalendarWeekHoursViewModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [
    SectionService,
    SubjectsService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  entryComponents: [
    FiltersComponent,
    SubjectsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
