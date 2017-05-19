FROM  10.69.42.85:5000/h5/node:7

ENV PORT 10002
ENV NODE_ENV pre

MAINTAINER shanbo "wanglonghai@gomeplus.com"

# Create
RUN mkdir -p /home/service/appserver
WORKDIR /home/service/appserver

# Bundle
COPY . /home/service/appserver

#EXPOSE 80

CMD pm2 start ./bin/www --no-daemon





