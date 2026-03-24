FROM node:22

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn add nuqs
RUN npx shadcn@latest add sonner

EXPOSE 3000

CMD ["sh", "-c", "yarn build && yarn start"]