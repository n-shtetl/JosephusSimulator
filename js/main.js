// /*
// *    main.js
// *    Mastering Data Visualization with D3.js
// *    Project 2 - Gapminder Clone
// */
// var continents = {asia: 'red', americas: 'blue', africa: 'green', europe: 'yellow'}

// var margin = { left:80, right:20, top:50, bottom:100 };

// var width = 600 - margin.left - margin.right,
// 	height = 400 - margin.top - margin.bottom;

// var flag = true;

// var g = d3.select("#chart-area")
//     .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//     .append("g")
// 		.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


// var tip = d3.tip().attr('class', 'd3-tip')
// 	.html(function(d) {
// 		var text = "<strong>Country:&nbsp</strong <span style='color:red'>" + d.country + "</span><br>";
// 		text += "<strong>Continent:&nbsp</strong <span style='color:red;text-transform:capitalize'>" + d.continent + "</span><br>";
// 		text += "<strong>Life Expectancy:&nbsp</strong <span style='color:red'>" + d.life_exp + "</span><br>";
// 		text += "<strong>GDP per Capita:&nbsp</strong <span style='color:red'>" + d.income + "</span><br>";
// 		text += "<strong>Population:&nbsp</strong <span style='color:red'>" + d.population + "</span><br>";
// 		return text;
// 	});

// g.call(tip);

// var xAxisGroup = g.append("g")
// .attr("class", "x axis")
// .attr("transform", "translate(0," + height +")");

// var yAxisGroup = g.append("g")
// 	.attr("class", "y axis");

// // X label
// g.append("text")
// 	.attr("y", height + 50)
// 	.attr("x", width / 2)
// 	.attr("font-size", "20px")
// 	.attr("text-anchor", "middle")
// 	.text("GDP Per Capita");

// // Y label
// g.append("text")
//     .attr("y", -60)
//     .attr("x", -(height / 2))
//     .attr("font-size", "20px")
//     .attr("text-anchor", "middle")
//     .attr("transform", "rotate(-90)")
// 	.text("Life Expectancy");
	
// // Date label
// var dateLabel = g.append("text")
// 	.attr("y", height-3)
// 	.attr("x", width-40)
// 	.attr("font-size", "34px")
// 	.attr('text-anchor', 'middle')
// 	.text("1800")
// 	.style('opacity', '0.4')
	

// var x = d3.scaleLog()
// 	.base(10)
// 	.range([0, width])


// var y = d3.scaleLinear()
// 	.range([height, 0])

// var area = d3.scaleLinear()
// .range([25*Math.PI, 1500*Math.PI])
// .domain([2000, 1400000000]);

// let year = 1800;

// var continentColor = d3.scaleOrdinal(d3.schemePastel1);
// d3.json("data/data.json").then(function(data) {
// 	// Clean the data
// 	data.forEach(function(d) {
// 		d.year = +d.year
// 	})
// 	// Set initial state of visualization
// 	newData = data;
// 	// setInterval(function(){
// 	// 	let newData = data[year-1800]
//     //     update(newData)
// 	// 	year += 1;
// 	// 	if (year === 2015) {
// 	// 		year = 1800
// 	// 	}
// 	// }, 3000);
// 	update(newData[year-1800])
// })

// $("#play-button")
// 	.on("click", function() {
// 		let button = $(this);
// 		if (button.text() === "Play") {
// 			button.text("Pause");
// 			interval = setInterval(function() {
// 				year += 1;
// 				if (year === 2015) {
// 					year = 1800;
// 				}
// 				update(newData[year-1800])
// 			}, 100)
// 		} else {
// 			button.text("Play");
// 			clearInterval(interval)
// 		}
// 	})

// $("#reset")
// 	.on("click", function() {
// 		year = 1800;
// 		update(newData[year-1800])
// 	})

// $("#date-slider").slider({
// 	max: 2014,
// 	min: 1800,
// 	step: 1,
// 	slide: function(event, ui) {
// 		year = ui.value;
// 		update(newData[year-1800])
// 	}
// })
// function update(newData) {

// 	// Clean data again

