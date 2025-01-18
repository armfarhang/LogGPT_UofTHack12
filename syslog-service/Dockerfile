# Use an official Node.js image as the base image
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy the application files
COPY . .

# Install dependencies
RUN npm install express

# Expose port 80 to the outside world
EXPOSE 80

# Start the Node.js server when the container launches
CMD ["node", "server.js"]
