#!/usr/bin/env bash

# roqkf123

export IP_ADDRESS=

#cd ../..
#rm -rf web_apps.zip
#tar cvpzf web_apps.zip web_apps #--exclude=./node_modules --exclude=./logs 
#ssh -i ~/.ssh/tz-chat.pem ubuntu@$IP_ADDRESS
#scp -i ~/.ssh/tz-chat.pem web_apps.zip ubuntu@$IP_ADDRESS:/home/ubuntu/tz-chat
#ssh -i ~/.ssh/tz-chat.pem ubuntu@$IP_ADDRESS "cd tz-chat && rm -rf web_apps && tar xvf web_apps.zip && rm -Rf web_apps.zip"

ssh -i ~/.ssh/tz-chat.pem ubuntu@$IP_ADDRESS "cd tz-chat && git pull origin master && bower install && rm -rf web_apps/bower_components && mv bower_components web_apps"
ssh -i ~/.ssh/tz-chat.pem ubuntu@$IP_ADDRESS "cd tz-chat && git pull origin master && forever stop app.js ; forever start app.js"

rm -rf web_apps.zip 

exit 0

##################################################################
# Preparation!
##################################################################
# 1) ssh key
mkdir -p /home/tz-chat/.ssh
cp /root/.ssh/authorized_keys /home/tz-chat/.ssh
chmod 600 /home/tz-chat/.ssh/authorized_keys
chown -Rf www-data:www-data /home/tz-chat

# 1) add user
groupadd www-data
useradd -g www-data -d /home/tz-chat -s /bin/bash -m www-data
echo "www-data:roqkf123" | chpasswd

# 1) add previlege to www-data
nano /etc/sudoers 
%www-data        ALL=(ALL)	ALL

# 1) db migration
#scp -i ~/.ssh/tz-chat.pem www-data@$IP_ADDRESS:/home/dev/db.zip .

# 1) open firewal
iptables -I INPUT 5 -i eth0 -p tcp --dport 80 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables --line -vnL
service iptables save

# 1) run service 
#sudo vi /etc/php-fpm.d/www.conf
sudo service php7.0-fpm restart
sudo service nginx restart 

tail -f /var/log/nginx/error.log
tail -f /var/log/php-fpm/error.log

exit 0
