import {Initializable} from "./initializable";
import {APP_CONTAINER_ID} from "../../app";
import appTopLayerTemplate from "../../html/app-top-layer.html";

export const APP_BODY_ID = "app-body";

export class AppTopLayerComponent implements Initializable {

    public initialize(): void {
        const appContainerElement = document.getElementById(APP_CONTAINER_ID);
        if (appContainerElement) {
            appContainerElement.innerHTML += appTopLayerTemplate;
        }
    }
}