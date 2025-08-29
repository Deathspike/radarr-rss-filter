FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY public/ public/
COPY src/ src/
RUN npm ci --production
CMD ["node", "bin/cli.js"]
