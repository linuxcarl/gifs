import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "@environments/environment";
import { Gift } from "../interfaces/gift.interface";
import { GiftMapper } from "../mapper/gift.mapper";
import { GiphyResponse } from "../interfaces/giphy.interfaces";

@Injectable({providedIn: 'root'})
export class GiftsService {

  private http = inject(HttpClient)

  trendingGifts =signal<Gift[]>([])
  trendingGiftsLoading = signal(true)


  constructor() {
    this.loadTrendingGifts()
  }
  loadTrendingGifts() {
    this.http.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/trending`,{
      params:{
        'api_key': environment.giphyApiKey,
        liimit: 10,
        offset: 0,
      }
    }).subscribe((response)=>{
      const gifts = GiftMapper.mapGiphyItemsToGigtArray(response.data)
      this.trendingGifts.set(gifts)
      this.trendingGiftsLoading.set(false)
    })
  }
}
