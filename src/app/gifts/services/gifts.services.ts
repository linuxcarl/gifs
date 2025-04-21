import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { environment } from "@environments/environment";
import { Gift } from "../interfaces/gift.interface";
import { GiftMapper } from "../mapper/gift.mapper";
import { GiphyResponse } from "../interfaces/giphy.interfaces";
import { map, tap } from "rxjs";

const GIF_KEY = 'gifs'

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs;
}
@Injectable({providedIn: 'root'})
export class GiftsService {

  private http = inject(HttpClient)

  trendingGifts =signal<Gift[]>([])
  trendingGiftsLoading = signal(true)

  searchHistory = signal<Record<string, Gift[]>>(loadFromLocalStorage())
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

saveGifsToLocalStorage = effect(() => {
  const historyString = JSON.stringify(this.searchHistory());
  localStorage.setItem(GIF_KEY, historyString);
})

  constructor() {
    this.loadTrendingGifts()
  }
  loadTrendingGifts() {
    this.http.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/trending`,{
      params:{
        'api_key': environment.giphyApiKey,
        liimit: 12,
        offset: 0,
      }
    }).subscribe((response)=>{
      const gifts = GiftMapper.mapGiphyItemsToGigtArray(response.data)
      this.trendingGifts.set(gifts)
      this.trendingGiftsLoading.set(false)
    })
  }

  searchGifts(query: string){
    return this.http.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/search`,{
      params:{
        'api_key': environment.giphyApiKey,
        q: query,
        limit: 12,
        offset: 0,
      }
    })
    .pipe(
      map(({data})=> data),
      map((items)=> GiftMapper.mapGiphyItemsToGigtArray(items)),
      tap((items) => {
        this.searchHistory.update((history) => ({
          ...history,
          [query.toLowerCase()]: items,
        }));
      })
    )
  }

  getHistoryGifs(query:string): Gift[]{
    return this.searchHistory()[query] ?? []
  }
}
