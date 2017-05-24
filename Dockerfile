FROM node:6.10.2

# Set environment variables


# Create and copy app directory
RUN mkdir -p /app
WORKDIR /app
COPY ./dist /app/dist
COPY _package.json /app/package.json
COPY server.js /app/

# Install app dependencies
RUN npm i

EXPOSE 3000
CMD [ "npm", "start" ]