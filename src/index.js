import * as d3 from 'd3';


import { createAxеs } from './helpers/axis';
import { createLine } from './helpers/line';

const margin = { top: 10, right: 30, bottom: 30, left: 100 };
const width = 900 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

// const resolveData = async () => {
//     return await (await fetch('assets/prison_scenes.json')).json();
// };

d3.json('assets/prison_scenes.json').then(data => {

    console.log('data', data);
    console.log('asdasdas');
    const chart = new createChart(data);

})
function createChart(data) {
    this.data = data;
    console.log(this.data);
    
    this.axes = createAxеs({
        range: {
            x: [0, width],
            y: [0, height]
        },
        xAxis: {
            scale: 'scaleBand',
            position: 'axisBottom',
            domain: this.data.map(d => +d.year),
        },
        yAxis: {
            scale: 'scaleLinear',
            position: 'axisLeft',
            domain: [d3.max(this.data, d => d.total), 0],
        },
    });
    
    this.svg = d3.select('body').append('svg').attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",`translate(${margin.left},${margin.top})`);

    this.svg.append('g').classed('xAxis', true).attr('transform', `translate(0, ${height})`).call(this.axes.xAxis)
    this.svg.append('g').classed('yAxis', true).call(this.axes.yAxis);

    this.line = createLine(
        this.axes.x,
        this.axes.y,
        this.svg,
        this.data,
        ['year','total']
    );
}

// createChart.prototype.updateLine = function() {
//     return this;
// }
// createChart.prototype.updateBars = function() {
//     console.log(this);
    
//     return this;
// }
// createChart.prototype.updateScale = function() {
//     return this
// }

// const chart = new createChart();
// chart.updateBars()


// import prisonButtonChart from './buttonChart';
// import draggablePrisonChart from './draggablePrisonChart';
// import brushableChart from './brushableChart';

// import * as d3 from 'd3';
// import { csvParse } from 'd3-dsv';

// const resolveData = async () => {
//     return csvParse(await (await fetch('assets/uk_prison_data_1900-2015.csv')).text());
// };
// var margin = { top: 20, right: 20, bottom: 30, left: 40 },
//     width = 1000 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;

// (async (enable) => {
//     if (!enable) return;
//     const svg = d3.select("body").append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform",
//             "translate(" + margin.left + "," + margin.top + ")");
//     // .call(zoom);
//     // set the ranges
//     var x = d3.scaleBand()
//         .range([0, width])
//         .padding(0.1);
//     const xTime = d3.scaleTime().domain([Date.now(), Date.now() + (24 * 60 * 60 * 1000) * 2]).range([0, width]);
//     const y = d3.scaleLinear()
//         .range([height, 0]);
//     const xAxisTime = d3.axisBottom().scale(xTime);
//     const xAxis = d3.axisBottom().scale(x);

//     // get the data
//     const data = await resolveData();
//     console.log(data);

//     // format the data

//     // Scale the range of the data in the domains
//     x.domain(data.map(function (d) { return +d.year; }));
//     y.domain([0, d3.max(data, function (d) { return +d.total; })]);
//     svg.append("g")
//         .call(d3.axisLeft().scale(y));
//     svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .classed('x-axis', true)
//         .call(xAxisTime);
//     // append the rectangles for the bar chart
//     svg.append("g")
//         .attr("class", "grid")
//         .attr("transform", "translate(0," + height + ")")
//         .call(make_x_gridlines()
//             .tickSize(-height)
//             .tickFormat("")
//         )
//     svg.append('g').classed('bars', true)
//         .attr('transform', 'translate(0,0)')    
//         .selectAll(".bar")
//         .data(data)
//         .enter()
//         .append("rect")
//         .attr("class", "bar")
//         .attr("x", function (d) { return x(+d.year); })
//         .attr("width", x.bandwidth())
//         .attr('y', d => height)
//         .attr("height", 0)
//         .transition(500)
//         .attr("y", function (d) { return y(+d.total); })
//         .attr("height", function (d) { return height - y(+d.total); });


//     function make_x_gridlines() {
//         return d3.axisBottom(x)
//             .ticks((data.length / 2))
//     }



//     function make_y_gridlines() {
//         return d3.axisLeft(y)
//         // .ticks(5)
//     }

//     const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];;

//     svg.call(d3.zoom()
//         .scaleExtent([1, 8])
//         .translateExtent(extent)
//         .extent(extent)
//         .on("zoom", zoomed))
//         .on("mousemove.zoom",() => {
//             console.log('zoomed');

//         })

//     function zoomed() {
//         console.log(d3.event);
//         // if (d3.event.sourceEvent.deltaY) {
//             x.range([0, width].map(d => d3.event.transform.applyX(d)));
//             xTime.range([0, width].map(d => d3.event.transform.applyX(d)));
//             svg.selectAll(".bar").transition().attr("x", d => x(+d.year)).attr("width", x.bandwidth());
//             svg.selectAll(".x-axis").transition().call(xAxisTime);
//         // }
//         //  else {
//         //     x.range([0, width].map(d => d3.event.transform.applyX(d)));
//         //     xTime.range([0, width].map(d => d3.event.transform.applyX(d)));
//         //     svg.selectAll(".bar").attr("transform", d => `translate(${x(+d.year)}, 0)`);
//         //     // svg.selectAll(".bar2").attr("x", d => x(+d.year)).attr("width", x.bandwidth());
//         //     // svg.selectAll(".bar3").attr("x", d => x(+d.year)).attr("width", x.bandwidth());
//         //     svg.selectAll(".x-axis").call(xAxisTime);
//         // }
//     }
// })(true);