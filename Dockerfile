FROM ubuntu
RUN apt-get update
RUN apt-get -y dist-upgrade
RUN apt-get -y install libapache2-mod-php5
RUN rm /var/www/html/index.html
ADD src /var/www/html
