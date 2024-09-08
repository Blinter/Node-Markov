class MarkovMachine {
  constructor(text) {
    this.words = text.split(/[ \r\n]+/).filter(c => c !== "");
    this.chains = new Map();
    this.makeChains();
  }
  makeChains() {
    for (let i = 0; i != this.words.length - 1; i++) {
      if (!this.chains.has(this.words[i]))
        this.chains.set(this.words[i], new Set());
      if (!this.chains.get(this.words[i]).has(this.words[i + 1]))
        this.chains.get(this.words[i]).add(this.words[i + 1]);
    }
    if (!this.chains.has(this.words.at(-1)))
      this.chains.set(this.words.at(-1), new Set());
  }
  getRandom = max => Math.floor(Math.random() * max);
  getRandomStartingWord = () => Array.from(this.chains.keys()).at(this.getRandom(this.chains.size));
  getRandomStartingWordCapitalized = () => {
    const capitalWords = Array.from(this.chains.keys()).filter(v=>/^[A-Z][^.]*$/.test(v));
    if (capitalWords == null || capitalWords.length === 0)
      return null;
    return capitalWords.at(this.getRandom(capitalWords.length));
  }
  getRandomWord = currentWord => Array.from(this.chains.get(currentWord)).at(this.getRandom(this.chains.get(currentWord).size));
  makeText(numWords = 100, startCapitalized = false, stopAtPeriod = false) {
    let endText = [startCapitalized ? this.getRandomStartingWordCapitalized() || this.getRandomStartingWord() : this.getRandomStartingWord()];
    while (endText.length !== numWords) {
      const nextWord = this.getRandomWord(endText.at(-1));
      // Keep going until we reach num words
      if (nextWord == null)
        break;
      endText.push(nextWord);
      if (stopAtPeriod && nextWord.includes(".")) {
        break;
      }
      // Keep going until we reach num words
      // endText.push(this.getRandomStartingWord());
    }
    return endText.join(' ');
  }
}
// let mm = new MarkovMachine("the cat in the hat");
// console.log(mm.makeText(50));

module.exports = MarkovMachine;
