#!/usr/bin/env bash

set -x

export SENV=$1

export USER=vagrant  # for vagrant
export PROJ_NAME=tz-chat
export PROJ_DIR=/vagrant
export NODE_ENV=development
export SRC_DIR=/vagrant/resources  # for vagrant

if [ "$SENV" = "aws" ]; then
	USER=ubuntu
	SRC_DIR=/home/ubuntu/tz-chat/resources
fi

export HOME_DIR=/home/$USER

sudo sh -c "echo '' >> $HOME_DIR/.bashrc"
sudo sh -c "echo 'export PATH=$PATH:.' >> $HOME_DIR/.bashrc"
sudo sh -c "echo 'export HOME_DIR='$HOME_DIR >> $HOME_DIR/.bashrc"
sudo sh -c "echo 'export SRC_DIR='$SRC_DIR >> $HOME_DIR/.bashrc"
sudo sh -c "echo 'export NODE_ENV=development >> $HOME_DIR/.bashrc"
sudo sh -c "echo 'export PORT=3000 >> $HOME_DIR/.bashrc"
source $HOME_DIR/.bashrc

sudo sh -c "echo '' >> /etc/hosts"
sudo sh -c "echo '127.0.0.1  www.topzone.biz' >> /etc/hosts"
sudo sh -c "echo '127.0.0.1  admin.topzone.biz' >> /etc/hosts"

sudo apt-get install software-properties-common -y
sudo add-apt-repository ppa:ondrej/php -y

sudo apt-get update

sudo apt-get install npm -y
sudo apt-get install git -y
sudo npm install bower -g

sudo locale-gen UTF-8

### [install nginx] ############################################################################################################
sudo apt-get install nginx -y --force-yes

sudo cp -rf $SRC_DIR/nginx/nginx.conf /etc/nginx/nginx.conf
# tz-chat
sudo rm -rf /etc/nginx/sites-available/default
sudo cp -Rf $SRC_DIR/nginx/default /etc/nginx/sites-available/default
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
# tz-chat-admin
sudo rm -rf /etc/nginx/sites-available/admin
sudo cp -Rf $SRC_DIR/nginx/admin /etc/nginx/sites-available/admin
sudo ln -s /etc/nginx/sites-available/admin /etc/nginx/sites-enabled/admin
# adminlte
sudo rm -rf /etc/nginx/sites-available/adminlte
sudo cp -Rf $SRC_DIR/nginx/adminlte /etc/nginx/sites-available/adminlte
sudo ln -s /etc/nginx/sites-available/adminlte /etc/nginx/sites-enabled/adminlte

if [ "$SENV" = "aws" ]; then
	sudo sed -i "s/\/vagrant\/web_apps/\/home\/ubuntu\/tz-chat\/web_apps/g" /etc/nginx/sites-available/default
	sudo sed -i "s/\/vagrant\/web_apps/\/home\/ubuntu\/tz-chat-admin\/web_apps/g" /etc/nginx/sites-available/admin
fi

# curl http://127.0.0.1:80
sudo service nginx stop

### [install mysql] ############################################################################################################
echo "mysql-server-5.6 mysql-server/root_password password passwd123" | sudo debconf-set-selections
echo "mysql-server-5.6 mysql-server/root_password_again password passwd123" | sudo debconf-set-selections
sudo apt-get install mysql-server-5.6 -y

if [ -f "/etc/mysql/my.cnf" ]
then
	sudo cp -rf $SRC_DIR/mysql/my.cnf /etc/mysql/my.cnf
#	sudo sed -i "s/bind-address/#bind-address/g" /etc/mysql/my.cnf
else
	sudo cp -rf $SRC_DIR/mysql/my.cnf /etc/mysql/mysql.conf.d/mysqld.cnf
#	sudo sed -i "s/bind-address/#bind-address/g" /etc/mysql/mysql.conf.d/mysqld.cnf
fi

sudo /etc/init.d/mysql restart  
sleep 10

sudo mysql -u root -ppasswd123 -e \
"use mysql; \
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'passwd123'; \
FLUSH PRIVILEGES; \
"
sudo mysql -u root -ppasswd123 -e \
"CREATE DATABASE tzchat; \
CREATE USER root@localhost; \
SET PASSWORD FOR root@localhost= PASSWORD('passwd123'); \
GRANT ALL PRIVILEGES ON tzchat.* TO root@localhost IDENTIFIED BY 'passwd123'; \
FLUSH PRIVILEGES; \
"

sudo mysql -u root -ppasswd123 < /vagrant/resources/mysql/load.sql

### [install php] ############################################################################################################
sudo apt-get install php7.0-fpm -y
sudo apt-get install php7.0-mysql -y
sudo apt-get install php-xdebug -y
sudo apt-get install php-curl -y
sudo service php7.0-fpm stop 
sudo cp -rf $SRC_DIR/php70/php.ini /etc/php/7.0/fpm/php.ini

### [install socket.io] ############################################################################################################
sudo ln -s /usr/bin/nodejs /usr/bin/node
#sudo chown -Rf ubuntu:ubuntu /home/ubuntu/.config
npm install

cd $PROJ_DIR
bower install
# for running in vagrant
cp -Rf bower_components web_apps

git clone https://github.com/doohee323/tz-socket.git
#sudo chown -Rf ubuntu:ubuntu $HOME_DIR/tmp
cd tz-socket
npm install

sudo npm install forever -g

### [open firewalls] ############################################################################################################
ufw allow "Nginx Full"
sudo iptables -I INPUT -p tcp --dport 21 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 22 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 443 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 3002 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 3306 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 9000 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 9005 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 8090 -j ACCEPT
sudo service iptables save
sudo service iptables restart

# install phpMyAdmin
sudo apt-get install phpmyadmin php-mbstring php-gettext -y
sudo service apache2 stop
sudo rm -rf /etc/nginx/sites-available/phpmyadmin.conf
sudo cp -Rf $SRC_DIR/nginx/phpmyadmin.conf /etc/nginx/sites-available/phpmyadmin.conf
sudo ln -s /etc/nginx/sites-available/phpmyadmin.conf /etc/nginx/sites-enabled/phpmyadmin.conf

# http://localhost:8090/index.php

### [start services] ############################################################################################################
sudo mkdir -p /tmp/uploads
sudo ln -s /tmp/uploads /vagrant/web_apps/uploads
sudo chown -Rf vagrant:vagrant /tmp/uploads

#mysql -h localhost -P 3306 -u root -p
sudo /etc/init.d/mysql restart  
sudo service php7.0-fpm restart
sudo service nginx start

#sudo chown -Rf ubuntu:ubuntu $HOME_DIR/.forever
cd $PROJ_DIR/tz-socket
sudo forever stop app.js
sudo forever start app.js

#curl http://192.168.82.110

# change to utc in mysql
#https://andromedarabbit.net/wp/mysql%EC%9D%98-%EC%8B%9C%EA%B0%84%EB%8C%80-%EB%B0%94%EA%BE%B8%EA%B8%B0/
#shell> mysql_tzinfo_to_sql /usr/share/zoneinfo | mysql -u root -p mysql

exit 0