// 	let nonNullData = newData.countries.filter(country => country.income !== null && country.life_exp !== null)
// 	newData.countries = nonNullData;
// 	const dropdown = $("#continent-select");
// 	if (dropdown.val() !== "All") {
// 		let continent = dropdown.val();
// 		let countries = newData.countries.filter(country => country.continent === dropdown.val())
// 		newData.countries = countries;
// 	}
	

// 	x.domain([142, 150000])
// 	y.domain([0, 90])
// 	var xAxisCall = d3.axisBottom(x)
// 		// .ticks(3)
// 		// .tickFormat(function(d) { 
// 		// 	return String(Number(d))
// 		// })
// 		.tickValues([400, 4000, 40000])
//     	.tickFormat(d3.format("$"));
// 	xAxisGroup.call(xAxisCall);
	
// 	var yAxisCall = d3.axisLeft(y)
// 	yAxisGroup.call(yAxisCall);

// 	var continents = ["europe", "asia", "americas", "africa"];

// 	var legend = g.append("g")
// 		.attr("transform", "translate(" + (width-20) + "," + (height-110) + ")");

// 	continents.forEach(function(continent, i) {
// 		var legendRow = legend.append("g")
// 			.attr("transform", "translate(0," + i*20 + ")")

// 		legendRow.append('rect')
// 			.attr("width", 10)
// 			.attr("height", 10)
// 			.attr('fill', continentColor(continent));
		
// 		legendRow.append('text')
// 			.attr('x', -10)
// 			.attr('y', 10)
// 			.attr('text-anchor', 'end')
// 			.style('text-transform', 'capitalize')
// 			.style('opacity', '0.4')
// 			.text(continent)
// 	})

// 	var circles = g.selectAll('circle')
// 		.data(newData.countries, function(d) {
// 			return d.population
// 		})

// 	circles.exit().remove()
// 	circles.enter()
// 		.append('circle')
// 		.attr('fill', function(d) { return continentColor(d.continent) })
// 		.attr('cy', function(d) { return y(d.life_exp) })
// 		.attr('r', function(d) { 
// 			if (d.life_exp === null || d.income === null) {
// 				return 0
// 			}
// 			else { 
// 				return Math.sqrt(area(d.population) / Math.PI)
// 			}
// 		})
// 		.attr('cx', function(d) { return x(d.income) })
// 		.on("mouseover", tip.show)
// 		.on("mouseout", tip.hide)
// 		.merge(circles)

// 		dateLabel.text(newData.year)
// }

// function josephus(n,k) {
// 	let arr = [],
// 		eliminated = [];
// 	for (let i = 0; i < n; i++) {
// 		arr.push(i+1);
// 	}
// 	while (arr.length > 1) {
// 		let index = arr.indexOf(arr[(k-1)%(arr.length)]);
// 		eliminated.push(...arr.splice((k-1)%(arr.length), 1))
// 		for (let j = 0; j < index; j++) {
// 			arr.push(arr.shift());
// 		}
// 	}
// 	return eliminated.concat(arr);
// }

// console.log(josephus(6,3));
// // 5 4 6 2 3 1


var margin = { left:80, right:20, top:50, bottom:100 };

var width = 700 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

var flag = true;

var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
		.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var xAxisGroup = g.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height +")");

var yAxisGroup = g.append("g")
	.attr("class", "y axis");

// X label
g.append("text")
	.attr("y", height + 50)
	.attr("x", width / 2)
	.attr("font-size", "20px")
	.attr("text-anchor", "middle")
	.text("Number of people");

// Y label
g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
	.text("Survivor Index");

// K label
var kLabel = g.append("text")
	.attr("y", 0)
	.attr("x", width-40)
	.attr("font-size", "34px")
	.attr('text-anchor', 'middle')
	.text("K = 2")
	.style('opacity', '0.4')

var x = d3.scaleLinear()
	.range([0, width])

var y = d3.scaleLinear()
	.range([height, 0])

let k = 2;

