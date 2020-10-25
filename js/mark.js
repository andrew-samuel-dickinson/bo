function questionId(i)
{
    return "Q" + i;
}

function answerId(i)
{
    return "A" + i;
}

function responseId(i)
{
    return "R" + i;
}

function quAndA(i)
{
    return myQaData[i];
}

function numQuestions()
{
    return myQaData.length;
}

function markQuestions()
{
    var numCorrect = 0;
    var numIncorrect = 0;
    var numUnanswered = 0;    
    for(i = 0; i < numQuestions(); ++i)
    {
        let ansElt = document.getElementById(answerId(i))
        let ansGiven = ansElt.valueAsNumber;
        let ansTrue = Number(quAndA(i)["A"]);
        let isCorrect = (ansGiven == ansTrue)
        if(isNaN(ansGiven))
        {
            numUnanswered += 1;            
            ansElt.setAttribute("style", "border: 4px solid gray");
        }
        else if(isCorrect)
        {
            numCorrect += 1;
            ansElt.setAttribute("style", "border: 4px solid green");
        }
        else
        {
            numIncorrect += 1;
            ansElt.setAttribute("style", "border: 4px solid red");
        }
    } 
    let summaryElt = document.getElementById("summaryId");
    let photoElt = document.getElementById("photoLink");
    let uTubeElt = document.getElementById("youtubeLink");

    fractionCorrect = numCorrect/numQuestions();
    comment = ""
    img = ""
    if(fractionCorrect < 0.25)
    {
        comment = "Keep going !!!";
        uTubeElt.src = "";
        photoElt.src = images[0];
    }
    else if(fractionCorrect < 0.5)
    {
        comment = "Good";
        uTubeElt.src = "";
        photoElt.src = images[1];
    }
    else if(fractionCorrect < 0.75)
    {
        comment = "Very good";
        uTubeElt.src = "";
        photoElt.src = images[2];
        
    }
    else if(fractionCorrect < 1.0)
    {
        comment = "Excellent";
        uTubeElt.src = "";
        photoElt.src = images[3];
    }
    else
    {
        comment = final_clue;
        uTubeElt.src = video;
        photoElt.src = default_image;
    }

    summaryElt.innerHTML = comment;
}

function drawQuestions()
{
    for(i = 0; i < numQuestions(); ++i)
    {
        quForm = document.getElementById("questionForm");
        let elt = document.createElement("label");
        elt.id = questionId(i);
        elt.innerHTML = "</br>" + "Q" + (i+1) + ": " + quAndA(i)["Q"] + " ";
        quForm.appendChild(elt);

        let elt2 = document.createElement("input");
        elt2.className = "answer"
        elt2.id = answerId(i);
        elt2.type = "number";
        elt2.setAttribute("onchange", "markQuestions()");
        quForm.appendChild(elt2);
    }
}
