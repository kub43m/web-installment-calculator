import {CalculationResult} from "./calculation-result";

export interface InstallmentCalculation {
    calculate(): CalculationResult;
}