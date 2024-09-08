# Node Markov

## **Markov Machines**

A Markov Machine emits output of a “Markov Chain.”

A Markov Chain is a chain of possible outcomes, given a particular “state”.

For example, consider the phrase “the cat in the hat is in the hat”. We could build a table of each word in this phrase, along with the word that comes after that phrase:

To emit realistic-but-random text, we could pick a starting word randomly (say, “in”). Then we would:

1. find all words that can come after that word
2. pick one of those next-words randomly
3. if we picked ***null*** , we’ve reached the end of the chain, so stop
4. otherwise, restart at step 1

For example, from that simple phrase, we could find:

- “in the cat in the hat”
- “in the hat is in the hat”
- “in the cat in the cat in the cat in the hat”


## FS

### **Algorithmic Things**

- Have the machine only start on a capitalized word (or better still: a word that starts a sentence); this will give you more realistic output text.
- Have the machine stop at a period, while still honoring the maximum number of words passed in.