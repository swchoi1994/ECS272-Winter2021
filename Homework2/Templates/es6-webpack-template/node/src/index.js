// This is the end of trial!!! 
import testData from "./data/test.json";
import countryData from "./data/country.json";
/* Example of reading in data */
import './css/style.scss';
import './css/styles.css'; /* Example of connecting a style-sheet */
import {drawBarChart} from "./js/barchart"; /* Example of importing one function from a js file for multiple {f(x), f(y), f(z)}*/
import {drawBarChart2} from "./js/barchart2"; 
import {drawScatterplot} from "./js/scatterplot";

let x = 2;
console.log(testData);
console.log(countryData);
drawBarChart(testData["data"], "#bar");
drawBarChart2(countryData["country"], '#bar2');
drawScatterplot(countryData["country"], '#scatter');

/* 
    TODO: all the other logic for implementing your charts + adding in some basic filters 
    (e.g. dropdown menus for seeing different aspects of the data)
*/