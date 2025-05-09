import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GiftsService } from 'src/app/gifts/services/gifts.services';

interface MenuOption{
  icon: string;
  label: string;
  route: string;
  subLabel?: string;
}

@Component({
  selector: 'gifts-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export default class SideMenuOptionsComponent {
  giftService = inject(GiftsService)

  menuOptions : MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Gifts Populares',
      route: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      subLabel: 'Buscar gifts',
      route: '/dashboard/search'
    }
]
}
