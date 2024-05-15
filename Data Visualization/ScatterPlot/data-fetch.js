const URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"; // static JSON file

document.addEventListener('DOMContentLoaded', function(){
    fetch(URL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        drawScatterChart(data); // Calls the function defined in d3-scatter-chart.js
    })
    .catch(error => {
        console.error("Error fetching the data:", error);
    });
});