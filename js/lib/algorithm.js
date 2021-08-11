class Algorithm {
    constructor() {
        // This is being loaded on the HTML head
        const Algorithmia = window.Algorithmia;

        this.client = Algorithmia.client("simNkidTbC0XeTmxJEdslAAVE3K1");
    }

    ping() {
        return this.client
            .algo("danielfrg/word2vec/0.4.1?timeout=500")
            .pipe({ ping: "" });
    }

    load() {
        console.log("Loading model");
        return this.client
            .algo("danielfrg/word2vec/0.4.1?timeout=500")
            .pipe({ load: "" });
    }

    similar(word) {
        return this.client
            .algo("danielfrg/word2vec/0.4.1")
            .pipe({ predict: { similar: { word: word, n: 10 } } });
    }

    analogy(pos, neg) {
        return this.client
            .algo("danielfrg/word2vec/0.4.1")
            .pipe({ predict: { analogy: { pos: pos, neg: neg, n: 10 } } });
    }
}

export default Algorithm;
