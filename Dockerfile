FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx hardhat compile
# This ensures tests run automatically on "docker run"
CMD ["npx", "hardhat", "test"]
