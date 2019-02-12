#!/usr/bin/env bash

shopt -s dotglob
rsync -avz --delete ./dist/apps/frontend/ sowpch@verseghy-gimnazium.net:/home/sowpch/beta.verseghy-gimnazium.net/
