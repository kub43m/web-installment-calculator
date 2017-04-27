/* Application's entry point */


/* IMPORTS: */

/* Typescript */
import {InstallmentCalculationFactory} from "./ts/calculation/installment-calculation-factory";
import {CalculationPeriodInputType, CalculationRepaymentFrequency, CalculationRepaymentMode} from "./ts/calculation/calculation-enums";


/* Stylesheets */
import "./scss/main.scss";

/* HTML files */
import appTopLayerTemplate from "./html/app-top-layer.html";
import calculatorInputTemplate from "./html/calculator-input.html";
import questionarie from "./html/questionarie.html";

const APP_CONTAINER_ID = "app-container";
const APP_BODY_ID = "app-body";

const calcInputs = [
    "loanAmount",
    "interestRate",
    "numberOfPeriods",
    "periodsType",
    "frequencyType",
    "repaymentMode"
];

// TODO: write proper init code
window.onload = () => {
    const appContainerElement = document.getElementById(APP_CONTAINER_ID);
    if (appContainerElement) {

        appContainerElement.innerHTML += appTopLayerTemplate;

        const appBodyElement = document.getElementById(APP_BODY_ID);
        if (appBodyElement) {
            appBodyElement.innerHTML += calculatorInputTemplate;
            // appBodyElement.innerHTML += questionarie; // for tests only

            const form = <HTMLFormElement>document.getElementById("calculator-input-form");
            if (form) {
                const calculateButton = document.getElementById("calculator-input-calculate-button");
                if (calculateButton) {
                    calculateButton.onclick = () => {
                        console.log("calculating...");
                        calcInputs.forEach(inputName => {
                            console.log(`${inputName} = ${form[inputName].value}`);
                        });
                        calculate();
                    };
                }
            }
        }
    }
};


// TODO: test calculation code - extract to its own component
function calculate(): void {
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
            loanAmount, interestRate, numberOfPeriods, periodsType, frequencyType, repaymentMode);

            const result = calculation.calculate();
            const installment = result.installmentSum;
            const interest = result.interestSum;

            alert(`installment = ${installment}\ninterest = ${interest}`);
        
        } catch (err) {
            console.log(err);
        }        
    }
}
