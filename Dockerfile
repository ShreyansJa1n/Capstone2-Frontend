FROM node:14.18
RUN mkdir -p /home/app
COPY . /home/app/frontend
WORKDIR /home/app/frontend
EXPOSE 3000
RUN npm init -y
RUN npm install
CMD ["npm","start"]
