import {Initializable} from "./initializable";
import {APP_BODY_ID} from "./app-top-layer-component";

import {InstallmentCalculationFactory} from "../calculation/installment-calculation-factory";
import {CalculationPeriodInputType, CalculationRepaymentFrequency, CalculationRepaymentMode} from "../calculation/calculation-enums";

import calculatorInputTemplate from "../../html/calculator-input.html";
import questionarie from "../../html/questionarie.html";


export class CalculatorInputComponent implements Initializable {
    private static CALC_INPUTS = [
        "loanAmount",
        "interestRate",
        "numberOfPeriods",
        "periodsType",
        "frequencyType",
        "repaymentMode"
    ];

    public initialize(): void {
        this.initializeTemplate();
        this.addCalculateButtonListener();
    }

    private initializeTemplate(): void {
        const appBodyElement = document.getElementById(APP_BODY_ID);
        if (appBodyElement) {
            appBodyElement.innerHTML += calculatorInputTemplate;
            // appBodyElement.innerHTML += questionarie; // for tests only
        }
    }

    private addCalculateButtonListener(): void {
        const form = <HTMLFormElement>document.getElementById("calculator-input-form");
        if (form) {
            const calculateButton = document.getElementById("calculator-input-calculate-button");
            if (calculateButton) {
                calculateButton.onclick = () => {
                    console.log("calculating...");
                    CalculatorInputComponent.CALC_INPUTS.forEach(inputName => {
                        console.log(`${inputName} = ${form[inputName].value}`);
                    });
                    this.calculate();
                };
            }
        }
    }

    private calculate(): void {
        const form = <HTMLFormElement>document.getElementById("calculator-input-form");
        if (form) {
            const loanAmount = parseInt(form["loanAmount"].value, 10);
            const interestRate = parseFloat(form["interestRate"].value);
            const numberOfPeriods = parseInt(form["numberOfPeriods"].value, 10);

            const periodsTypeString = form["periodsType"].value;
            const frequencyTypeString = form["frequencyType"].value;
            const repaymentModeString = form["repaymentMode"].value;

            const periodsType: CalculationPeriodInputType = <any>CalculationPeriodInputType[periodsTypeString];
            const frequencyType: CalculationRepaymentFrequency = <any>CalculationRepaymentFrequency[frequencyTypeString];
            const repaymentMode: CalculationRepaymentMode = <any>CalculationRepaymentMode[repaymentModeString];

            try {
                const calculation = InstallmentCalculationFactory.getInstallmentCalculation(
                    loanAmount, interestRate, numberOfPeriods, periodsType, frequencyType, repaymentMode
                );

                const result = calculation.calculate();
                const installment = result.installmentSum;
                const interest = result.interestSum;

                alert(`installment = ${installment}\ninterest = ${interest}`);

            } catch (err) {
                console.log(err);
            }
        }
    }

}
