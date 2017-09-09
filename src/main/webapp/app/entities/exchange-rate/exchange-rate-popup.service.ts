import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ExchangeRate } from './exchange-rate.model';
import { ExchangeRateService } from './exchange-rate.service';

@Injectable()
export class ExchangeRatePopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private exchangeRateService: ExchangeRateService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.exchangeRateService.find(id).subscribe((exchangeRate) => {
                if (exchangeRate.date) {
                    exchangeRate.date = {
                        year: exchangeRate.date.getFullYear(),
                        month: exchangeRate.date.getMonth() + 1,
                        day: exchangeRate.date.getDate()
                    };
                }
                this.exchangeRateModalRef(component, exchangeRate);
            });
        } else {
            return this.exchangeRateModalRef(component, new ExchangeRate());
        }
    }

    exchangeRateModalRef(component: Component, exchangeRate: ExchangeRate): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.exchangeRate = exchangeRate;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
