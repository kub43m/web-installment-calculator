import {InstallmentCalculation} from "./installment-calculation";
import {CalculationPeriodInputType, CalculationRepaymentFrequency, CalculationRepaymentMode} from "./calculation-enums";
import {CapitalAndInterestAtMaturityCalculation} from "./capital-and-interest-at-maturity-calculation";
import {CapitalAtMaturityInterestPeriodicallyCalculation} from "./capital-at-maturity-interest-periodically-calculation";
import {ConstantCapitalPartCalculation} from "./constant-capital-part-calculation";
import {ConstantInstallmentCalculation} from "./constant-installment-calculation";

export class InstallmentCalculationFactory {

    public static getInstallmentCalculation(
        debt: number,
        interestRate: number,
        periods: number,
        periodInputType: CalculationPeriodInputType,
        repaymentFrequency: CalculationRepaymentFrequency,
        repaymentMode: CalculationRepaymentMode
    ): InstallmentCalculation {
        const effectiveRate = InstallmentCalculationFactory.getEffectiveRate(interestRate, repaymentFrequency);
        const effectivePeriods = InstallmentCalculationFactory.getEffectivePeriods(periods, periodInputType, repaymentFrequency);

        switch (repaymentMode) {
            case CalculationRepaymentMode.CAPITAL_AND_INTEREST_AT_END:
                return new CapitalAndInterestAtMaturityCalculation(debt, effectiveRate, effectivePeriods);
            case CalculationRepaymentMode.CAPITAL_AT_END_INTEREST_PERIODICALLY:
                return new CapitalAtMaturityInterestPeriodicallyCalculation(debt, effectiveRate, effectivePeriods);
            case CalculationRepaymentMode.CONSTANT_CAPITAL_PART:
                return new ConstantCapitalPartCalculation(debt, effectiveRate, effectivePeriods);
            case CalculationRepaymentMode.CONSTANT_INSTALLMENT:
                return new ConstantInstallmentCalculation(debt, effectiveRate, effectivePeriods);
            default:
                throw new Error(`Wrong repayment mode: ${repaymentMode}`);
        }
    }

    public static getEffectiveRate(rate: number, repaymentFrequency: CalculationRepaymentFrequency): number {
        return (repaymentFrequency === CalculationRepaymentFrequency.MONTHLY) ? rate / 12 : rate;
    }

    public static getEffectivePeriods(
        periods: number,
        periodInputType: CalculationPeriodInputType,
        repaymentFrequency: CalculationRepaymentFrequency
    ): number {
        let effectivePeriods = periods;

        if (InstallmentCalculationFactory.shouldConvertYearsToMonths(periodInputType, repaymentFrequency)) {
            effectivePeriods *= 12;
        } else if (InstallmentCalculationFactory.shouldConvertMonthsToYears(periodInputType, repaymentFrequency)) {
            if (periods % 12 !== 0) {
                throw new Error(`When payments are made yearly and input period is months,
                the number of periods needs to be divisible by 12.
                Given number of periods: ${periods}`.replace(/\s+/g, " "));
            }
            effectivePeriods /= 12;
        }
        return effectivePeriods;
    }

    private static shouldConvertYearsToMonths(periodInputType: CalculationPeriodInputType,
        repaymentFrequency: CalculationRepaymentFrequency): boolean {
            return periodInputType === CalculationPeriodInputType.YEARS &&
                repaymentFrequency === CalculationRepaymentFrequency.MONTHLY;
    }

    private static shouldConvertMonthsToYears(periodInputType: CalculationPeriodInputType,
        repaymentFrequency: CalculationRepaymentFrequency): boolean {
            return periodInputType === CalculationPeriodInputType.MONTHS &&
                repaymentFrequency === CalculationRepaymentFrequency.YEARLY;
    }
}
