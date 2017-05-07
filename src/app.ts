/* Application's entry point */


/* IMPORTS: */

/* Typescript */
import {AppTopLayerComponent} from "./ts/gui/app-top-layer-component";
import {CalculatorInputComponent} from "./ts/gui/calculator-input-component";
import {Initializable} from "./ts/gui/initializable";

/* Stylesheets */
import "./scss/main.scss";

export const APP_CONTAINER_ID = "app-container";

window.onload = () => {
    initializeApp();
};

function initializeApp(): void {
    const initializables: Initializable[] = [];

    initializables.push(new AppTopLayerComponent());
    initializables.push(new CalculatorInputComponent());

    initializables.forEach(initializable => initializable.initialize());
}
