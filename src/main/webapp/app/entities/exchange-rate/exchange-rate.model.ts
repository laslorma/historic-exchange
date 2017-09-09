import { BaseEntity } from './../../shared';

export class ExchangeRate implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public conversionvalue?: number,
        public sueldomin?: number,
    ) {
    }
}
