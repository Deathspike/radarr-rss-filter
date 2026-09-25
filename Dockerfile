FROM node:24-alpine
WORKDIR /app
COPY bin/ bin/
COPY package.json package-lock.json ./
COPY public/ public/
COPY src/ src/
RUN npm ci --production
CMD ["node", "bin/cli.js"]
