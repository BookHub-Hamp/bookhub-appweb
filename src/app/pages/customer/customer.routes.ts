import { Routes } from '@angular/router';

import { CatalogComponent } from './catalog/catalog.component';
import { CollectionComponent } from './collection/collection.component';
import { LayoutComponent } from './layout/layout.component';
import { UpdateProfileComponent } from '../../shared/components/update-profile/update-profile.component';
import { UserProfileComponent } from '../../shared/components/user-profile/user-profile.component';
import { HistoryComponent } from './purchases/history/history.component';

import { DetailsComponent } from './catalog/details/details.component';
import { CartComponent } from './purchases/cart/cart.component';

export const customerRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'catalog', component: CatalogComponent },
      { path: 'catalog/details/:id', component: DetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'collection', component: CollectionComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'profile/update', component: UpdateProfileComponent },
      { path: 'purchases/history', component: HistoryComponent },
    ],
  },
];
