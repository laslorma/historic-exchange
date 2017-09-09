import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ExchangeRate } from './exchange-rate.model';
import { ExchangeRatePopupService } from './exchange-rate-popup.service';
import { ExchangeRateService } from './exchange-rate.service';

@Component({
    selector: 'jhi-exchange-rate-delete-dialog',
    templateUrl: './exchange-rate-delete-dialog.component.html'
})
export class ExchangeRateDeleteDialogComponent {

    exchangeRate: ExchangeRate;

    constructor(
        private exchangeRateService: ExchangeRateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.exchangeRateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'exchangeRateListModification',
                content: 'Deleted an exchangeRate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-exchange-rate-delete-popup',
    template: ''
})
export class ExchangeRateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private exchangeRatePopupService: ExchangeRatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.exchangeRatePopupService
                .open(ExchangeRateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
