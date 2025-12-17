# Use a Node base image
FROM node:18

# Install Rust and Foundry
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
RUN cargo install foundry-cli

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install Node dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# We can run a script that runs both test suites, or let the user specify
# Let's run both by default
CMD [ "sh", "-c", "npx hardhat test && forge test" ]
