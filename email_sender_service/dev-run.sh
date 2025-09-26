export $(grep -v '^#' .env | xargs)

ts-node src/app.ts localhost $ESS_PORT ./templates.json $ESS_EMAIL $ESS_PASS 