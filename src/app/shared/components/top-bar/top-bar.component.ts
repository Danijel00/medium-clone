import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { selectCurrentUser } from '../../../auth/store/reducers';

@Component({
  selector: 'mc-top-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  public iconPath: any = 'assets/svg/icons.svg';
  currentUser$ = this.store.select(selectCurrentUser)

  constructor(private store: Store) { }
}
