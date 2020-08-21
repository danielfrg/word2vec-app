import os
import json
import uuid
import base64
import hashlib
import tempfile

import numpy as np
import word2vec


class Word2vec(object):
    def __init__(self, fpath, load=True, *args, **kwargs):
        self.model = word2vec.load(fpath, *args, **kwargs)

    def vectors(self, words):
        ret = {}
        for word in words:
            ret[word] = self.model[word].tolist() if word in self.model else None
        return ret

    def distance(self, words, metric="cosine"):
        return self.model.distance(*words, metric=metric)

    def closest(self, vector, n=10, metric="cosine"):
        idx, metrics = self.model.closest(np.array(vector), n=n, metric=metric)
        return self.model.generate_response(idx, metrics).tolist()

    def similar(self, word, n=10, metric="cosine"):
        if word not in self.model:
            return {"error": "not_in_vocab", "word": word}
        idx, metrics = self.model.similar(word, n=n, metric=metric)
        return self.model.generate_response(idx, metrics).tolist()

    def analogy(self, pos, neg, n=10, metric="cosine"):
        for word in pos + neg:
            if word not in self.model:
                return {"error": "not_in_vocab", "word": word}
        idx, metrics = self.model.analogy(pos=pos, neg=neg, n=n, metric=metric)
        return self.model.generate_response(idx, metrics).tolist()

