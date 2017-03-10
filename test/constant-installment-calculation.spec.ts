import {ConstantInstallmentCalculation} from "../src/ts/calculation/constant-installment-calculation";

describe("Capital-and-interest-at-maturity Calculation", () => {

 it("should calculate", () => {
        // $1,000 loan for 4 periods with effective rate 10% per period
        const calculation = new ConstantInstallmentCalculation(100000, 0.1, 4);
        const result = calculation.calculate();
        const calculationTable = result.calculationTable;

        expect(result.interestSum).toBe(26188);
        expect(result.installmentSum).toBe(126188);

        const row1 = calculationTable.getRow(0);
        expect(row1.period).toBe(1);
        expect(row1.debt).toBe(100000);
        expect(row1.interest).toBe(10000);
        expect(row1.capitalPart).toBe(21547);
        expect(row1.installment).toBe(31547);

        const row2 = calculationTable.getRow(1);
        expect(row2.period).toBe(2);
        expect(row2.debt).toBe(78453);
        expect(row2.interest).toBe(7845);
        expect(row2.capitalPart).toBe(23702);
        expect(row2.installment).toBe(31547);

        const row3 = calculationTable.getRow(2);
        expect(row3.period).toBe(3);
        expect(row3.debt).toBe(54751);
        expect(row3.interest).toBe(5475);
        expect(row3.capitalPart).toBe(26072);
        expect(row3.installment).toBe(31547);

        const row4 = calculationTable.getRow(3);
        expect(row4.period).toBe(4);
        expect(row4.debt).toBe(28679);
        expect(row4.interest).toBe(2868);
        expect(row4.capitalPart).toBe(28679);
        expect(row4.installment).toBe(31547);
    });
});
