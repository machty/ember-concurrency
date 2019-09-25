---
name: "\U0001F41B Build Bug"
about: A problem relating to how TS is built in your ember app

---

<!-- This template is for bugs relating to Ember.js typescript support & infrastructure.
     Please fill out all of the required information below -->

### Please paste the output of `ember -v` here
<!-- example

  ember-cli: 3.1.4
  node: 10.5.0
  os: darwin x64

-->

### Please paste the output of `tsc -v` here
<!-- example

  Version 2.9.2

-->

### Please paste the version of `ember-cli-typescript` and `ember-cli-typescript-blueprints` here

<!-- yarn
yarn list --pattern 'ember-cli-typescript'
-->

<!-- npm
npm list ember-cli-typescript ember-cli-typescript-blueprints
-->

<!-- example
  ember-cli-typescript@2.0.0
  ember-cli-typescript-blueprints@1.2.0
-->

### Please paste your `tsconfig.json` and `tslint.json` or `eslint.json` (if applicable) below


<details><summary><b>My tsconfig.json</b></summary><pre>

  <!-- Paste your tsconfig.json here -->
  
</pre></details>

<details><summary><b>My tslint.json or eslint.json</b></summary><pre>

  <!-- Paste your tslint.json here -->

</pre></details>

### What are instructions we can follow to reproduce the issue?
```sh
ember new sample; cd ./sample # Create a new ember app
ember install ember-cli-typescript # Set up typescript support

>> Your Instructions Go Here <<

```

##### Reproduction Case
If you can, please try to fork [this codesandbox](https://codesandbox.io/s/github/mike-north/ember-new-output/tree/ts), and give us an example that demonstrates the problem. Paste the link below so that we can see what's going on

**Link: ** <your link here>

<!-- example: "Create a new route, add an action to it as shown in the following code sample" -->

### Now about that bug. What did you expect to see?
<!-- example: "I expected to be able to invoke my function foo() -->

### What happened instead?
<!-- example: "TypeScript seems to think that there is no function foo()" -->
