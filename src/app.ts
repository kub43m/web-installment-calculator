/* Application's entry point */


/* IMPORTS: */
/* Stylesheets */
import "./styles.scss";

/* HTML files */
import samleTemplate from "./html/sample.template.html";

/* Vendor code */
import * as $ from "jquery";

/* App code */
import {Shouter} from "./ts/shouter";


const appDiv = document.getElementById("app");
if (appDiv) {
    appDiv.innerHTML = "Welcome to Installment Calculator App!";
    /* Example of html template use */
    appDiv.innerHTML += samleTemplate;
}

/* Using typescript class */
const shouter = new Shouter();
console.log(shouter.shout("hello world!"));


/* Using third-party .js code with typings - jQuery */
$(document).ready(() => {
    $("#app").css("font-style", "italic");
});

