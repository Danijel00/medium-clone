import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { addToFavoritesActions } from './store/actions';

@Component({
  selector: 'mc-add-to-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-to-favorites.component.html',
  styleUrl: './add-to-favorites.component.scss'
})
export class AddToFavoritesComponent {
  public iconPath: any = 'assets/svg/icons.svg';
  @Input() isFavorited: boolean = false;
  @Input() articleSlug: string = ''
  @Input() favoritesCount: number = 0;

  constructor(private store: Store) {
  }

  handleClick(): void {
    this.store.dispatch(
      addToFavoritesActions.addToFavorites({
        isFavorited: this.isFavorited,
        slug: this.articleSlug
      })
    )

    if (this.isFavorited) {
      this.favoritesCount = this.favoritesCount - 1
    } else {
      this.favoritesCount = this.favoritesCount + 1
    }

    this.isFavorited = !this.isFavorited
  }
}
