#!/usr/bin/env bash

set -e

ember ts:precompile
node scripts/move-declaration-files.js
