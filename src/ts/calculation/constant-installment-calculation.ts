import {InstallmentCalculation} from "./installment-calculation";
import {CalculationResult} from "./calculation-result";
import {CalculationTable} from "./calculation-table";
import {CalculationTableRow} from "./calculation-table-row";
import {MathUtils} from "../utils/math-utils";

/* Here we model the situation where every period the same installment is is paid
 * -> the capital part is increasing and interest part is decreasing every period.
 * The way to compute the value of constant installment for given parameters is described below */
export class ConstantInstallmentCalculation implements InstallmentCalculation {
    constructor(private debt: number, private interestRate: number, private periods: number) {}

    public calculate(): CalculationResult {
        const installment = this.computeInstallment();
        let currentDebt = this.debt;

        const result = new CalculationResult();
        result.installmentSum = this.periods * installment;
        result.interestSum = result.installmentSum - this.debt;

        for (let i = 0; i < this.periods; i++) {
            const period = i + 1;
            const interest = Math.round(currentDebt * this.interestRate);
            const capitalPart = installment - interest;

            const periodRow = new CalculationTableRow(period, currentDebt, interest, capitalPart);
            result.calculationTable.addRow(periodRow);

            currentDebt -= capitalPart;
        }

        return result;
    }

    /* COMPUTING CONSTANT INSTALLMENT:
     *
     * Let v be the discount factor for single period:
     *
     * v := 1/(1+i), where i is the interest rate (in %)
     *
     * Every month, the same installment is paid, but the installment has different present value (computed at the
     * moment of obtaining the loan) - the smaller the further it is in time from the moment of taking the loan.
     *
     * We assume the interest rate is constant throughout the lifetime of the loan.
     *
     * For example, the first payment has present value of CF_1 / v1 = CF_1 / v, second payment has value of
     * CF_2 / v2 = CF_2 / v1 * v1 = CF_2 / v^2 and so on.
     *
     * (CF_i and vi are i-th Cash Flow and discount factor, respectively). Because each cash flow is equal, we obtain:
     * CF_1 = CF_2 = ... = CF_n =: CF. Loan value (initial debt) K is the present value of all future payments, hence:
     *
     * K = CF * (v + v^2 + ... + v^n) and so
     *
     * CF = K / (v + v^2 + ... + v^n)
     *
     * Setting a_n := v + v^2 + ... + v^n, we obtain that K = CF * a_n and so the final formula for CF is:
     *
     * CF = K / a_n.
     *
     * */
    private computeInstallment(): number {
        const firstDiscountFactor = 1 / (1 + this.interestRate); // = v
        const discountFactorsSum = MathUtils.geometricArraySum(firstDiscountFactor, firstDiscountFactor, this.periods); // = a_n
        return Math.round(this.debt / discountFactorsSum); // = K / a_n
    }
}