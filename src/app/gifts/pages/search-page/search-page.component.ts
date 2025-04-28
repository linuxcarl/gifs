import { Component, inject, signal } from '@angular/core';
import { GiftListComponent } from '../../components/gift-list/gift-list.component';
import { GiftsService } from '../../services/gifts.services';
import { Gift } from '../../interfaces/gift.interface';

@Component({
  selector: 'app-search-page',
  imports: [GiftListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {
  giftsService = inject(GiftsService);
  gifs = signal<Gift[]>([])

  onSearch(query:string){
    // this.giftsService.searchGifts(query).subscribe((response: Gift[]) => {
    //     this.gifs.set(response)
    //   }
    // )
  }
}
