import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';

@Component({
  selector: 'mc-backend-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class="error-message">
      <li *ngFor="let errorMessage of errorMessages">
        {{ errorMessage }}
      </li>
    </ul>
  `,
  styleUrl: './backend-error-message.component.scss'
})
export class BackendErrorMessageComponent implements OnInit {
  @Input() backendErrors: BackendErrorsInterface = {}
  errorMessages: string[] = [];

  ngOnInit(): void {
    // Converting object to an array {email: Array(1)}
    this.errorMessages = Object.entries(this.backendErrors)
      .map(([key, messages]: [string, string[]]) => {
        const formattedKey = this.capitalizeFirstLetter(key);
        const formattedMessages = messages.join('');
        return `${formattedKey} ${formattedMessages}`;
      })
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
