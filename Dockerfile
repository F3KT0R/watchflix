FROM node:18-alpine
WORKDIR /watchflix
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]