from . import word2vec


def test_vector():
    q = {"vector":{"words":["dog", "cat", "FAKEFAKEFAKE"]}}
    resp = word2vec.apply(q)
    assert isinstance(resp, dict)
    
    assert "dog" in resp
    assert "cat" in resp
    assert "FAKEFAKEFAKE" in resp
    assert len(resp["dog"]) == 300
    assert len(resp["dog"]) == 300
    assert resp["FAKEFAKEFAKE"] is None


def test_distance():
    q = {"distance": {"words":["dog", "cat", "fish", "bird"]}}
    resp = word2vec.apply(q)
    assert isinstance(resp, dict)
    
    assert len(resp) == 6
    assert len(resp[0]) == 3
    
    
def test_similar():
    q = {"similar": {"word": "dog", "n": 30}}
    resp = word2vec.apply(q)
    assert isinstance(resp, dict)
    
    assert len(resp) == 30
    assert len(resp[1]) == 2
    
    
def test_analogy():
    q = {"analogy":  {"pos": ["king", "woman"],"neg": ["man"],"n": 5}}
    resp = word2vec.apply(q)
    assert isinstance(resp, dict)
    
    assert len(resp) == 30
    assert len(resp[1]) == 2


def test_multiple():
    q1 = {"vector":{"words":["dog", "cat", "FAKEFAKEFAKE"]}}
    q2 = {"distance": {"words":["dog", "cat", "fish", "bird"]}}
    q3 = {"similar": {"word": "dog", "n": 30}}
    q4 = {"analogy":  {"pos": ["king", "woman"],"neg": ["man"],"n": 5}}
    
    res = word2vec.apply([q1, q2, q3, q4])
    assert isinstance(res, list)
    
    assert len(resp) == 4
    assert isinstance(resp[0], dist)
    assert isinstance(resp[1], dist)
    assert isinstance(resp[2], dist)
    assert isinstance(resp[3], dist)
