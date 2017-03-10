import {InstallmentCalculation} from "./installment-calculation";
import {CalculationResult} from "./calculation-result";
import {CalculationTable} from "./calculation-table";
import {CalculationTableRow} from "./calculation-table-row";

/* Here we model the situation where both the capital part and all of interest are paid at loan's maturity.
 * Interest is accrued every period meaning that it increases outstanding debt's value. */
export class CapitalAndInterestAtMaturityCalculation implements InstallmentCalculation {
    constructor(private debt: number, private interestRate: number, private periods: number) {}

    public calculate(): CalculationResult {
        let currentDebt = this.debt;

        const result = new CalculationResult();

        for (let i = 0; i < this.periods; i++) {
            const period = i + 1;
            const interest = Math.round(this.interestRate * currentDebt);
            const lastPeriod = (period === this.periods);
            const capitalPart = lastPeriod ? currentDebt : 0;
            const installment = lastPeriod ? undefined : 0;

            const periodRow = new CalculationTableRow(period, currentDebt, interest, capitalPart, installment);
            result.calculationTable.addRow(periodRow);

            currentDebt += interest;
        }

        result.installmentSum = currentDebt;
        result.interestSum = currentDebt - this.debt;

        return result;
    }
}