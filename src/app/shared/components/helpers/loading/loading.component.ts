import { Component } from '@angular/core';

@Component({
  selector: 'mc-loading',
  standalone: true,
  imports: [],
  template: `
    <div class="wrapper">
      <div class="spinner">
        <svg>
          <use [attr.href]="iconPath + '#icon-loader'"></use>
        </svg>
      </div>
    </div>
  `,
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  iconPath: string = 'assets/svg/icons.svg';
}
