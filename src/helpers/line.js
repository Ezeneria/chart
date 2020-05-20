
import * as d3 from 'd3';

export function createLine(x, y, svg, data, keys, config = {}, ) {
    console.log('line.js', data);
    
    const path = d3.line()
        .x(d => x(d[keys[0]]))
        .y(d => y(d[keys[1]]))
    const line = svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', path);
    
    return line;
}