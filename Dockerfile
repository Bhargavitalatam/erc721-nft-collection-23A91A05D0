# Use official Node LTS
FROM node:22

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the project
COPY . .

# Compile contracts
RUN npx hardhat compile

# Default command
CMD ["npx", "hardhat", "test"]
