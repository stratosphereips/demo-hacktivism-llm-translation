# Stage 1: Build the React app with a smaller base
FROM node:16-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy only the package files for dependency installation
COPY package.json package-lock.json ./

# Install only production dependencies to minimize the image size
RUN npm install --only=production

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Clean up node_modules to remove any unnecessary files after the build
RUN rm -rf node_modules

# Stage 2: Use a minimal Nginx base image to serve the app
FROM nginx:alpine

# Copy the built React app from the build stage to Nginx's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration if needed
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port for the container
EXPOSE 80

# Start Nginx server in the foreground
CMD ["nginx", "-g", "daemon off;"]

