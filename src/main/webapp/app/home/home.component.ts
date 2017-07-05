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
     dateDp: any;

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
        this.exchangeRate.conversionvalue = 1;
    }

    private onSearchSuccess(result: ExchangeRate) {
        // this.eventManager.broadcast({ name: 'exchangeRateListModification', content: 'OK'});
        this.isSearching = false;
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
}
