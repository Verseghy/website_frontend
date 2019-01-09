#!/usr/bin/env bash

scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -rp -i ./deploy_key ./dist/apps/frontend/* sowpch@verseghy-gimnazium.net:/home/sowpch/beta.verseghy-gimnazium.net/

