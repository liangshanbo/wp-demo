FROM  10.69.42.85:5000/h5/tengine

MAINTAINER shanbo "wanglonghai@gomeplus.com"

# Create
RUN mkdir -p /home/service/www/public
RUN chmod -R 777 /home/service/www/public
WORKDIR /home/service/www/public

# Bundle
COPY . /home/service/www/public

#nginx
RUN rm -f /usr/local/nginx/conf/nginx.conf

COPY nginx.conf /usr/local/nginx/conf/nginx.conf

#RUN mkdir -p /etc/nginx/log

#EXPOSE 8000

CMD /usr/local/nginx/sbin/nginx -g 'daemon off;'




