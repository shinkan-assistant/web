#!/bin/bash


# 対応表ファイルのパス
MAP_FILE="./branch-env-map.txt"
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

# プログラムを実行するパス
node ./scripts/initDb/main.mjs "$ENV_NAME"
