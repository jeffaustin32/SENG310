import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SectionService } from '../shared/services/section.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  netlinkId: string;

  constructor(private sectionService: SectionService, private router: Router) { }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onLoginClick();
    }
  }

  onLoginClick(): void {
    if (!this.netlinkId) {
      return;
    }

    if (!this.sectionService.login(this.netlinkId)) {
      return;
    }

    this.router.navigate(['/term']);
  }

}
