import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GiftsService } from '../../services/gifts.services';
import { GiftListComponent } from '../../components/gift-list/gift-list.component';

@Component({
  selector: 'gif-history',
  imports: [GiftListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {
  gifsService = inject(GiftsService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query']))
  )

  gifsByKey = computed(()=> this.gifsService.getHistoryGifs(this.query() ?? ''))
}
