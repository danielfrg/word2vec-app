// This is being loaded on the HTML head
const Algorithmia = window.Algorithmia;

class Word2vec {
    constructor() {
        this.client = Algorithmia.client("simNkidTbC0XeTmxJEdslAAVE3K1");
    }

    ping() {
        return this.client
            .algo("danielfrg/word2vec/0.4.0?timeout=500")
            .pipe({ ping: "" });
    }

    load() {
        return this.client
            .algo("danielfrg/word2vec/0.4.0?timeout=500")
            .pipe({ load: "" });
    }

    similar(word) {
        // console.log(word);
        return this.client
            .algo("danielfrg/word2vec/0.4.0")
            .pipe({ predict: { similar: { word: word, n: 10 } } });
    }

    analogy(pos, neg) {
        // console.log(pos);
        // console.log(neg);
        return this.client
            .algo("danielfrg/word2vec/0.4.0")
            .pipe({ predict: { analogy: { pos: pos, neg: neg, n: 10 } } });
    }
}

export default Word2vec;
