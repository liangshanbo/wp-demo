FROM  10.69.42.85:5000/h5/node:7
ENV PORT 3000
ENV NODE_ENV production

MAINTAINER shanbo "wanglonghai@gomeplus.com"

# Create
RUN mkdir -p /home/service/server
WORKDIR /home/service/server

# Bundle
COPY . /home/service/server

#EXPOSE 80

CMD pm2 start ./bin/www --no-daemon





