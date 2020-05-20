function zoomed() {
    console.log(d3.event);
    // if (d3.event.sourceEvent.deltaY) {
        x.range([0, width].map(d => d3.event.transform.applyX(d)));
        xTime.range([0, width].map(d => d3.event.transform.applyX(d)));
        svg.selectAll(".bar").transition().attr("x", d => x(+d.year)).attr("width", x.bandwidth());
        svg.selectAll(".x-axis").transition().call(xAxisTime);
}