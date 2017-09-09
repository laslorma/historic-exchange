import { BaseEntity } from './../../shared';

const enum Sistema {
    'NEGRO',
    'CADIVI',
    'CENCOEX',
    'SIMADI'
}

export class ExchangeRate implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public fromcurrency?: string,
        public tocurrency?: string,
        public conversionvalue?: number,
        public sistema?: Sistema,
    ) {
    }
}
