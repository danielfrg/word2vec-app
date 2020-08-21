// This is being loaded on the HTML head
const Algorithmia = window.Algorithmia;

class Word2vec {
    constructor() {
        this.client = Algorithmia.client("simNkidTbC0XeTmxJEdslAAVE3K1");
    }

    ping() {
        return this.client.algo("danielfrg/word2vec/0.3.2").pipe({ ping: "" });
    }

    similar(word) {
        return this.client
            .algo("danielfrg/word2vec/0.3.2")
            .pipe({ predict: { distance: { word: word, n: 10 } } });
    }
}

export default Word2vec;
