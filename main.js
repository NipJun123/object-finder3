status=""
objects=[]

function setup()
{
    canvas = createCanvas(500,400)
    canvas.center()
    cam = createCapture(VIDEO)
    cam.hide()
}



function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("statusresult").innerHTML = "Detecting Objects: "

    objectname = document.getElementById("wordinput").value;

}

function modelLoaded()
{
    console.log("Model Loaded!!!!!!")
    status = true;
}

function gotResults(error,results)
{
    if(error)
    {
        console.log(error)
    }
    else
    {
        console.log(results)
        objects = results
    }
}

function draw()
{
    image(cam, 0, 0, 500, 400)

    if( status!= "")
    {
        objectDetector.detect(video, gotResults)
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("statusresult").innerHTML = "Objects Detected"
            document.getElementById("objectresult").innerHTML = objects.length

            fill('#FF0000')
            percent = floor(objects[i].confidence *100)
            text(objects[i].label + " " + percent + "%", objects[i].x+15,objects[i].y+15)
            noFill()
            stroke('#FF0000')
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
            if(objects[i].label==objectname)
            {
                cam.stop()
                objectDetector.detect(gotResults)
                document.getElementById("statusresult").innerHTML = objectname+" Found"
                synth = window.speechSynthesis;
                tts = new SpeechSynthesisUtterance(objectname+" Found")
                synth.speak(tts)
            }
            else
            {
                document.getElementById("statusresult").innerHTML = objectname+" Not Found"
            }
    }    }
}