/* Application's entry point */


/* IMPORTS: */
/* Stylesheets */
import "./scss/main.scss";

/* HTML files */
import samleTemplate from "./html/sample.template.html";
import questionarie from "./html/questionarie.html";

const appDiv = document.getElementById("app");
if (appDiv) {
    appDiv.innerHTML = "Welcome to Installment Calculator App!";
    /* Example of html template use */
    appDiv.innerHTML += samleTemplate;

    appDiv.innerHTML += questionarie;
}
