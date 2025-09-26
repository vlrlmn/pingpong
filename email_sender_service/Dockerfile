# Use the official Node.js image as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Set environment variables
ARG ESS_PORT
ARG ESS_PASS
ARG ESS_EMAIL

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
# RUN apk add --no-cache sqlite sqlite-libs bash
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE ${ESS_PORT}

# Command to run the application
CMD ["sh", "./docker-run.sh"]