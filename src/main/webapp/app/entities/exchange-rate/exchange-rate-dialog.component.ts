import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ExchangeRate } from './exchange-rate.model';
import { ExchangeRatePopupService } from './exchange-rate-popup.service';
import { ExchangeRateService } from './exchange-rate.service';

@Component({
    selector: 'jhi-exchange-rate-dialog',
    templateUrl: './exchange-rate-dialog.component.html'
})
export class ExchangeRateDialogComponent implements OnInit {

    exchangeRate: ExchangeRate;
    isSaving: boolean;
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private exchangeRateService: ExchangeRateService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.exchangeRate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.exchangeRateService.update(this.exchangeRate));
        } else {
            this.subscribeToSaveResponse(
                this.exchangeRateService.create(this.exchangeRate));
        }
    }

    private subscribeToSaveResponse(result: Observable<ExchangeRate>) {
        result.subscribe((res: ExchangeRate) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ExchangeRate) {
        this.eventManager.broadcast({ name: 'exchangeRateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-exchange-rate-popup',
    template: ''
})
export class ExchangeRatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private exchangeRatePopupService: ExchangeRatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.exchangeRatePopupService
                    .open(ExchangeRateDialogComponent as Component, params['id']);
            } else {
                this.exchangeRatePopupService
                    .open(ExchangeRateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
