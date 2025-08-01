#!/bin/bash

# 現在のGitブランチ名を取得
CURRENT_BRANCH=$(git branch --show-current)
NODE_PROGEAM_PATH="./scripts/initDb/main.mjs"

ENV_NAME=""
if [ "$CURRENT_BRANCH" = "main" ]; then
    node "$NODE_PROGEAM_PATH"
else
    node "$NODE_PROGEAM_PATH" mock
fi
