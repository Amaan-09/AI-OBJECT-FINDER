video = "";
status = "";
function preload()
{
    video = createCapture(VIDEO);
    video.hide();
}

function setup()
{
    canvas = createCanvas(300,250);
    canvas.center();
}

function start()
{
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects"

}

function modelLoaded()
{
console.log("Model Loaded!");
status = true;
}

function draw()
{
    image(video, 0, 0, 300, 250);
}