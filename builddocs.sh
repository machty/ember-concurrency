#!/bin/bash

jsdoc \
  addon/* \
  -R API.md \
  -c .jsdoc \
  -d tests/dummy/public/api/

