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
  trendingGiftsLoading = signal(false)
  trendingPage = signal(0)

  trendingGifsGroups = computed<Gift[][]>(()=>{
    const groups = []
    for( let i = 0; i < this.trendingGifts().length; i+=3){
      groups.push(this.trendingGifts().slice(i, i+3))
    }
    return groups;
  })

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
        limit: 21,
        offset: this.trendingPage() * 21,
      }
    }).subscribe((response)=>{
      const gifs = GiftMapper.mapGiphyItemsToGigtArray(response.data)
      this.trendingGifts.update(currentGifs =>[
        ...currentGifs,
        ...gifs
      ])
      this.trendingGiftsLoading.set(false)
      this.trendingPage.update((page) => page + 1)
    })
  }

  searchGifts(query: string){
    if(this.trendingGiftsLoading()) return;

    this.trendingGiftsLoading.set(true)

    return this.http.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/search`,{
      params:{
        'api_key': environment.giphyApiKey,
        q: query,
        limit: 21,
        offset: this.trendingPage() * 21,
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
