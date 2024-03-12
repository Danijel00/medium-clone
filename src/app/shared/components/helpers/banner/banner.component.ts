import { Component } from "@angular/core";

@Component({
  selector: 'mc-banner',
  standalone: true,
  imports: [],
  template: `
    <div class="banner">
      <h1>Medium Clone</h1>
      <span>A place to share knowledge</span>
    </div>
  `,
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  
}
