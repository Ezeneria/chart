import * as d3 from 'd3';
// import { scaleLinear, scaleTime, scaleBand } from 'd3-scale';

export function createAxеs(arg = {}) {    
    let config = {
        // margin: { top: 10, right: 30, bottom: 30, left: 60},
        nice: false,
        range: {
            x: [0, 300],
            y: [300, 0]
        },
        tickSize: {
            x: 10,
            y: 20,
        },
        xAxis: { 
            scale: 'scaleBand',
            position: 'axisBottom',
            domain: [0,10],
        },
        xAxisTime: null,
        yAxis: {
            scale: 'scaleLinear',
            position: 'axisLeft',
            domain: [10, 0],
        },
    };
    config = { ...config, ...arg };

    let xAxisTime = null;
    let xTime = null;
    const xAxisCfg = config.xAxis;
    console.log('xAxisCfg', xAxisCfg);
    
    const yAxisCfg = config.yAxis;
    const xAxisTimeCfg = config.xAxisTime ? config.xAxisTime : null;
    const x = d3[xAxisCfg.scale]().domain(xAxisCfg.domain).range(config.range.x);
    const y = d3[yAxisCfg.scale]().domain(yAxisCfg.domain).range(config.range.y);
    const xAxis = d3[xAxisCfg.position]().scale(x);
    const yAxis = d3[yAxisCfg.position]().scale(y);
    
    if (xAxisTimeCfg) {
        xTime = d3[xAxisTimeCfg.scale]().domain(xAxisTimeCfg.domain).range(config.range);
        if (xAxisTimeCfg.position) {
            xAxisTime = d3[xAxisTimeCfg.position]().scale(xTime)
        }
    }
    if (xAxisTimeCfg) {
        return { x, y, xTime, xAxisTime, xAxis, yAxis }
    } else {
        return { x,y,xAxis,yAxis }
    }
}
// createAxеs.margin = {top: 20, right: 0, bottom: 30, left: 40};

export function updateScale() {

}
