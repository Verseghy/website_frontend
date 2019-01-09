#!/usr/bin/env bash

scp -rp -i ./deploy_key ./dist/apps/frontend/* sowpch@verseghy-gimnazium.net:/home/sowpch/beta.verseghy-gimnazium.net/

