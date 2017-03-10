import {CapitalAndInterestAtMaturityCalculation} from "../src/ts/calculation/capital-and-interest-at-maturity-calculation";

describe("Capital-at-maturity-interest-periodically Calculation", () => {

    it("should calculate", () => {
        // $1,000 loan for 4 periods with effective rate 10% per period
        const calculation = new CapitalAndInterestAtMaturityCalculation(100000, 0.1, 4);
        const result = calculation.calculate();
        const calculationTable = result.calculationTable;

        expect(result.interestSum).toBe(46410);
        expect(result.installmentSum).toBe(146410);

        const row1 = calculationTable.getRow(0);
        expect(row1.period).toBe(1);
        expect(row1.debt).toBe(100000);
        expect(row1.interest).toBe(10000);
        expect(row1.capitalPart).toBe(0);
        expect(row1.installment).toBe(0);

        const row2 = calculationTable.getRow(1);
        expect(row2.period).toBe(2);
        expect(row2.debt).toBe(110000);
        expect(row2.interest).toBe(11000);
        expect(row2.capitalPart).toBe(0);
        expect(row2.installment).toBe(0);

        const row3 = calculationTable.getRow(2);
        expect(row3.period).toBe(3);
        expect(row3.debt).toBe(121000);
        expect(row3.interest).toBe(12100);
        expect(row3.capitalPart).toBe(0);
        expect(row3.installment).toBe(0);

        const row4 = calculationTable.getRow(3);
        expect(row4.period).toBe(4);
        expect(row4.debt).toBe(133100);
        expect(row4.interest).toBe(13310);
        expect(row4.capitalPart).toBe(133100);
        expect(row4.installment).toBe(146410);
    });
});