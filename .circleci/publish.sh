#!/bin/bash -eu

main() {
  local -r package_name=$(cat < ./package.json | jq .name -r)
  local -r version=$(cat < ./package.json | jq .version -r)
  locak -r latest_version=$(npm v "${package_name}" version 2>/dev/null || exit 0)

  if [[ "${latest_version}" = "$version" ]]; then
    echo "${version} exists. It was skip publishing."
  else
    npm publish
    TAG=v${NEW_VERSION}
    git tag "${TAG}"
    git push origin "${TAG}"
  fi

}
