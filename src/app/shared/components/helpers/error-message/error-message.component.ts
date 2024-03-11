import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-error-message',
  standalone: true,
  imports: [],
  template: `
    <div>{{ message }}</div>
  `,
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {
  @Input() message: string = 'Something went wrong!';
}
