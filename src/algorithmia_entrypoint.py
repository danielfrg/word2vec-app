api = None


def get_api():
    global api
    if api is None:
        try:
            from .api import Word2vecAPI
        except Exception:
            from api import Word2vecAPI

        api = Word2vecAPI()
    return api


def apply(input):
    try:
        api = get_api()
        return api.apply(input)
    except Exception as ex:
        raise ex


if __name__ == "__main__":
    # print(apply({"ping": ""}))
    # print(apply({"debug": ""}))
    # print(apply({"health": ""}))
    # print(apply({"load": ""}))
    # print(apply({"health": ""}))

    print(apply({"predict": {"vector": {"words": ["dog", "cat", "not-a-word"]}}}))
    vector = apply({"predict": {"vector": {"words": ["dog"]}}})["dog"]
    print(apply({"predict": {"closest": {"vector": vector}}}))
    print(apply({"predict": {"distance": {"words": ["dog", "cat", "fish", "bird"]}}}))
    print(apply({"predict": {"similar": {"word": "dog", "n": 30}}}))
    print(
        apply(
            {"predict": {"analogy": {"pos": ["king", "woman"], "neg": ["man"], "n": 5}}}
        )
    )
