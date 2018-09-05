import Algorithmia
import word2vec


def load_model(fname, *args, **kwargs):
    model = word2vec.load(fname, *args, **kwargs)
    return model

model = load_model("data://danielfrg/word2vec/GoogleNews-vectors-negative300.bin", encoding="ISO-8859-1", new_lines=False)


def analogy(pos, neg, n=10, metric="cosine"):
    return model.analogy(pos=pos, neg=neg, n=n, metric=metric)


def similar(word, n=10, metric="cosine"):
    return model.similar(word, n=n, metric=metric)


def closest(vector, n=10, metric="cosine"):
    return model.closest(vector, n=n, metric=metric)


def distance(words, metric="cosine"):
    return model.distance(*words, metric=metric)


def vectors(words):
    ret = {}
    for word in words:
        ret[word] = model[word] if word in model else None
    return ret


def apply(queries):
    """
    {
        "vectors":  { "words": ["dog", "cat"]},
        "distance": { "words": ["dog", "cat"], "metric": "cosine"},
        "closest":  { "vector": [...], "n": 10, "metric": "cosine"},
        "similar":  { "word": "dog", "n":10 , "metric": "cosine"},
        "analogy":  { "pos": ["king", "woman"], "neg": ["man"], "n":10 , "metric": "cosine"}
    }
    """
        
    ret = {}
    for key, value in queries.items():
        if key in "vectors":
            ret[key] = vectors(**value)
        elif key in "distance":
            ret[key] = distance(**value)
        elif key in "closest":
            idx, metrics = closest(**value)
            ret[key] = model.generate_response(idx, metrics).tolist()
        elif key == "similar":
            idx, metrics = similar(**value)
            ret[key] = model.generate_response(idx, metrics).tolist()
        elif key == "analogy":
            idx, metrics = analogy(**value)
            ret[key] = model.generate_response(idx, metrics).tolist()
        else:
            raise Exception(f"Unknown query '{key}'")
    
    return ret
