import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ExchangeRate } from './exchange-rate.model';
import { ExchangeRateService } from './exchange-rate.service';

@Injectable()
export class ExchangeRatePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private exchangeRateService: ExchangeRateService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.exchangeRateService.find(id).subscribe((exchangeRate) => {
                    if (exchangeRate.date) {
                        exchangeRate.date = {
                            year: exchangeRate.date.getFullYear(),
                            month: exchangeRate.date.getMonth() + 1,
                            day: exchangeRate.date.getDate()
                        };
                    }
                    this.ngbModalRef = this.exchangeRateModalRef(component, exchangeRate);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.exchangeRateModalRef(component, new ExchangeRate());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    exchangeRateModalRef(component: Component, exchangeRate: ExchangeRate): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.exchangeRate = exchangeRate;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
