# @ember/optional-features

This addon allows you to easily enable/disable optional features in ember-source. To clarify what we mean by optional, these are features that will be opt-in/opt-out and optional for the foreseeable future, not features that will be enabled by default. It is intended for use with apps *only* not addons.

## Installation

```bash
ember install @ember/optional-features
```

## Usage

### List available features

Features will only be available in versions of ember-source that included them. To list all available features run:

```bash
ember feature:list
```

### Enable/disable features

To enable a feature, run:

```bash
ember feature:enable some-feature
```

Similarly, if you want to disable a feature, you can run:

```bash
ember feature:disable some-feature
```
