# 2.4.1
 - BUGFIX: path handling on windows by @LNieuwmegen.

# 2.4.0
 - ENHANCEMENT: allow configuring snippet file extensions, by @shimizust

# 2.3.1

 - HOUSEKEEPING: bumping a deprecated glob dep. Thanks @AndreJoaquim.

# 2.3.0

 - ENHANCEMENT: add TypeScript to the default list of file types we will examine for snippets. Thanks @aaxelb.

# 2.2.2

 - HOUSEKEEPING: fix broccoli 2 deprecations, thanks @dcyriller

# 2.2.1

 - BUGFIX: make index.js name match NPM package name by @esbanarango

# 2.2.0

 - ENHANCEMENT: Add support for snippets in YAML files by @acdn-sglanzer

# 2.1.0

 - ENHANCEMENT: Allow excluding the file extension from the snippet name by @dfreeman

# 2.0.1
 - BUGFIX: fix loading snippets from a subdirectory by @dwickern
 - HOUSEkEEPING: update deps by @BnitoBzh

# 2.0.0

 - BREAKING CHANGE: we used to include syntax highlighting support for *every* language supported by highlight.js.  This is hundreds of languages and it results in a lot of unused code. Starting in 2.0.0, we only include a small set of defaults that are likely relevant to Ember users, and provide the option to substitute your own custom build of highlight.js if you need a different set. See "Syntax Highlighting Language Support" in the README.

 - ENHANCEMENT: you can now disable the automatic inclusion of our default theme and provide one of the other highlight.js themes. See "Theming Support" in the README.

 - ENHANCEMENT: detect nested code snippets (PR #42 by @defreeman)
