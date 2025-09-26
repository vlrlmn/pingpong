#!/bin/bash

# Обновляем сабмодули
echo "🔄 Initializing and updating submodules..."
git submodule update --init --recursive

# Проходим по каждому сабмодулю
git config --file .gitmodules --get-regexp path | while read -r key path; do
    echo ""
    echo "➡️  Processing submodule: $path"

    # Переходим в директорию сабмодуля
    cd "$path" || continue

    # Получаем ветку из .gitmodules, если указана
    branch=$(git config -f ../.gitmodules --get "submodule.$path.branch")

    if [ -z "$branch" ]; then
        # Если ветка не указана, берём ветку по умолчанию из origin/HEAD
        branch=$(git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@')
        echo "ℹ️  No branch in .gitmodules, using default: $branch"
    else
        echo "📦 Branch from .gitmodules: $branch"
    fi

    # Получаем изменения и переключаемся
    # git fetch origin
    git checkout "$branch" && git pull origin "$branch"

    # Возвращаемся обратно
    cd - > /dev/null || exit
done

echo ""
echo "✅ All submodules updated and checked out to their default branches."
