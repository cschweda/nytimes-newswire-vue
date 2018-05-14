# New York Times Top Stories

New York Times 'Top Stories' built with [Vue](https://vuejs.org/) and [Vuetify](https://vuetifyjs.com/).

## Live demo

https://nyt.metaincognita.com

## Build Setup

```bash
- mkdir a new folder
- cd into it
- degit https://github.com/cschweda/nytimes-newswire-vue
```

If you don't have `degit` installed, I highly recommend it: https://github.com/Rich-Harris/degit

Then:

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build

# format with prettier
yarn format
```

## API keys

Before building the app, you'll need an API key.

* Obtain the **Top Stories** API keys here: http://developer.nytimes.com/

### For Development

* Rename `./config/env-sample.js` to `env.js`
* Paste in your key

### For Production (on Netlify)

* Create new environment variable named `API_KEY` in build settings.
* Paste in your key as value
* Build site with `yarn build` or `npm build`
