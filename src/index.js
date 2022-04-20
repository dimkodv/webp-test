import {CardModule} from "./cardModule";
import "./style.scss";

document.addEventListener('DOMContentLoaded', function(){
    const grid = new CardModule();
    grid.init();
});