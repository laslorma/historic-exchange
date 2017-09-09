import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ExchangeRate } from './exchange-rate.model';
import { ExchangeRateService } from './exchange-rate.service';

@Component({
    selector: 'jhi-exchange-rate-detail',
    templateUrl: './exchange-rate-detail.component.html'
})
export class ExchangeRateDetailComponent implements OnInit, OnDestroy {

    exchangeRate: ExchangeRate;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private exchangeRateService: ExchangeRateService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInExchangeRates();
    }

    load(id) {
        this.exchangeRateService.find(id).subscribe((exchangeRate) => {
            this.exchangeRate = exchangeRate;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInExchangeRates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'exchangeRateListModification',
            (response) => this.load(this.exchangeRate.id)
        );
    }
}
