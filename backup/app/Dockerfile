FROM  10.69.42.85:5000/h5/tengine

MAINTAINER shanbo "wanglonghai@gomeplus.com"

# Create
RUN mkdir -p /home/service/www/h5
WORKDIR /home/service/www/h5

# Bundle
COPY . /home/service/www/h5
	
#nginx
RUN rm -f /usr/local/nginx/conf/nginx.conf

COPY nginx.conf /usr/local/nginx/conf/nginx.conf

#EXPOSE 8000

CMD /usr/local/nginx/sbin/nginx -g 'daemon off;'





