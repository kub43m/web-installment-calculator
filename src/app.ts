/* Application's entry point */


/* IMPORTS: */
/* Stylesheets */
import "./scss/main.scss";

/* HTML files */
import appTopLayerTemplate from "./html/app-top-layer.html";
import calculatorInputTemplate from "./html/calculator-input.html";
import questionarie from "./html/questionarie.html";

const APP_CONTAINER_ID = "app-container";
const APP_BODY_ID = "app-body";

const appContainerElement = document.getElementById(APP_CONTAINER_ID);
if (appContainerElement) {

    appContainerElement.innerHTML += appTopLayerTemplate;

    const appBodyElement = document.getElementById(APP_BODY_ID);
    if (appBodyElement) {
        appBodyElement.innerHTML += calculatorInputTemplate;
        
        // appBodyElement.innerHTML += questionarie; // for tests only
    }
    
}
