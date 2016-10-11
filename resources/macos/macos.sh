#!/usr/bin/env bash

cd ../..
export SRC_DIR=`pwd`

# install brew
#ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew doctor
brew update
brew prune 
#brew upgrade
brew install nginx

# vi /usr/local/etc/nginx/nginx.conf
sudo nginx -s stop

mkdir -p /usr/local/etc/nginx/sites-enabled
mkdir -p /usr/local/etc/nginx/sites-available
mkdir -p /usr/local/etc/nginx/log

cp -f /usr/local/etc/nginx/nginx.conf /usr/local/etc/nginx/nginx.conf_bak
cp -f $SRC_DIR/resources/nginx/nginx.conf /usr/local/etc/nginx/nginx.conf
cp -f $SRC_DIR/resources/nginx/tz-chat.conf /usr/local/etc/nginx/sites-available/tz-chat.conf
cp -f $SRC_DIR/resources/nginx/phpmyadmin.conf /usr/local/etc/nginx/sites-available/phpmyadmin.conf

ln -s /usr/local/etc/nginx/sites-available/tz-chat.conf /usr/local/etc/nginx/sites-enabled/tz-chat.conf
ln -s /usr/local/etc/nginx/sites-available/phpmyadmin.conf /usr/local/etc/nginx/sites-enabled/phpmyadmin.conf

sudo nginx -s stop; nginx
 
# install php 
brew tap homebrew/dupes
brew tap homebrew/versions
brew tap homebrew/homebrew-php
brew install php70
brew link libpng freetype jpeg unixodbc pcre
brew install php70-xdebug
cp -f $SRC_DIR/resources/php70/ext-xdebug.ini /usr/local/etc/php/7.0/conf.d/ext-xdebug.ini
cp -f $SRC_DIR/resources/php70/www.conf /usr/local/etc/php/7.0/php-fpm.d/www.conf
brew services restart php70

#mkdir -p ~/Library/LaunchAgents
#ln -sfv /usr/local/opt/php70/homebrew.mxcl.php70.plist ~/Library/LaunchAgents
#launchctl unload -w ~/Library/LaunchAgents/homebrew.mxcl.php70.plist
#launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.php70.plist
# vi /usr/local/etc/php/7.0/php.ini
# error_log = /usr/local/etc/nginx/log/php_errors.log
# http://localhost:8080/info.html

# install phpMyAdmin
brew install autoconf
brew install phpmyadmin
# http://localhost:8090/index.php
# id/passwd == mysql's

# download CodeIgniter
#wget https://github.com/bcit-ci/CodeIgniter/archive/3.1.0.zip
#unzip 3.1.0.zip -d .
#if [ -f "web_apps" ]; then
#	cp -rf CodeIgniter-3.1.0/* web_apps
#else
#	mv CodeIgniter-3.1.0 web_apps
#fi
#rm -rf 3.1.0.zip

# link with source to nginx's root
rm -Rf /usr/local/var/tz-chat
ln -s $SRC_DIR/web_apps /usr/local/var/tz-chat

exit 0
