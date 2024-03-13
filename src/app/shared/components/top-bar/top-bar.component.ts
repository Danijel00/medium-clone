import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'mc-top-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  public iconPath: any = 'assets/svg/icons.svg';

  constructor(private store: Store) { }

  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser)
  })
}



