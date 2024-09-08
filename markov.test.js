const MarkovMachine = require('./markov.js');
const { faker } = require('@faker-js/faker');

describe("Markov Machine always ends when last word has been reached", () => {

    let mm = new MarkovMachine("the cat in the hat");
    test("always ends in hat", function () {
        for (let i = 0; i != mm.chains.size * 5; i++) {
            let output = mm.makeText(mm.chains.size * 50);
            expect(output.endsWith(Array.from(mm.chains.keys()).at(-1))).toBe(true);
        }
    })
    test("has output for defined sentence", function () {
        for (let i = 0; i != mm.chains.size * 5; i++) {
            let output = mm.makeText(mm.chains.size * 50);
            expect(output).not.toBeNull();
        }
    })

    mm = new MarkovMachine(faker.lorem.paragraph(50));
    test("always ends in last word for long sentence", function () {
        for (let i = 0; i != mm.chains.size * 5; i++) {
            let output = mm.makeText(mm.chains.size * 50);
            expect(output.endsWith(Array.from(mm.chains.keys()).at(-1))).toBe(true);
        }
    })
    test("has output for long sentence", function () {
        for (let i = 0; i != mm.chains.size * 5; i++) {
            let output = mm.makeText(mm.chains.size * 50);
            expect(output).not.toBeNull();
        }
    })
    
    mm = new MarkovMachine(faker.lorem.sentence());
    test("always ends in last word for short sentence", function () {
        for (let i = 0; i != mm.chains.size * 5; i++) {
            let output = mm.makeText(mm.chains.size * 50);
            expect(output.endsWith(Array.from(mm.chains.keys()).at(-1))).toBe(true);
        }
    })
    test("has output for short sentence", function () {
        for (let i = 0; i != mm.chains.size * 5; i++) {
            let output = mm.makeText(mm.chains.size * 50);
            expect(output).not.toBeNull();
        }
    })
    
    mm = new MarkovMachine(faker.lorem.word());
    test("always ends in last word for single word", function () {
        for (let i = 0; i != mm.chains.size * 5; i++) {
            let output = mm.makeText(mm.chains.size * 50);
            expect(output.endsWith(Array.from(mm.chains.keys()).at(-1))).toBe(true);
        }
    })
    test("has output for single word", function () {
        for (let i = 0; i != mm.chains.size * 5; i++) {
            let output = mm.makeText(mm.chains.size * 50);
            expect(output).not.toBeNull();
        }
    })
})