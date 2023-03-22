FROM node:17-alpine
WORKDIR /app/client-app
COPY package.json .
RUN npm install
COPY . .
RUN chmod 777 /app/client-app/node_modules
# RUN chown -R node:node /app/client-app/node_modules/.vite
USER node
EXPOSE 3000
CMD ["npm", "run", "dev"]
