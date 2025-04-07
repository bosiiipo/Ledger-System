FROM node:20.11.0-bullseye AS build
ARG DATABASE_URL
ARG PORT=9001
ARG SECRET
ARG NODE_ENV

ENV DATABASE_URL $DATABASE_URL
ENV PORT $PORT
ENV SECRET $SECRET
ENV NODE_ENV $NODE_ENV
# Set working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --loglevel verbose

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run compile

FROM node:alpine as main

COPY --from=build /usr/app /

# Expose port
EXPOSE 9001

# Start the app
CMD ["npm", "start"]
