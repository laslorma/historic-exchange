import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { BsrateSharedModule, UserRouteAccessService } from './shared';
import { BsrateHomeModule } from './home/home.module';
import { BsrateAdminModule } from './admin/admin.module';
import { BsrateAccountModule } from './account/account.module';
import { BsrateEntityModule } from './entities/entity.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { LOCALE_ID } from '@angular/core';

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        BsrateSharedModule,
        BsrateHomeModule,
        BsrateAdminModule,
        BsrateAccountModule,
        BsrateEntityModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService,
         { provide: LOCALE_ID, useValue: 'es-VE' },
    ],
    bootstrap: [ JhiMainComponent ]
})
export class BsrateAppModule {}
