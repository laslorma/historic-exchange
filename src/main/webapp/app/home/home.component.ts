import { ExchangeRateService } from './../entities/exchange-rate/exchange-rate.service';
import { Observable } from 'rxjs/Rx';
import { ExchangeRate } from './../entities/exchange-rate/exchange-rate.model';
import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    isSearching: boolean;
    account: Account;
    modalRef: NgbModalRef;
    exchangeRate: ExchangeRate;
    latestExchangeRate: ExchangeRate;
    firstExchangeRate: ExchangeRate;
    dateDp: any;
    dollars: number;
    minDate = { year: 2010, month: 6, day: 23 };
    maxDate = { year: 2017, month: 6, day: 30 };

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private alertService: JhiAlertService,
        private exchangeRateService: ExchangeRateService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.isSearching = false;
        this.exchangeRate = new ExchangeRate();
        this.dollars = 1;
        this.searchLatest();
        this.searchFirst();

    }

    private convertAndAssignToMaxDate(result: ExchangeRate) {

        // const dateArray: string[] = result.date.split('-');
        // this.maxDate.year = Number(dateArray[0]);
        // this.maxDate.month = Number(dateArray[1]);
        // this.maxDate.day = Number(dateArray[2]);
        this.maxDate.year = result.date.getFullYear();
        this.maxDate.month = result.date.getMonth() + 1;
        this.maxDate.day = result.date.getDate();

    }

    private onSearchFirstSuccess(result: ExchangeRate) {
        this.firstExchangeRate = result;
        this.isSearching = false;
    }

    private onSearchLatestSuccess(result: ExchangeRate) {
        this.convertAndAssignToMaxDate(result);
        this.latestExchangeRate = result;
        this.isSearching = false;
    }

    private onSearchSuccess(result: ExchangeRate) {
        this.isSearching = false;
        this.dollars = 1;
        this.exchangeRate.conversionvalue = 1;
        this.exchangeRate = result;
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    private onSearchError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSearching = false;
        this.onError(error);
    }

    private subscribeToFirstResponse(result: Observable<ExchangeRate>) {
        result.subscribe((res: ExchangeRate) =>
            this.onSearchFirstSuccess(res), (res: Response) => this.onSearchError(res));
    }

    private subscribeToLatestResponse(result: Observable<ExchangeRate>) {
        result.subscribe((res: ExchangeRate) =>
            this.onSearchLatestSuccess(res), (res: Response) => this.onSearchError(res));
    }

    private subscribeToSearchResponse(result: Observable<ExchangeRate>) {
        result.subscribe((res: ExchangeRate) =>
            this.onSearchSuccess(res), (res: Response) => this.onSearchError(res));
    }

    searchByDate() {
        this.isSearching = true;
        console.log('Searching ' + console.log(JSON.stringify(this.exchangeRate)));
        this.subscribeToSearchResponse(
            this.exchangeRateService.searchByDate(this.exchangeRate));

    }

    searchFirst() {
        this.isSearching = true;
        console.log('Searching First');
        this.subscribeToFirstResponse(
            this.exchangeRateService.searchFirst());

    }

    searchLatest() {
        this.isSearching = true;
        console.log('Searching Latest');
        this.subscribeToLatestResponse(
            this.exchangeRateService.searchLatest());

    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    exchangeRateObject() {
        return JSON.stringify(this.exchangeRate);
    }
}
