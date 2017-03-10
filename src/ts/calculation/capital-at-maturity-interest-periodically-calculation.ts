import {InstallmentCalculation} from "./installment-calculation";
import {CalculationResult} from "./calculation-result";
import {CalculationTable} from "./calculation-table";
import {CalculationTableRow} from "./calculation-table-row";

/* Here we model the situation where the capital part is paid at loan's maturity
 * and interest payments are made every period. */
export class CapitalAtMaturityInterestPeriodicallyCalculation implements InstallmentCalculation {
    constructor(private debt: number, private interestRate: number, private periods: number) {}

    public calculate(): CalculationResult {
        const interest = Math.round(this.interestRate * this.debt);
        const result = new CalculationResult();

        for (let i = 0; i < this.periods; i++) {
            const period = i + 1;
            const capitalPart = (period === this.periods) ? this.debt : 0;

            const periodRow = new CalculationTableRow(period, this.debt, interest, capitalPart);
            result.calculationTable.addRow(periodRow);
        }

        result.interestSum = this.periods * interest;
        result.installmentSum = this.debt + result.interestSum;

        return result;
    }
}