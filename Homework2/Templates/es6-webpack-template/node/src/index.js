
import testData from "./data/test.json";
//import filmData from "./datasets/sf_movies.csv"; /* Example of reading in data */
import './css/style.scss';
import './css/styles.css'; /* Example of connecting a style-sheet */
import {drawBarChart} from "./js/barchart"; /* Example of importing one function from a js file for multiple {f(x), f(y), f(z)}*/
import {drawMap} from "./js/map";

let x = 2;
console.log(testData);
drawBarChart(testData["data"], "#bar");
drawMap(testData["data"],"#map");


/* 
    TODO: all the other logic for implementing your charts + adding in some basic filters 
    (e.g. dropdown menus for seeing different aspects of the data)
*/