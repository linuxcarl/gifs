import { Gift } from "../interfaces/gift.interface";
import { GiphyItem } from "../interfaces/giphy.interfaces";

export class  GiftMapper {
  static mapGiphyItemToGift(gift: GiphyItem): Gift {
    return {
      id: gift.id,
      title: gift.title,
      url: gift.images.original.url,
    };
  }

  static mapGiphyItemsToGigtArray(gifts: GiphyItem[]): Gift[] {
    return gifts.map(this.mapGiphyItemToGift)
  }
}
