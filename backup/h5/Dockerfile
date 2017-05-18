FROM  10.69.42.85:5000/h5/tengine

MAINTAINER shanbo "wanglonghai@gomeplus.com"

# Create
RUN mkdir -p /home/service/www/m
WORKDIR /home/service/www/m

# Bundle
COPY . /home/service/www/m
	
#nginx
RUN rm -f /usr/local/nginx/conf/nginx.conf

COPY nginx.conf /usr/local/nginx/conf/nginx.conf

RUN mkdir -p /etc/nginx/log

#EXPOSE 8000

CMD /usr/local/nginx/sbin/nginx -g 'daemon off;'





