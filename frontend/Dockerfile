# Use the latest LTS version of Node.js
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of your application files
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Start the React app
CMD ["yarn", "start"]
