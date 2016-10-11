#!/usr/bin/env bash

# roqkf123

export IP_ADDRESS=45.32.9.15

# on local pc
cd ../..
tar cvfz web_apps.zip web_apps
#ssh -i ~/.ssh/topzone_rsa root@$IP_ADDRESS
scp -i ~/.ssh/topzone_rsa web_apps.zip www-data@$IP_ADDRESS:/home/tz-chat
ssh -i ~/.ssh/topzone_rsa www-data@$IP_ADDRESS "rm -rf web_apps && tar xvf web_apps.zip && rm -Rf web_apps.zip"

exit 0

#[preparation!]##################################################################################################

# on centos server
groupadd www-data
useradd -g www-data -d /home/tz-chat -s /bin/bash -m www-data
echo "www-data:roqkf123" | chpasswd
nano /etc/sudoers 
%www-data        ALL=(ALL)	ALL

mkdir -p /home/tz-chat/.ssh
cp /root/.ssh/authorized_keys /home/tz-chat/.ssh
chmod 600 /home/tz-chat/.ssh/authorized_keys
chown -Rf www-data:www-data /home/tz-chat

scp -i ~/.ssh/topzone_rsa www-data@45.32.9.15:/etc/php-fpm.d/www.conf .
scp -i ~/.ssh/topzone_rsa www-data@45.32.9.15:/etc/nginx/nginx.conf .
scp -i ~/.ssh/topzone_rsa www-data@45.32.9.15:/etc/nginx/conf.d/tz-chat.conf .
#sudo vi /etc/php-fpm.d/www.conf

# open firewall
iptables -I INPUT 5 -i eth0 -p tcp --dport 80 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables --line -vnL
service iptables save

# start services 
service php-fpm restart
tail -f /var/log/nginx/error.log
tail -f /var/log/php-fpm/error.log
sudo nginx -s stop && sudo nginx
