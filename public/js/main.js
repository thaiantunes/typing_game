var startTime = $("#time").text();
var field = $(".field");

$(function(){
	console.log("Page loaded")
	getPhrase();
	startCounters();
	startStopwatch();
	markers();
	$("#restart-button").click(restartGame);
});

function getPhrase() {
	var words = $(".phrase").text().split(" ").length;
	var phraseLen = $("#phraseLen");
	phraseLen.text(words);
};

function startCounters(){
	field.on("input", function(){
		$("#wordCounter").text(field.val().split(/\S+/).length -1);
		$("#charCounter").text(field.val().length);
	});
};

function startStopwatch(){
	var leftTime = $("#time").text();
	field.one("focus", function(){
		var stopwatch = setInterval(function(){
			leftTime = leftTime - 1;
			console.log("Left time: " + leftTime);
			$("#time").text(leftTime);
			if(leftTime < 1){
				field.attr("disabled", true);
				clearInterval(stopwatch);
				field.toggleClass("field-disabled");
			}
		}, 1000);
	});
};

function markers(){
	var phrase = $(".phrase").text();
	field.on("input", function(){
		var inputText = field.val();
		var comparable = phrase.substr(0, inputText.length);
		if(inputText == comparable){
			field.addClass("green-border");
			field.removeClass("red-border");
		} else {
			field.addClass("red-border");
			field.removeClass("green-border");
		}
	});
}

function restartGame(){
	field.attr("disabled", false);
	field.val("");
	$("#wordCounter").text("0");
	$("#charCounter").text("0");
	$("#time").text(startTime);
	field.toggleClass("field-disabled");
	field.removeClass("red-border");
	field.removeClass("green-border");
	console.log("Game restarted");
	startStopwatch();
}

