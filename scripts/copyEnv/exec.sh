#!/bin/bash

# 対応表ファイルのパス
MAP_FILE="./scripts/copyEnv/branchEnvMap.txt"
# 環境変数ファイルが置かれているディレクトリのパス
ENVS_DIR="./.envs"
# コピー先の環境変数ファイル名
DEST_ENV_FILE=".env"

# 現在のGitブランチ名を取得
CURRENT_BRANCH=$(git branch --show-current)

# 対応表から現在のブランチに対応する環境名を探す（※ 対応表ファイルの最後に必ず改行が必要）
ENV_NAME=""
while IFS='=' read -r branch env; do
    if [ "$branch" = "$CURRENT_BRANCH" ]; then
        ENV_NAME="$env"
        break
    elif [ "$branch" = "*" ]; then
        ENV_NAME="$env"
        break
    fi
done < "$MAP_FILE"

# コピー元の環境変数ファイルのパス
SOURCE_ENV_PATH="$ENVS_DIR/$ENV_NAME"

cp  "$SOURCE_ENV_PATH" "$DEST_ENV_FILE"
