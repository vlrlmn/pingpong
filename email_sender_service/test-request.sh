if [ -z "$EMAIL" ]; then
    echo "Error: EMAIL environment variable is not set."
    exit 1
fi

curl -X POST http://localhost:5000/ess/api/rest/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "email": "'"$EMAIL"'",
    "template": "otp",
    "data" : {
        "first_name" : "John",
        "last_name" : "Snow"
    }
  }'