# Development

This app was developed before Algorithmia could integrate with GitHub
so we need to clone directly from Algorithmia.

```
git clone https://git.algorithmia.com/git/danielfrg/word2vec.git word2vec-app
```

## Model API

Create conda env

```
mamba env create
conda activate word2vec-app
```

Run the code in `src`:

```
python algorithmia_entrypoint.py
```

Push will build a new version of the API.

## JavaScript App

```
cd js
npm i
npm run dev
```

## Push to GitHub

Setup Github remote to have it also there

```
git remote add github git@github.com:danielfrg/word2vec-app.git
```

Make sure to push to both upstreams

```
git push -u origin master  # This will take a while while it build in Algorithmia
git push -u github master
```
