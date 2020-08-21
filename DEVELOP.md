This app was developed before Algorithmia could integrate with GitHub
so we need to clone and push directly to Algorithmia for new builds of the API.

1. Clone the repo using Algorithmia

```
git clone https://git.algorithmia.com/git/danielfrg/word2vec.git word2vec-app
```

Make code changes and push will build a new version of the API.

2. Setup Github remote to have it also there

```
git remote add github git@github.com:danielfrg/word2vec-app.git
git push -u github master
```

3. Make sure to push to both upstreams

```
git push -u github master
git push -u origin master
```

4. To update the JS app:

```
cd js
npm run build
```

And upload to Netlify the `dist` directory. No CI because this rarely gets updated.
