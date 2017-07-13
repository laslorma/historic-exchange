import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { ExchangeRate } from './exchange-rate.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ExchangeRateService {

    private resourceUrl = 'api/exchange-rates';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(exchangeRate: ExchangeRate): Observable<ExchangeRate> {
        const copy = this.convert(exchangeRate);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(exchangeRate: ExchangeRate): Observable<ExchangeRate> {
        const copy = this.convert(exchangeRate);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<ExchangeRate> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    searchFirst(): Observable<ExchangeRate> {
        return this.http.get(`${this.resourceUrl}/search/first`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    searchLatest(): Observable<ExchangeRate> {
        return this.http.get(`${this.resourceUrl}/search/latest`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    searchByDate(exchangeRate: ExchangeRate): Observable<ExchangeRate> {
        const copy = this.convert(exchangeRate);
        const date: String = copy.date;
        return this.http.get(`${this.resourceUrl}/search/date/${date}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.date = this.dateUtils
            .convertLocalDateFromServer(entity.date);
    }

    private convert(exchangeRate: ExchangeRate): ExchangeRate {
        const copy: ExchangeRate = Object.assign({}, exchangeRate);
        copy.date = this.dateUtils
            .convertLocalDateToServer(exchangeRate.date);
        return copy;
    }
}
