import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ExchangeRateComponent } from './exchange-rate.component';
import { ExchangeRateDetailComponent } from './exchange-rate-detail.component';
import { ExchangeRatePopupComponent } from './exchange-rate-dialog.component';
import { ExchangeRateDeletePopupComponent } from './exchange-rate-delete-dialog.component';

@Injectable()
export class ExchangeRateResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const exchangeRateRoute: Routes = [
    {
        path: 'exchange-rate',
        component: ExchangeRateComponent,
        resolve: {
            'pagingParams': ExchangeRateResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bsrateApp.exchangeRate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'exchange-rate/:id',
        component: ExchangeRateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bsrateApp.exchangeRate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const exchangeRatePopupRoute: Routes = [
    {
        path: 'exchange-rate-new',
        component: ExchangeRatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bsrateApp.exchangeRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'exchange-rate/:id/edit',
        component: ExchangeRatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bsrateApp.exchangeRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'exchange-rate/:id/delete',
        component: ExchangeRateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bsrateApp.exchangeRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
