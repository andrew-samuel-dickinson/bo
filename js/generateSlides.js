function generateSlides()
{
    mySlides = document.getElementById("mySlides");
    words = getWords();

    for(var i = 0; i < words.length; ++i)
    {
        let newSection = document.createElement("section");
        slideHTML = getSlideHTML(words[i]);
        slideHTML.then(
            function(value)
            {
                newSection.innerHTML = value;
                mySlides.appendChild(newSection);
            },
            function(error)
            {
                newSection.innerHTML = "";
            }
        )        
    }
}
function getWordsAsLongString()
{
    myString = "weak dude";
    return myString;
}

function getWords()
{
    myString = getWordsAsLongString();
    ret = myString.split(" ");
    return ret;
}

async function getEntryComplete(word) {
  let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
  let x = await fetch(url);
  let y = await x.text();
  let obj = await JSON.parse(y);
  return obj;
}

async function getMinimalEntry(word)
{
    let entryComplete = await getEntryComplete(word);
    let ret = {};
    ret["partOfSpeech"] = entryComplete[0]["meanings"][0]["partOfSpeech"];
    ret["definition"] = entryComplete[0]["meanings"][0]["definitions"][0]["definition"];
    ret["example"] = entryComplete[0]["meanings"][0]["definitions"][0]["example"];
    ret["synonyms"] = entryComplete[0]["meanings"][0]["synonyms"];
    ret["antonyms"] = entryComplete[0]["meanings"][0]["antonyms"];
    ret["audio"] = entryComplete[0]["phonetics"][0]["audio"];
    return ret
}

async function getSlideHTML(word)
{
    let dct = await getMinimalEntry(word);

    styPrefix = "<em>"
    stySuffix = "</em>"

    html = "<section>";
    html += '<h2 class="slideheader">'
    html += word
    html += '</h2>'
    html += "<ul>"
    html += '<li class="fragment bullet2">'
    html += styPrefix + "Meaning: " + stySuffix;
    html += dct["definition"];
    html += "<ul>"
    html += '<li class="bullet2">'
    html += styPrefix + "Type: " + stySuffix;
    html += dct["partOfSpeech"];
    html += '</li>'
    html += '<li class="bullet2">'
    html += styPrefix +"Synonyms: " + stySuffix;
    tempList = dct["synonyms"];
    for(var i = 0; i < tempList.length; ++i)
    {
        html += tempList[i];
        html += ", "
    }
    html += '</li>'
    html += '<li class="bullet2">'
    html += styPrefix + "Antonyms: " + stySuffix;
    tempList = dct["antonyms"];
    for(var i = 0; i < tempList.length; ++i)
    {
        html += tempList[i];
        html += ", "
    }
    html += '</li>'
    html += '<li class="bullet2">'
    html += styPrefix + "Example: " + stySuffix;
    html += dct["example"];
    html += '</li>'
    html += "</ul>"
    html += "</ul>"
    html += "</section>";

    return html;
}

async function getSeveralSlidesHTML(arrayOfWords)
{
    html = "";
    for(var i = 0; i < arrayOfWords.length; i++)
    {
        html += await getSlideHTML(arrayOfWords[i]);
    }
    return html;
}

function myDisplay(value)
{
    console.log(value);
}

words = getWords();

for(i = 0; i < words.length; ++i)
{
    com = getEntryComplete(words[i]);
    com.then(myDisplay, myDisplay);

    ent = getMinimalEntry(words[i]);
    ent.then(myDisplay,myDisplay);
}

res = getSeveralSlidesHTML(words);
res.then(
    function(value)
    {
        console.log(value);
    },
    function(error)
    {
        console.log(error);
    }
);

