import {CalculationTable} from "./calculation-table";

export class CalculationResult {
    public installmentSum: number;
    public interestSum: number;
    public calculationTable: CalculationTable;

    constructor(installmentSum?: number, interestSum?: number, calculationTable?: CalculationTable) {
        this.installmentSum = installmentSum || 0;
        this.interestSum = interestSum || 0;
        this.calculationTable = calculationTable || new CalculationTable();
    }
}