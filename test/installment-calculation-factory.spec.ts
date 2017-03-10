import {InstallmentCalculationFactory} from "../src/ts/calculation/installment-calculation-factory";
import {CalculationPeriodInputType, CalculationRepaymentFrequency, CalculationRepaymentMode} from "../src/ts/calculation/calculation-enums";
import {ConstantInstallmentCalculation} from "../src/ts/calculation/constant-installment-calculation";
import {ConstantCapitalPartCalculation} from "../src/ts/calculation/constant-capital-part-calculation";
import {CapitalAndInterestAtMaturityCalculation} from "../src/ts/calculation/capital-and-interest-at-maturity-calculation";
import {CapitalAtMaturityInterestPeriodicallyCalculation} from "../src/ts/calculation/capital-at-maturity-interest-periodically-calculation";

describe("Capital-and-interest-at-maturity Calculation", () => {

    it("should correctly compute effective number of periods", () => {
        const monthsMonthly = InstallmentCalculationFactory.getEffectivePeriods(12,
            CalculationPeriodInputType.MONTHS, CalculationRepaymentFrequency.MONTHLY);
        expect(monthsMonthly).toBe(12);

        const yearsYearly = InstallmentCalculationFactory.getEffectivePeriods(12,
            CalculationPeriodInputType.YEARS, CalculationRepaymentFrequency.YEARLY);
        expect(yearsYearly).toBe(12);

        const yearsMonthly = InstallmentCalculationFactory.getEffectivePeriods(12,
            CalculationPeriodInputType.YEARS, CalculationRepaymentFrequency.MONTHLY);
        expect(yearsMonthly).toBe(144);

        const monthsYearlyGoodInput = InstallmentCalculationFactory.getEffectivePeriods(12,
            CalculationPeriodInputType.MONTHS, CalculationRepaymentFrequency.YEARLY);
        expect(monthsYearlyGoodInput).toBe(1);

        const monthsYearlyBadInput = () => {
            InstallmentCalculationFactory.getEffectivePeriods(14,
                CalculationPeriodInputType.MONTHS, CalculationRepaymentFrequency.YEARLY);
        };
        expect(monthsYearlyBadInput).toThrow();
    });

    it("should correctly compute effective interest rate", () => {
        expect(InstallmentCalculationFactory.getEffectiveRate(0.12, CalculationRepaymentFrequency.MONTHLY)).toBe(0.01);
        expect(InstallmentCalculationFactory.getEffectiveRate(0.12, CalculationRepaymentFrequency.YEARLY)).toBe(0.12);
    });

    it("should create calculation objects of correct type", () => {
        const constantInstallmentCalculation = InstallmentCalculationFactory.getInstallmentCalculation(1000, 0.1, 4,
            CalculationPeriodInputType.YEARS, CalculationRepaymentFrequency.YEARLY, CalculationRepaymentMode.CONSTANT_INSTALLMENT);
        expect(constantInstallmentCalculation instanceof ConstantInstallmentCalculation).toBeTruthy();

        const constantCapitalPartCalculation = InstallmentCalculationFactory.getInstallmentCalculation(1000, 0.1, 4,
            CalculationPeriodInputType.YEARS, CalculationRepaymentFrequency.YEARLY, CalculationRepaymentMode.CONSTANT_CAPITAL_PART);
        expect(constantCapitalPartCalculation instanceof ConstantCapitalPartCalculation).toBeTruthy();

        const capitalAndInterestAtMaturityCalculation = InstallmentCalculationFactory.getInstallmentCalculation(1000, 0.1, 4,
            CalculationPeriodInputType.YEARS, CalculationRepaymentFrequency.YEARLY, CalculationRepaymentMode.CAPITAL_AND_INTEREST_AT_END);
        expect(capitalAndInterestAtMaturityCalculation instanceof CapitalAndInterestAtMaturityCalculation).toBeTruthy();

        const capitalAtMaturityInterestPeriodicallyCalculation = InstallmentCalculationFactory.getInstallmentCalculation(1000, 0.1, 4,
            CalculationPeriodInputType.YEARS, CalculationRepaymentFrequency.YEARLY, CalculationRepaymentMode.CAPITAL_AT_END_INTEREST_PERIODICALLY);
        expect(capitalAtMaturityInterestPeriodicallyCalculation instanceof CapitalAtMaturityInterestPeriodicallyCalculation).toBeTruthy();
    });
});
