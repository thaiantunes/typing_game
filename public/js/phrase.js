$("#phrase-button").click(randomPhrase);
$("#choose-button").click(choosePhrase);

function randomPhrase(){
    $("#spinner").toggle();

    $.get("http://localhost:3000/frases", changePhrase)
    .fail(function(){
        $("#error").toggle();
        setTimeout(function(){
            $("#error").toggle();
        }, 2000);
    })
    .always(function() {
        $("#spinner").toggle();
    });
};

function changePhrase(data) {
    var phrase = $(".phrase");
    var getId = Math.floor(Math.random() * data.length);
    phrase.text(data[getId].texto);
    getPhrase();
    getTime(data[getId].tempo);
};

function choosePhrase() {
    $("#spinner").toggle();
    var phraseID = $("#phrase-id").val();
    var dados = {id: phraseID}
    $.get("http://localhost:3000/frases",dados,changeChoosePhrase)
    .fail(function(){
        $("#error").toggle();
        setTimeout(function(){
            $("#error").toggle();
        }, 2000);
    })
    .always(function() {
        $("#spinner").toggle();
    });
}

function changeChoosePhrase(data) {
    var phrase = $(".phrase");
    phrase.text(data.texto);
    getPhrase();
    getTime(data.tempo);
}