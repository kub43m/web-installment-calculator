import {InstallmentCalculation} from "./installment-calculation";
import {CalculationResult} from "./calculation-result";
import {CalculationTable} from "./calculation-table";
import {CalculationTableRow} from "./calculation-table-row";

/* Here we model the situation where every period the same amount of capital is paid
 * (i.e. capital part of the installment is constant) and interest is paid every period
 * based on the amount of debt outstanding -> installments are decreasing every period */
export class ConstantCapitalPartCalculation implements InstallmentCalculation {
    constructor(private debt: number, private interestRate: number, private periods: number) {}

    public calculate(): CalculationResult {
        const capitalPart = Math.round(this.debt / this.periods);
        const result = new CalculationResult();
        let currentDebt = this.debt;
        let interestSum = 0;

        for (let i = 0; i < this.periods; i++) {
            const period = i + 1;
            const interest = Math.round(currentDebt * this.interestRate);

            const periodRow = new CalculationTableRow(period, currentDebt, interest, capitalPart);
            result.calculationTable.addRow(periodRow);

            currentDebt -= capitalPart;
            interestSum += interest;
        }

        result.interestSum = interestSum;
        result.installmentSum = this.debt + result.interestSum;

        return result;
    }
}
