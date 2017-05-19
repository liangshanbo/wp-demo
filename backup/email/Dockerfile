FROM  10.69.42.85:5000/h5/node:7

MAINTAINER shanbo "wanglonghai@gomeplus.com"

# Create
RUN mkdir -p /home/service/server
WORKDIR /home/service/server

# Bundle
COPY . /home/service/server

#EXPOSE 80
RUN npm install

CMD pm2 start app.js --no-daemon





