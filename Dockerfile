# Step 1: Build the Angular app
FROM node:16 AS build-stage

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build --prod

# Step 2: Serve the Angular app with Nginx
FROM nginx:alpine

# Remove the default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the built Angular files into the Nginx server
COPY --from=build-stage /app/dist/HealthChecks /usr/share/nginx/html

# Expose port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
