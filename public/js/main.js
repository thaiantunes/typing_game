var startTime = $("#time").text();
var field = $(".field");

$(function(){
	console.log("Page loaded")
	getPhrase();
	startCounters();1
	startStopwatch();
	markers();
	$("#restart-button").click(restartGame);
});

function getTime(time){
	startTime = time
	$("#time").text(time);
}

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
	field.one("focus", function(){
		var leftTime = $("#time").text();
		var stopwatch = setInterval(function(){
			leftTime = leftTime - 1;
			console.log("Left time: " + leftTime);
			$("#time").text(leftTime);
			if(leftTime < 1){
				clearInterval(stopwatch);
				endGame();
			}
		}, 1000);
	});
};

function endGame(){
	field.attr("disabled", true);
	field.toggleClass("field-disabled");
	addScore();
}

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

$("#score-button").click(function(){
	$(".score").stop().slideToggle(600)
});

function addScore(){
	var tableContent = $(".score").find("tbody");
	var wordCount = $("#wordCounter").text();
	var user = "Thai";
	var row = addRow(user, wordCount);
	row.find(".remove-button").click(removeRow);
	tableContent.append(row);
	$(".score").slideDown(500);
	scrollScore();
}

function scrollScore(){
	var scoreOffset = $(".score").offset().top;
	$("body, html").animate({scrollTop: scoreOffset+"px"}, 1000);
}

function addRow(user, wordCount){
	var row = $("<tr>");
	var user = $("<td>").text(user);
	var words = $("<td>").text(wordCount);
	var remove = $("<td>");
	var link = $("<a>").addClass("remove-button").attr("href", "#");
	var icon = $("<i>").addClass("small").addClass("material-icons").text("delete")
	row.append(user);
	row.append(words);
	row.append(remove.append((link.append(icon))));
	return row;
}

function removeRow(){
	event.preventDefault();
	$(this).parent().parent().fadeOut(600);
	setTimeout(function(){
		(this).parent().parent().remove();
	},600);
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

