import {CalculationTableRow} from "./calculation-table-row";

export class CalculationTable {
    private tableRows: CalculationTableRow[];

    constructor(initialRows?: CalculationTableRow[]) {
        this.tableRows = initialRows || [];
    }

    public getTable(): CalculationTableRow[] {
        return this.tableRows;
    }

    public getRow(rowNumber: number): CalculationTableRow {
        return this.tableRows[rowNumber];
    }

    public addRow(newRow: CalculationTableRow): void {
        this.tableRows.push(newRow);
    }
}