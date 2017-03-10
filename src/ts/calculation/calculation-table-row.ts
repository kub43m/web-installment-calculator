export class CalculationTableRow {
    constructor(
        public period: number,
        public debt: number,
        public interest: number,
        public capitalPart: number,
        public installment?: number // we can force particular payment value
    ) {
        this.installment = (installment !== undefined) ? installment : interest + capitalPart;
    }
}