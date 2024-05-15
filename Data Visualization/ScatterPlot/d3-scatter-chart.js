function drawScatterChart(dataset){
    const margin = { top: 50, right: 20, bottom: 30, left: 80 };
    const width = 920 - margin.left - margin.right;
    const height = 630 - margin.top - margin.bottom;

    //coordinates = dataset.map(d => {return [d["Time"], d["Year"]]});
    //info = dataset.map(d => {return [d["Name"], d["Nationality"], d["Doping"]]});

    const svg = d3.select("#scatter-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear().domain([d3.min(dataset, d => d.Year - 1), d3.max(dataset, d => d.Year + 1)]).range([0, width]);
    const yScale = d3.scaleTime().domain([d3.min(dataset, d => d.Seconds), d3.max(dataset, d => d.Seconds)]).range([height, 0]);;

    var xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
    var yAxis = d3.axisLeft(yScale).tickFormat(d =>`${Math.floor(d / 60)}:${(d % 60).toString().padStart(2, '0')}`);

    
    // Create x-axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis)
        .attr('id', 'x-axis')
        .selectAll("text")
        .style("font-size", "14px")
        .attr("text-anchor", "middle");

    // Create y-axis
    svg.append('g')
        .call(yAxis)
        .style("font-size", "14px")
        .attr('id', 'y-axis');

    // Add label for the y-axis
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -60)
        .style('text-anchor', 'middle')
        .text('Time (MM:SS)');
    
    const div = d3
        .select('body')
        .append('div')
        .attr('id', 'tooltip')
    
    const tooltip = d3.select("#tooltip");

    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => xScale(d.Year))
        .attr("cy", (d, i) => height - yScale(d.Seconds))
        .attr("r", 8)
        .style("fill", d => d.Doping === "" ? "orange" : "blue")
        .on('mouseover', (event, d) => {
            tooltip.transition()
                .duration(200)
                .style("opacity", 0.95);
            tooltip.html(`${d.Name}: ${d.Nationality}<br>Year: ${d.Year}, Time: ${d.Time}<br>${d.Doping ? d.Doping : ""}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on('mouseout', () => {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    

    
}