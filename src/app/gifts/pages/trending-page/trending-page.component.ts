import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GiftsService } from '../../services/gifts.services';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.services';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit{
  giftService = inject(GiftsService);
  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void|boolean {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return false;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return false;

    const scrollTop = scrollDiv?.scrollTop;
    const clientHeigth = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = scrollTop + clientHeigth +300 >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop)

    if(isAtBottom){
      console.log('Loading more gifs');
      this.giftService.loadTrendingGifts();
    }
    return isAtBottom;
  }
}
