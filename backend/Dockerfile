# Use an official Node.js LTS (Long Term Support) image as the base image
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port on which your Node.js application will listen
EXPOSE 4000

# Specify the command to run your application
CMD [ "node", "dist/server.js" ]
