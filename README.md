# JosephusSimulator
[live-site](https://josephus-sim.herokuapp.com/)
![main-page](josephus-main.png)

## Description

Josephus Sim is an algorithm visualizer for the famous [Josephus Problem](https://en.wikipedia.org/wiki/Josephus_problem). It provides background information, a visualizer that allows users to plug and play with different values, and an interactive chart plotting different values of k and n. Both the chart and simulator are built using D3.js.

## Technologies
* D3.js
* Vanilla Javascript
* JQuery and JQuery UI
* HTML
* CSS
* Heroku

## Some Features

### Simulator
![simulator](simulator.gif)
Indices that get eliminated are produced using this solution:
```
function josephusSim(n,k) {
	let arr = [],
		eliminated = [];
	for (let i = 0; i < n; i++) {
		arr.push(i+1);
	}
	while (arr.length > 1) {
		let index = arr.indexOf(arr[(k-1)%(arr.length)]);
		eliminated.push(...arr.splice((k-1)%(arr.length), 1))
		for (let j = 0; j < index; j++) {
			arr.push(arr.shift());
		}
	}
	return eliminated;
}
```
Based on the slider values and some simple trig we generate the positions of the points on the large circle:
```
function pointsOnCircle(num){
    var angle = (2 * Math.PI)/num;
    var points = [];
    var i=0;
    for(var a = 0; a<(2*Math.PI); a+=angle){
        if (points.length === num) {
            break;
        }
        i++;
        points.push({
            x:Math.cos(a),
            y:Math.sin(a),
            rotation:a,
            label:'point' + i
        })
    }
    return points;
}
```
D3 then appends the circle SVG's an equal distance around the our circle:
```
function generateCircle(num) {
    let points = d3.selectAll('.point');
    let rects = d3.selectAll('.rect');
    let chords = d3.selectAll('.chord');
    chords.remove();
    points.remove();
    rects.remove();
    let circles = pointsOnCircle(num);
    // svgDoc.data(circles).enter()
    // mainCircle.call(pointCircle);
    circleGroup.append('circle')
            .attr('r', size/2)
            .attr('cx', size/2)
            .attr('cy', size/2)
            .attr('fill', 'none')
            .attr('stroke', 'black')
    circles.forEach((circle, i) => {
        circleGroup.append('circle')
            .attr('r', 5)
            .attr('cx', scale1(circle.x))
            .attr('cy', scale1(circle.y))
            .classed(`point`, true)
            .classed(`idx${i+1}`, true)
    })
    circleGroup.append('circle')
        .attr('r', size/1.75)
        .attr('cx', size/2)
        .attr('cy', size/2)
        .attr('fill', 'none')
        .attr('stroke', 'white')
    circles.forEach((circle, i) => {
        circleGroup.append('text')
            // .attr('r', 5)
            .attr('x', scale2(circle.x))
            .attr('y', scale2(circle.y))
            // .attr('fill', 'red')
            .classed('rect', true)
            .text(`${i+1}`)
    })
}
```
