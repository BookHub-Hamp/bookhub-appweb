import { Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

import { BookListComponent } from './book-management/book-list/book-list.component';
import { CategoryFormComponent } from './category-management/category-form/category-form.component';
import { CategoryListComponent } from './category-management/category-list/category-list.component';
import { MonthlySalesSummaryComponent } from './reports/monthly-sales-summary/monthly-sales-summary.component';
import { SalesReportComponent } from './reports/sales-report/sales-report.component';
import BookFormComponent from './book-management/book-form/book-form.component';

export const authorRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'books/new', component: BookFormComponent },
      { path: 'books/edit/:id', component: BookFormComponent },
      { path: 'books/list', component: BookListComponent },

      { path: 'categories/new', component: CategoryFormComponent },
      { path: 'categories/edit/:id', component: CategoryFormComponent },
      { path: 'categories/list', component: CategoryListComponent },

      {
        path: 'reports/monthly-sales',
        component: MonthlySalesSummaryComponent,
      },
      { path: 'reports/sales', component: SalesReportComponent },
    ],
  },
];
