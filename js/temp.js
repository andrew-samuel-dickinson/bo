


async function getEntryComplete(word) {
  let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
  let x = await fetch(url);
  let y = await x.text();
  let obj = await JSON.parse(y);
  //document.getElementById("demo").innerHTML = y;
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
    //ret["WHOLE"] = entryComplete;
    return ret
}

// let obj = getEntryComplete("acid");

// obj.then(
//     function(value) {
//         console.log("***Calling VALUE***");
//         console.log(value[0]["meanings"][0]);
//         console.log(value[0]["meanings"][0]["partOfSpeech"]);
//         console.log(value[0]["meanings"][0]["synonyms"]);
//         console.log(value[0]["meanings"][0]["antonyms"]);
//         console.log(value[0]["meanings"][0]["definitions"][0]["definition"]);
//         console.log(value[0]["meanings"][0]["definitions"][0]);
//         //console.log(value);
//     },
//     function(error) {console.log(error);},
// );

let obj2 = getMinimalEntry("wood");

obj2.then(
    function(value)
    {
        console.log(value);
    },
    function(error)
    {
        console.log(error);
    }
);
