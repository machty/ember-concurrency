# prember = Pre Render Ember


This Ember addon allows you to pre-render any list of URLs into static HTML files *at build time*. It has no opinions about how you generate the list of URLs.

## Quick Start

Add these packages to your app:

```sh
ember install ember-cli-fastboot
ember install prember
```

And configure some URLs that you would like to prerender:

```
// In ember-cli-build.js
let app = new EmberApp(defaults, {
  prember: {
    urls: [
      '/',
      '/about',
      '/contact'
    ]
  }
});
```

When you do `ember build --environment=production`, your built app will include fastboot-rendered HTML in the following files:

```
/index.html
/about/index.html
/contact/index.html
```

## Explanation

When you build a normal ember app (`ember build --environment=production`) you get a structure something like this:

```
dist/
├── assets
│   ├── my-app-0d31988c08747007cb982909a0b2c9db.css
│   ├── my-app-bdaaa766a1077911a7dae138cbd9e39d.js
│   ├── vendor-553c722f80bed2ea90c42b2c6a54238a.js
│   └── vendor-9eda64f0de2569c64ba0d33f08940fbf.css
├── crossdomain.xml
├── index.html
└── robots.txt
```

To serve this app to users, you just need to configure a webserver to use `index.html` in response to *all* URLs that don't otherwise map to files (because the Ember app will boot and take care of the routing).

