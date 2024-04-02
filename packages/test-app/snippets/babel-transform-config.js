// in app ember-cli-build.js

const app = new EmberApp(defaults, {
  // ...
  babel: {
    plugins: [
      // ... any other plugins
      require.resolve("ember-concurrency/async-arrow-task-transform"),

      // NOTE: put any code coverage plugins last, after the transform.
    ],
  }
});

// in V1 addon index.js

// ...
options: {
  babel: {
    plugins: [
      require.resolve('ember-concurrency/async-arrow-task-transform'),
    ],
  },
},

// in V2 addon babel.config.json

{
  "plugins": [
    [
      // ... any other plugins
    "../../node_modules/ember-concurrency/async-arrow-task-transform"
  ]
}

// in engine index.js

// ...
babel: {
  plugins: [
    require.resolve('ember-concurrency/async-arrow-task-transform'),
  ],
}, 
