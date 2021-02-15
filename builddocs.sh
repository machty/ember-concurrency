#!/bin/bash

jsdoc \
  addon/* \
  addon/-private/external/* \
  -R API.md \
  -c .jsdoc \
  -d tests/dummy/public/api/
