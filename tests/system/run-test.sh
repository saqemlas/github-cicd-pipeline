#!/usr/bin/env bash
set -Eeuxo pipefail

while :; do
  case "${1:-}" in
  --region)
    export AWS_REGION=${2}
    shift
    ;;
  --stage)
    export STAGE=${2}
    shift
    ;;
  *) break ;;
  esac
  shift
done

die() {
  echo "$*" 1>&2
  exit 1
}

[[ -z "${AWS_REGION-}" ]] && die "region name is required"
[[ -z "${STAGE-}" ]] && die "stage name is required"

SSM_CMD="aws ssm get-parameter --with-decryption --query Parameter.Value --output text --region $AWS_REGION"

export TABLE_NAME=$($SSM_CMD --name "/cicdPipeline/$STAGE/tableName")
export API_ENDPOINT=$($SSM_CMD --name "/cicdPipeline/$STAGE/apiEndpoint")

jest system.test.ts
