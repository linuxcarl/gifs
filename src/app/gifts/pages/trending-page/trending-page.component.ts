import { Component, inject, signal } from '@angular/core';
import { GiftListComponent } from '../../components/gift-list/gift-list.component';
import { GiftsService } from '../../services/gifts.services';

@Component({
  selector: 'app-trending-page',
  imports: [GiftListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {
  giftService = inject(GiftsService);
}
