#!/bin/bash

echo "To remove the existing tags run: git tag | xargs -n1 git tag -d"
echo "[Frontend tags]"
git log --pretty=format:"%h" --all --grep='Install cypress'  | xargs -n1 git tag frontend-step-1
git log --pretty=format:"%h" --all --grep='e2e images snapshot testing'  | xargs -n1 git tag frontend-step-2
git log --pretty=format:"%h" --all --grep='add getDiscount unit test'  | xargs -n1 git tag frontend-step-3
git log --pretty=format:"%h" --all --grep='ignore cy download'  | xargs -n1 git tag frontend-step-4
echo "To push the tags run: git push origin --tags -f"