If you add [ember-cli-fastboot](https://github.com/ember-fastboot/ember-cli-fastboot) to your app, it augments your build with a few things that are needed to run the app within node via [fastboot](https://github.com/ember-fastboot/fastboot):

```
dist/
├── assets
│   ├── assetMap.json
│   ├── my-app-0d31988c08747007cb982909a0b2c9db.css
│   ├── my-app-a72732b0d2468246920fa5401610caf4.js
│   ├── my-app-fastboot-af717865dadf95003aaf6903aefcd125.js
│   ├── vendor-553c722f80bed2ea90c42b2c6a54238a.js
│   └── vendor-9eda64f0de2569c64ba0d33f08940fbf.css
├── crossdomain.xml
├── index.html
├── package.json
└── robots.txt
```

You can still serve the resulting app in the normal way, but to get the benefits of server-side rendering you would probably serve it from a fastboot server that knows how to combine the JS files and the `index.html` file and generate unique output per URL. The downside of this is that your fastboot server is now in the critical path, which increases your ops complexity and is necessarily slower than serving static files.

`prember` starts with an app that's already capable of running in fastboot and augments it further. You configure it with a source of URLs to prerender, and it uses Fastboot to visit each one *during the build process*, saving the resulting HTML files:

```
dist/
├── _empty.html            <--------- A copy of the original index.html
├── about
│   └── index.html         <--------- Pre-rendered content
├── assets
│   ├── assetMap.json
│   ├── my-app-0d31988c08747007cb982909a0b2c9db.css
│   ├── my-app-a72732b0d2468246920fa5401610caf4.js
│   ├── my-app-fastboot-af717865dadf95003aaf6903aefcd125.js
│   ├── vendor-553c722f80bed2ea90c42b2c6a54238a.js
│   └── vendor-9eda64f0de2569c64ba0d33f08940fbf.css
├── contact
│   └── index.html         <--------- Pre-rendered content
├── crossdomain.xml
├── index.html             <--------- Rewritten with pre-rendered content
├── package.json
└── robots.txt
```

The resulting application can be served entirely statically, like a normal Ember app. But it has the fast-first-paint and SEO benefits of a Fastboot-rendered application for all of the URLs that you pre-rendered.

## Configuring Your Webserver

Your webserver needs to do two things correctly for this to work:

1. It should use a file like `about/index.html` to respond to URLs like `/about`. This is a pretty normal default behavior.
2. It should use `_empty.html` to respond to unknown URLs (404s). In a normal Ember app, you would configure `index.html` here instead, but we may have already overwritten `index.html` with content that only belongs on the homepage, not on every route. This is why `prember` gives you a separate `_empty.html` file with no prerendered content.

## Options

You pass options to `prember` by setting them in `ember-cli-build.js`:

```
// In ember-cli-build.js
let app = new EmberApp(defaults, {
  prember: {
    urls: [
      '/',
      '/about',
      '/contact'
    ]
  }
});
```

The supported options are:

 - `urls`: this can be an array or a promise-returning function that resolves to an array. How you generate the list of URLs is up to you, there are many valid strategies. See next section about using a custom url discovery function.
 - `enabled`: defaults to `environment === 'production'` so that `prember` only runs during production builds.
 - `indexFile`: defaults to `"index.html"`. This is the name we will give to each of the files we create during pre-rendering.
 - `emptyFile`: defaults to `"_empty.html"`. This is where we will put a copy of your empty `index.html` as it was before any pre-rendering.

## Using a custom URL discovery function

If you pass a function as the `urls` option, prember will invoke it like:

```js
let listOfUrls = await yourUrlFunction(distDir, visit);
```

`distDir` is the directory containing your built application. This allows your function to inspect the build output to discover URLs.

`visit` is an asynchronous function that takes a URL string and resolves to a response from a running fastboot server. This lets your function crawl the running application to discover URLs.

For an example of both these strategies in action, see `./tests/dummy/lib/url-tester.js` in this repo's test suite.

## Using prember in development

In addition to the `enabled` option, you can temporarily turn `prember` on by setting the environment variable `PREMBER=true`, like:

```sh
PREMBER=true ember serve
```

**However**, by default ember-cli doesn't understand that it should use a file like `about/index.html` to respond to a URL like `/about`. So you should do:

```sh
ember install prember-middleware
```

It's harmless to keep prember-middleware permanently installed in your app, it has no impact on your production application.

When running in development, you will see console output from ember-cli that distinguishes whether a given page was handled by prember vs handled on-the-fly by fastboot:

```
prember: serving prerendered static HTML for /about       <--- served by prember
2017-10-27T05:25:02.161Z 200 OK /some-other-page          <--- served by fastboot
```

## Using prember from an addon

Addon authors may declare urls for prember during compilation. To do so, you will want to:

- Add `prember-plugin` to your addon's package.json `keywords` array;
    - Consider also using package.json's `ember-addon` object to configure your addon to run `before: 'prember'`
- Define a `urlsForPrember(distDir, visit)` function in your addon's main file;
    - This function shares an interface with the "custom URL discovery" function, as defined above; and
- Advise your addon's users to install & configure `prember` in the host application.

# Deployment

You shouldn't need to do much special -- just make sure the html files get copied along with all your other files.

If you're using `ember-cli-deploy-s3`, you just need to customize the `filePattern` setting so it includes `.html` files. For example:

```js
    ENV.s3 = {
      bucket: 'cardstack.com',
      region: 'us-east-1',
      filePattern: '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2,otf,html}'
      allowOverwrite: true
    };
```

# Compared to other addons

There are other ways to pre-render content:

 - [ember-prerender](https://github.com/zipfworks/ember-prerender) depends on having a real browser to do prerendering, which is heavy and complex. It's old and unmaintained.
 - [ember-cli-prerender](https://github.com/Motokaptia/ember-cli-prerender) uses Fastboot like we do, but it is not integrated with the build pipeline (so it's harder to make it Just Work™ with things like [ember-cli-deploy](http://ember-cli-deploy.com/)) and it has stronger opinions about what URLs it will discover, including blueprint-driven sitemap configuration.
 - [ember-cli-staticboot](https://github.com/robwebdev/ember-cli-staticboot) is quite similar to this addon, and I didn't realize it existed before I started making this one. I do think `prember` does a better job of integrating the static build output with the existing ember app in a way that requires the minimal webserver configuration. 
 
 
