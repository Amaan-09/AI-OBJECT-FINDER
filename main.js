object = "";
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
object_name = document.getElementById("objects").value;
}

function modelLoaded()
{
console.log("Model Loaded!");
status = true;
}

function draw()
{
    image(video, 0, 0, 300, 250);

    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
            if(objects[i].label == object_name){
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = "Object Found: Yes!!";
                document.getElementById("status").innerHTML = "Status: Objects Detected";
                 synth = window.speechSynthesis;
                 utterThis = new SpeechSynthesisUtterance(object_name + " is found! Yay!!!");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_status").innerHTML = "Object Found: No!!!";
                document.getElementById("status").innerHTML = "Status: Objects Detected";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + " not found!! So sad!");
                synth.speak(utterThis);
            }
        }
    }
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    object = results;
}