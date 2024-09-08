const MarkovMachine = require('./markov.js');
const axios = require('axios');
const URL = require('url').URL;
const fs = require('fs');

function outputMarkovToConsole(outputText = null) {
    if (outputText == null)
        throw "No text was supplied.";
    let outputTextCountWords = outputText;

    while (outputTextCountWords.includes("  "))
        outputTextCountWords = outputTextCountWords.replace("  ", " ");
    console.log("MARKOV: Producing text.");
    console.log(new MarkovMachine(outputText)
        .makeText(
            numWords = outputTextCountWords.split(" ").length + 2, // Find spaces in output text
            startCapitalized = true,
            stopAtPeriod = true
        ));
    console.log("MARKOV: Text generation completed.");
}

function webCatFunction(urlPath) {
    axios.get(urlPath)
        .then(resp => {
            outputMarkovToConsole(resp.data);
        })
        .catch(e => {
            console.error(e);
        });
}

function catFunction(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        outputMarkovToConsole(data);
    });
}

if (process.argv.length <= 2) {
    console.error("Argument not provided.");
    process.exit(1);
} else {
    let currentArguments = process.argv.slice(2);
    if (currentArguments[0] === "file") {
        currentArguments = currentArguments.slice(1);
        if (currentArguments.length === 0)
            throw "file flag supplied but file name not supplied.";

        catFunction(currentArguments[0]);
    } else if (currentArguments[0].toLowerCase() === "url") {
        currentArguments = currentArguments.slice(1);
        if (currentArguments.length === 0)
            throw "url flag supplied but URL not supplied.";
        try {
            new URL(currentArguments[0]);
        } catch {
            throw "Could not parse URL " + currentArguments[0].toString();
        }
        webCatFunction(currentArguments[0]);
    } else {
        throw "Unknown type supplied " + currentArguments[0] + ", try file or url.";
    }
}