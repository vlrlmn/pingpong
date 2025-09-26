# ft_transcendence

`ft_transcendence` is a web-based application built as part of the 42 curriculum. It combines real-time features, user authentication, and interactive gameplay.


## Architecture
- **email_sender_service (ESS)**: sends email messages to users using templates  (announcements, otp codes and etc.).
- **user-management-service (UMS)**: handle and storage user data, provide an ability to sign in and sign up in the service in different ways.
- **frontendy (Frontend)**: give an ability to use service via UI.
- **radish (Cache)**: supportive key-value storage for all services.
- **db (Database)**: provides and keeps users data.

## How to Use
1. Clone repository :
```bash
git clone https://github.com/tmazitov/ft_transcendence.git
```

2. Create .env file in the root folder and fill it up following this structure :
```bash
# Domain
DOMAIN=localhost
SECURE=false

# ESS - Email sender service
ESS_PORT=5200
ESS_EMAIL=example@gmail.co
ESS_PASS=password # visit https://myaccount.google.com/apppasswords

# Radish - key-value storage for all services
RADISH_PORT=5100

#User management service
UMS_PORT=5000
JWT_SECRET=super_secure_secret_key
JWT_SALT=random_salt_string
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=90d
GOOGLE_CLIENT_ID=<client_id provided by Google>
GOOGLE_CLIENT_SECRET=<client_secret provided by Google>
GOOGLE_CALLBACK_URL=<callback url>

#Matchmaking and rating service
MMRS_PORT=5001

#Game service
GS_PORT=5002
POINTS_TO_WIN=10

#Frontendy
FR_PORT=3000
GOOGLE_OAUTH_REDIRECT_URI=http://localhost:3000/oauth-callback
```

3. Build service and run it :
```bash 
make build && make up
```

4. (Not necessary) For debugging use this command:
```bash
make up-logs
```

## License
This project is licensed under the MIT License.