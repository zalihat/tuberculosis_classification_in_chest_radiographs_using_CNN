var el = x => document.getElementById(x);
var btn = document.getElementById("btn");
var proceedBtn = document.getElementById("proceed-btn");
var cancelBtn = document.getElementById("cancel-btn");
var analyzeBtn = document.getElementById("analyze-button")
analyzeBtn.classList.add("no-display")
var options = document.getElementById("proceed-div");
let selectImage = document.getElementById("select-image-container")




function showPicker() {
    el("file-input").click();
}

function showPicked(input) {
    el("upload-label").innerHTML = input.files[0].name;
    var reader = new FileReader();
    reader.onload = function(e) {
        el("image-picked").src = e.target.result;
        el("image-picked").className = "";
        btn.classList.add("no-display");
        proceedBtn.classList.remove("no-display");
        cancelBtn.classList.remove("no-display")
    };
    reader.readAsDataURL(input.files[0]);
}

function analyze() {
    var uploadFiles = el("file-input").files;
    if (uploadFiles.length !== 1) alert("Please select a file to analyze!");

    // el("analyze-button").innerHTML = "Analyzing...";
    let resultLabel = document.getElementById('result-label').classList.remove('no-display')
    let uploadLabel = document.getElementById('upload-label').classList.add('no-display')
    var xhr = new XMLHttpRequest();
    var loc = window.location;
    xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
        true);
    xhr.onerror = function() {
        alert(xhr.responseText);
    };
    xhr.onload = function(e) {
        if (this.readyState === 4) {
            var response = JSON.parse(e.target.responseText);
            el("result-label").innerHTML = `Result = ${response["result"]}`;
        }
        el("analyze-button").innerHTML = "Analyze";
    };

    var fileData = new FormData();
    fileData.append("file", uploadFiles[0]);
    xhr.send(fileData);
}

/*var selectImage=document.getElementById("select-image-container");
var content=document.getElementById("content");
document.getElementById("proceed-To-Analyze-btn").onclick=function(){
       selectImage.classList.remove("no-display") 
       content.classList.add("no-display");

}*/
// document.getElementById("proceed-btn").onclick=function(){
//   analyzeBtn.classList.remove("no-display");
//  proceedBtn.classList.add("no-display");
//  cancelBtn.classList.add("no-display");

// }

$('#proceed-To-Analyze-btn').on('click', function() {
    $("#content").fadeOut(700);
    setTimeout(function() {
        $("#select-image-container").fadeIn(800);
    }, 700);



})
$('#analyze-page').on('click', function() {
    $("#content").fadeOut(700);
    setTimeout(function() {
        $("#select-image-container").fadeIn(800);
    }, 700);



})
$('#home-page').on('click', function() {
    $("#select-image-container").fadeOut(700);
    setTimeout(function() {
        $("#content").fadeIn(800);
        location.reload()
    }, 700);
})

$('#proceed-btn').on('click', function() {
    $("#proceed-div").fadeOut(700);
    setTimeout(function() {
        $("#analyze-button").slideDown(800);
    }, 700);
})

$('#cancel-btn').on('click', function() {
    $("#proceed-div").fadeOut(700);
    setTimeout(function() {
        location.reload()

        document.getElementById('image-picked-div').classList.add("no-display");
    }, 700);
})