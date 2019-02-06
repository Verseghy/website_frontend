#!/usr/bin/env bash

shopt -s dotglob
rsync -avz --delete -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i ./deploy_key" ./dist/apps/frontend/ sowpch@verseghy-gimnazium.net:/home/sowpch/beta.verseghy-gimnazium.net/
