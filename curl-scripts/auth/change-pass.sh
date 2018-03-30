curl "http://tic-tac-toe.wdibos.com/change-password/2632" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "passwords": {
      "old":  "'"${OLD}"'",
      "new":  "'"${NEW}"'"
    }
  }'

echo
