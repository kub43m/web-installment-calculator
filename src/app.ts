/* Application's entry point */


/* IMPORTS: */
/* Stylesheets */
import "./styles.scss";

/* HTML files */
import samleTemplate from "./html/sample.template.html";

/* Vendor code */
// import * as $ from "jquery";

const appDiv = document.getElementById("app");
if (appDiv) {
    appDiv.innerHTML = "Welcome to Installment Calculator App!";
    /* Example of html template use */
    appDiv.innerHTML += samleTemplate;
}

/* Using third-party .js code with typings - jQuery */
// $(document).ready(() => {
//     $("#app").css("font-style", "italic");
// });

