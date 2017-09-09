import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BsrateTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ExchangeRateDetailComponent } from '../../../../../../main/webapp/app/entities/exchange-rate/exchange-rate-detail.component';
import { ExchangeRateService } from '../../../../../../main/webapp/app/entities/exchange-rate/exchange-rate.service';
import { ExchangeRate } from '../../../../../../main/webapp/app/entities/exchange-rate/exchange-rate.model';

describe('Component Tests', () => {

    describe('ExchangeRate Management Detail Component', () => {
        let comp: ExchangeRateDetailComponent;
        let fixture: ComponentFixture<ExchangeRateDetailComponent>;
        let service: ExchangeRateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BsrateTestModule],
                declarations: [ExchangeRateDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ExchangeRateService,
                    JhiEventManager
                ]
            }).overrideTemplate(ExchangeRateDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExchangeRateDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExchangeRateService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ExchangeRate(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.exchangeRate).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
