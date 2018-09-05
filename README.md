## word2vec

Word Vector functions based on word2vec.

## Usage

There is multiple option

### Input

_Describe the input fields for your algorithm. For example:_

| Parameter | Description |
| --------- | ----------- |
| field     | Description of field |

_What data pre-processing would be great to perform on the input before calling this algorithm?_

### Output

_Describe the output fields for your algorithm. For example:_

| Parameter | Description |
| --------- | ----------- |
| field     | Description of field |

## Examples

_Provide and explain examples of input and output for your algorithm._

```
{
    "vectors":  { "words": ["dog", "cat"]}
}

{
    "distance": { "words": ["dog", "cat", "fish"]}
}

{
    "similar":  { "word": "dog", "n":10} 
}

{
    "analogy":  { "pos": ["king", "woman"], "neg": ["man"], "n":20}
}
```