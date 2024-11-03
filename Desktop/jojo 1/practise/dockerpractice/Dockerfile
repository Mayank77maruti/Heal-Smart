# Use Node.js 18 as the base image to meet Next.js requirements
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy the remaining files to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port your Next.js app runs on (default is 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
