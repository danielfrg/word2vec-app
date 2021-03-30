# word2vec

[![Site](https://github.com/danielfrg/word2vec-app/workflows/deploy/badge.svg)](https://word2vec.danielfrg.com)
[![License](https://img.shields.io/:license-Apache%202-blue.svg)](https://github.com/danielfrg/jupyter-flex/blob/master/LICENSE.txt)

Word Vector functions based on word2vec.

[Online App](https://word2vec.danielfrg.com) -
[Algorithm](https://algorithmia.com/algorithms/danielfrg/demucs)

[![word2vec-app](https://raw.githubusercontent.com/danielfrg/word2vec-app/master/word2vec-app.png)](https://word2vec.danielfrg.com)

## Data

Model is trained using part of Google News dataset (about 100 billion words).

The model contains 300-dimensional vectors for 3 million words and phrases.

## Usage

There are multiple functions available to query.

1. vector: Get vectors for specific words
2. distance: Calculate distances between the combinations of words
3. closest: Get the closest n words and distances to a vector
4. similar: Get the most similar n words and distances to one words
5. analogy: Make word analogies based on positive and negative feedback

### 1. Vector

Returns the vector that represent a word.

| Parameter | Description |
| --- | --- |
| words | List of words |

Example:

```json
{
    "predict":{
        "vector":{
            "words":[
                "dog",
                "cat"
            ]
        }
    }
}
```

Output:

```json
{
    "cat": [0.001, 0.06, ...],
    "dog": [0.02, 0.002, ...]
}
```

### 2. Distance

Returns the distance between all the combinations (r=2) of multiple words.

| Parameter | Description |
| --- | --- |
| words | List of words |

Example:

```json
{
    "predict":{
        "distance":{
            "words":["dog", "cat", "fish", "bird"]
        }
    }
}
```

Output:

```json
[
    ["dog",  "cat",  0.7609457299277049],
    ["dog",  "fish", 0.2331458338686121],
    ["dog",  "bird", 0.4504405095095247],
    ["cat",  "fish", 0.32425707394406234],
    ["cat",  "bird", 0.5146262971059316],
    ["fish", "bird", 0.49408521392145377]
]
```

### 3. Closest

Get the n (default=10) closest words and respective distances to a vector.

| Parameter | Description |
| --- | --- |
| vector | vector of size 300 as list of numbers |
| n | (default=10) Top N items to return |

Example:

```json
{
    "predict":{
        "closest": {
            "vector": [0.02, 0.006, ...], "n": 10
        }
    }
}
```

Output:

For the vector that represents "dog", you can get this using query #1.

```json
[
    ["dogs",    0.8680489915680536],
    ["puppy",   0.8106428352360295],
    ["pit_bull",0.7803960342611623],
    ["pooch",   0.7627376737257423],
    ["cat",     0.7609457299277049],
    ["golden_retriever",0.7500902073008441],
    ["German_shepherd", 0.7465174355312222],
    ["Rottweiler",      0.7437614773466921],
    ["beagle",  0.7418621650220392],
    ["pup",     0.7406910838103349]
]
```

### 4. Similar

Get the n (default=10) similar words and distances to one

| Parameter | Description |
| --- | --- |
| word | Word to calculate distances |
| n | (default=10) Top N items to return |

Example:

```json
{
    "predict":{
        "similar": {
            "word": "dog", "n": 3
        }
    }
}
```

Output:

```json
[
    ["dogs",  0.8680489915680536],
    ["puppy", 0.8106428352360294],
    ["pit_bull",  0.7803960342611623]
]
```

### 5. Analogy

| Parameter | Description |
| --- | --- |
| pos | List of positive words |
| neg | List of negative words |
| n | (default=10) Top N items to return |


Compute an analogy based positive words and negative words, for example: `king - man + woman = queen`

```json
{
    "predict":{
            "analogy":  {
                "pos": ["king", "woman"],
            "neg": ["man"],
            "n": 5
        }
    }
}
```

```json
[
    ["queen",    0.26689835890816027],
    ["monarch",  0.23208332083114688],
    ["princess", 0.22131306095983244],
    ["crown_prince", 0.20620359683335132],
    ["prince",   0.20162396428463877]
]
```

## Other endpoints

There are other functions that allows to query for the health and status of the
API.

1. `{"ping":""}` returns `true` when API is live, it doesn't load the model
1. `{"health":""}` returns the status of the API from  `["live", "model_loaded"]`
1. `{"load":""}` triggers the loading of the model into memory, return `ok` when done
1. `{"debug":""}` returns debug information about the API and environment
