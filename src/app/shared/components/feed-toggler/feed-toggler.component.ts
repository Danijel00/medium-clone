import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { selectCurrentUser } from '../../../auth/store/reducers';

@Component({
  selector: 'mc-feed-toggler',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './feed-toggler.component.html',
  styleUrl: './feed-toggler.component.scss'
})
export class FeedTogglerComponent {
  public iconPath: any = 'assets/svg/icons.svg';
  @Input() tagName?: string;

  currentUser$ = this.store.select(selectCurrentUser);

  constructor(private store: Store) { }
}