// $("#date-slider").slider({
// 	max: 100,
// 	min: 1,
// 	step: 1,
// 	slide: function(event, ui) {
// 		k = ui.value;
// 		update(newData[year-1800])
// 	}
// })

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

function render() {
	
	// Generate data
	data = [{ 'values': [] }]
	for (let i = 0; i < 128; i++) {
		data[0]['values'].push({ 'n': i+1, 'jn': josephus(i+1, k), 'k': k })
	}
	// Set domains
	x.domain([0, 128])
	y.domain([0, 128])

	var xAxisCall = d3.axisBottom(x)
	xAxisGroup.call(xAxisCall);
	
	var yAxisCall = d3.axisLeft(y)
	yAxisGroup.call(yAxisCall);
	var circles = g.selectAll('circle')
		.data(data[0]['values'], function(d) {
			return d;
		})

	circles.exit().remove()
	circles.enter()
		.append('circle')
		.attr('fill', 'black')
		.attr('cy', function(d) { return y(d['jn']) })
		.attr('r', 5)
		.attr('cx', function(d) { return x(d['n']) })
		// .on("mouseover", tip.show)
		// .on("mouseout", tip.hide)
		.merge(circles)

	kLabel.text("K = " + k)
}

$("#date-slider").slider({
	max: 128,
	min: 2,
	step: 1,
	value: 2,
	slide: function(event, ui) {
		k = ui.value;
		render();
	}
})

$("#play-button")
	.on("click", function() {
		let button = $(this);
		if (button.text() === "Play") {
			button.text("Pause");
			interval = setInterval(function() {
				k += 1;
				$("#date-slider").slider("value", k);
				if (k === 32) {
					k = 2;
				}
				render();
			}, 100)
		} else {
			button.text("Play");
			clearInterval(interval)
		}
	})

$("#reset")
	.on("click", function() {
		k = 2;
		render();
	})

$("#date-slider").slider({
	max: 128,
	min: 2,
	step: 1,
	value: 2,
	slide: function(event, ui) {
		k = ui.value;
		render();
	}
})

let dot1 = $('#dot1')
let dot2 = $('#dot2')
let dot3 = $('#dot3')
let dot4 = $('#dot4')

let titleBox = $(".title")
let backgroundText = $(".background-text");
let simulationBox = $(".simulation");
let chartBox = $(".chart");

dot1.on("click", function() {
	dot1.css("color", "red")
	for (let i = 1; i < 5; i++) {
		if (i === 1) {
			continue;
		} else {
			$(`#dot${i}`).css("color", "black");
		} 
	}
	if (titleBox.hasClass("hidden")) {
		titleBox.removeClass("hidden");
		simulationBox.addClass("hidden");
		chartBox.addClass("hidden");
		backgroundText.addClass("hidden");
	}
});

dot2.on("click", function() {
	dot2.css("color", "red")
	for (let i = 1; i < 5; i++) {
		if (i === 2) {
			continue;
		} else {
			$(`#dot${i}`).css("color", "black");
		} 
	}
	if (backgroundText.hasClass("hidden")) {
		backgroundText.removeClass("hidden");
		simulationBox.addClass("hidden");
		chartBox.addClass("hidden");
		titleBox.addClass("hidden");
	}
});

dot3.on("click", function() {
	dot3.css("color", "red");
	for (let i = 1; i < 5; i++) {
		if (i === 3) {
			continue;
		} else {
			$(`#dot${i}`).css("color", "black");
		} 
	}
	if (simulationBox.hasClass("hidden")) {
		simulationBox.removeClass("hidden");
		backgroundText.addClass("hidden");
		chartBox.addClass("hidden");
		titleBox.addClass("hidden");
	}
});

dot4.on("click", function() {
	dot4.css("color", "red");
	for (let i = 1; i < 5; i++) {
		if (i === 4) {
			continue;
		} else {
			$(`#dot${i}`).css("color", "black");
		} 
	}
	if (chartBox.hasClass("hidden")) {
		chartBox.removeClass("hidden");
		backgroundText.addClass("hidden");
		simulationBox.addClass("hidden");
		titleBox.addClass("hidden");
	}
});



render();

