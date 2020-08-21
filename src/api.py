from Algorithmia.errors import AlgorithmException

try:
    from . import algorithmia_utils
    from . import wrapper
except Exception:
    import algorithmia_utils
    import wrapper


class Word2vecAPI(algorithmia_utils.BaseAPI):
    def load_model(self):
        if algorithmia_utils.in_algorithmia:
            model_fpath = algorithmia_utils.get_file(
                "data://danielfrg/word2vec/GoogleNews-vectors-negative300.bin.tar.gz"
            )
        else:
            # model_fpath = "models/text8.bin"
            model_fpath = "models/GoogleNews-vectors-negative300.bin"

        return wrapper.Word2vec(
            model_fpath, kind="bin", encoding="ISO-8859-1", new_lines=False
        )

    def predict(self, predict):
        if "vector" in predict:
            return self.model.vectors(words=predict["vector"]["words"])
        elif "distance" in predict:
            return self.model.distance(words=predict["distance"]["words"])
        elif "closest" in predict:
            n = predict["closest"].get("n", 10)
            return self.model.closest(vector=predict["closest"]["vector"], n=n)
        elif "similar" in predict:
            n = predict["similar"].get("n", 10)
            return self.model.similar(word=predict["similar"]["word"], n=n)
        elif "analogy" in predict:
            n = predict["analogy"].get("n", 10)
            pos = predict["analogy"].get("pos", [])
            neg = predict["analogy"].get("neg", [])
            return self.model.analogy(pos=pos, neg=neg, n=n)
        else:
            raise AlgorithmException("Invalid input json format")

        return None
