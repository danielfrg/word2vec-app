from . import word2vec


def test_vector():
    q = {"vector":{"words":["dog", "cat", "FAKEFAKEFAKE"]}}
    res = word2vec.apply(q)
    assert isinstance(res, dict)
    
    assert "vector" in res
    values = res["vector"]
    
    assert "dog" in values
    assert "cat" in values
    assert "FAKEFAKEFAKE" in values
    assert len(values["dog"]) == 300
    assert len(values["dog"]) == 300
    assert values["FAKEFAKEFAKE"] is None


def test_distance():
    q = {"distance": {"words":["dog", "cat", "fish", "bird"]}}
    res = word2vec.apply(q)
    assert isinstance(res, dict)
    
    assert "distance" in res
    values = res["distance"]
    
    assert len(values) == 6
    assert len(values[0]) == 3
    
    
def test_similar():
    q = {"similar": {"word": "dog", "n": 30}}
    res = word2vec.apply(q)
    assert isinstance(res, dict)
    
    assert "similar" in res
    values = res["similar"]
    
    assert len(values) == 30
    assert len(values[1]) == 2
    
    
def test_analogy():
    q = {"analogy":  {"pos": ["king", "woman"],"neg": ["man"],"n": 5}}
    res = word2vec.apply(q)
    assert isinstance(res, dict)
    
    assert "analogy" in res
    values = res["analogy"]
    
    assert len(values) == 30
    assert len(values[1]) == 2


def test_multiple():
    q1 = {"vector":{"words":["dog", "cat", "FAKEFAKEFAKE"]}}
    q2 = {"distance": {"words":["dog", "cat", "fish", "bird"]}}
    q3 = {"similar": {"word": "dog", "n": 30}}
    q4 = {"analogy":  {"pos": ["king", "woman"],"neg": ["man"],"n": 5}}
    
    res = word2vec.apply([q1, q2, q3, q4])
    assert isinstance(res, list)
    
    assert "vector" in res[0]
    assert "distance" in res[1]
    assert "similar" in res[2]
    assert "analogy" in res[3]
