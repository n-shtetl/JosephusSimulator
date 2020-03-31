let nSliderLabel = $('.n-slider-label');
let kSliderLabel = $('.k-slider-label');
let speedSliderLabel = $('.speed-slider-label');
let kSlide = $("#k-slider");
let nSlide = $("#n-slider");
let speedSlide = $("#speed-slider");
let runSim = $("#run-sim");
let drawingSpeed, intervalLength;

var size = 300;
var dotSize = 15;
var margin = 40;
let points = [];

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

function josephus(n,k) {
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
	return arr.pop();
}

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

// let pointCircle = function(g) {
//     g.append('circle')
//         .attr('r', size/2)
//         .attr('cx', size/2)
//         .attr('cy', size/2)
//         .attr('fill', 'none')
//         .attr('stroke', 'black')
    
    
// }

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

let scale1 = d3.scaleLinear()
		.range([0, size])
        .domain([-1, 1]);
let scale2 = d3.scaleLinear()
    .range([-22, size+22])
    .domain([-1,1])

let svgDoc = d3.select('.diagram')
    .append('svg')
    .attr('width', size+margin*2)
    .attr('height', size+margin*2)

let circleGroup = svgDoc.append('g')
    .attr('transform', 'translate(' + margin + ',' + margin + ')')

kSlide.slider({
	max: 50,
	min: 2,
    step: 1,
    value: 2,
	slide: function(event, ui) {
        return kSliderLabel.text("K: " + ui.value);
	}
})

nSlide.slider({
	max: 50,
	min: 1,
    step: 1,
    value: 5,
	slide: function(event, ui) {
        nSliderLabel.text("N: " + ui.value);
        generateCircle(ui.value);
        return kSlide.slider("option", "max", ui.value);
	}
})

speedSlide.slider({
    max:50,
    min: 1,
    step: 1,
    value: 10,
    slide: function(event, ui) {
        drawingSpeed = ui.value * 10;
        intervalLength = drawingSpeed + 100;
        // return speedSliderLabel.text('Speed: ' + (51-ui.value));
        return speedSliderLabel.text('Speed: ' + ui.value)
    }
})

if (!drawingSpeed) {
    drawingSpeed = speedSlide.slider( "option", "value" ) * 10;
}
if (!intervalLength) {
    intervalLength = drawingSpeed + 100;
}


runSim
	.on("click", function() {
        d3.selectAll(`.chord`).remove();
        d3.selectAll(`[fill=red]`).attr('fill', 'black');
        let n = nSlide.slider("option", "value")
        let k = kSlide.slider("option", "value")
        let eliminated = josephusSim(n, k);
        console.log(eliminated);
        let circles = {...pointsOnCircle(n)};
        console.log(circles);
        let i = 0;
        let interval = setInterval(function() {
            if (i === eliminated.length-1) {
                console.log(josephus(n,k))
                let survivor = d3.select(`.idx${josephus(n,k)}`)
                console.log(survivor);
                survivor.attr('fill', 'red');
                clearInterval(interval);
                return;
            }
            let circle1 = circles[eliminated[i]-1]
            let circle2 = circles[eliminated[i+1]-1]
            circleGroup.append('line')
                .attr('x1', scale1(circle1.x))
                .attr('y1', scale1(circle1.y))
                .attr('x2', scale1(circle1.x))
                .attr('y2', scale1(circle1.y))
                .attr('stroke-width', 2)
                .attr('stroke', 'black')
                .classed('chord', true)
                .transition()
                .duration(drawingSpeed)
                .attr('x2', scale1(circle2.x))
                .attr('y2', scale1(circle2.y))
            i++;
            
        }, intervalLength)
	})

generateCircle(5);
