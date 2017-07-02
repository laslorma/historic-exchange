import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BsrateSharedModule } from '../../shared';
import {
    ExchangeRateService,
    ExchangeRatePopupService,
    ExchangeRateComponent,
    ExchangeRateDetailComponent,
    ExchangeRateDialogComponent,
    ExchangeRatePopupComponent,
    ExchangeRateDeletePopupComponent,
    ExchangeRateDeleteDialogComponent,
    exchangeRateRoute,
    exchangeRatePopupRoute,
    ExchangeRateResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...exchangeRateRoute,
    ...exchangeRatePopupRoute,
];

@NgModule({
    imports: [
        BsrateSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ExchangeRateComponent,
        ExchangeRateDetailComponent,
        ExchangeRateDialogComponent,
        ExchangeRateDeleteDialogComponent,
        ExchangeRatePopupComponent,
        ExchangeRateDeletePopupComponent,
    ],
    entryComponents: [
        ExchangeRateComponent,
        ExchangeRateDialogComponent,
        ExchangeRatePopupComponent,
        ExchangeRateDeleteDialogComponent,
        ExchangeRateDeletePopupComponent,
    ],
    providers: [
        ExchangeRateService,
        ExchangeRatePopupService,
        ExchangeRateResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BsrateExchangeRateModule {}
