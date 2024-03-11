import { Component } from '@angular/core';
import { FeedComponent } from '../../shared/components/feed/feed.component';
import { BannerComponent } from '../../shared/components/helpers/banner/banner.component';
import { PopularTagsComponent } from '../../shared/components/popular-tags/popular-tags.component';
import { FeedTogglerComponent } from '../../shared/components/feed-toggler/feed-toggler.component';

@Component({
  selector: 'mc-your-feed',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
  templateUrl: './your-feed.component.html',
  styleUrl: './your-feed.component.scss'
})
export class YourFeedComponent {
  apiUrl = '/articles/feed'
}
