import Algorithmia
import os
import json
import numpy as np
import word2vec

client = Algorithmia.client()


def gunzip(file):
    """
    gunzip a file that is downloaded by Algorithmia client
    
    This files don't have a .gz extension e.g. "/tmp/tmpsva98zf4"
    
    Returns the name of the unziped file
    gunzip extracts a file with the same name as the '___.gz' so it ends up being the same name as the original 'file' variable
    """
    import subprocess
    gzip = file
    
    # Add .gz suffix (gunzip needs it)
    if not file.endswith(".gz"):
        new_gzip = file + ".gz"
        os.rename(file, new_gzip)
        gzip = new_gzip
    
    try:
        output = subprocess.check_output("gunzip -k -S _gz {gzip}".format(gzip=gzip), stderr=subprocess.STDOUT, shell=True).decode()
        success = True
    except subprocess.CalledProcessError as e:
        output = e.output.decode()
        success = False
    
    return file, success


def load_model(fname, *args, **kwargs):
    if fname.startswith("data:"):
        file = client.file(fname).getFile().name
        if fname.endswith(".gz"):
            file, _ = gunzip(file)
    else:
        file = fname
        
    model = word2vec.load(file, *args, **kwargs)
    return model


model = load_model("data://danielfrg/word2vec/GoogleNews-vectors-negative300.bin.gz", kind="bin", encoding="ISO-8859-1", new_lines=False)
# model = load_model("data://danielfrg/word2vec/text8.bin.gz", kind="bin")
# model = load_model("data://danielfrg/word2vec/text8.bin", kind="bin")


def analogy(pos, neg, n=10, metric="cosine"):
    return model.analogy(pos=pos, neg=neg, n=n, metric=metric)


def similar(word, n=10, metric="cosine"):
    return model.similar(word, n=n, metric=metric)


def closest(vector, n=10, metric="cosine"):
    return model.closest(np.array(vector), n=n, metric=metric)


def distance(words, metric="cosine"):
    return model.distance(*words, metric=metric)


def vectors(words):
    ret = {}
    for word in words:
        ret[word] = model[word].tolist() if word in model else None
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
    responses = []
    for query in queries:
        ret = {}
        for key, value in queries.items():
            if key in "vector":
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
                raise Exception("Unknown query '{key}'".format(key=key))
        responses.append(ret)
    return responses
