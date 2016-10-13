# Tz-Chat app

install Tz-Chat app on vagrant

## requirement in your pc
```	
	install vagrant
	vagrant box add trusty https://oss-binaries.phusionpassenger.com/vagrant/boxes/latest/ubuntu-14.04-amd64-vbox.box
	
	vi /etc/hosts
	192.168.82.110     www.topzone.biz
	192.168.82.110     admin.topzone.biz
	
```

## run vagrant
```
	cd ~/tz-chat
	vagrant destroy -f && vagrant up
```

## test webpage
```
	- chat site: http://www.topzone.biz
	- admin site: http://admin.topzone.biz
```

## restart services
```
	cd /vagrant/tz-chat
	vagrant ssh    # root/vagrant
	sudo /etc/init.d/mysql restart  
	#mysql -h localhost -P 3306 -u root -p
	
	sudo service php7.0-fpm restart
	sudo service nginx restart
	
	cd /vagrant/tz-socket
	sudo forever stop app.js
	sudo forever start app.js
	
	sudo tail -f /var/log/php7.0-fpm.log
	sudo tail -f /var/log/nginx/error.log
```

## Xdebug on eclipse configration
```
	PHP Web Application
	  tz-chat
	    PHP Server: tz-chat
	    File: /tz-chat/web_apps/index.php
	    
	PHP Server: tz-chat
	  Server Name: tz-chat
	  Base URL: http://www.topzone.biz
	  Document Root: /Users/mac/Documents/workspace/php/tz-chat/web_apps  (your doc root)
	  Debugger: XDebug
	  Port: 9000
	
	Debugger
	  Break at Firt List uncheck
```

## using AWS ec2 ( Development server )
```
	# first, copy tz-chat.pem to ~/.ssh
	cd ~/.ssh
	~/.ssh> chmod 600 tz-chat.pem
	~/.ssh> ssh-add tz-chat.pem
	~/.ssh> ssh -i tz-chat.pem ubuntu@xxx.xxx.xxx.xxx
	
	# build tz-chat
	sudo apt-get install git -y
	git config --global credential.helper cache
	git clone https://github.com/doohee323/tz-chat.git
	cd ~/tz-chat/scripts
	bash tz-chat.sh aws
	
	http://xxx.xxx.xxx.xxx
```

## Access to DB in AWS
```
	port: 3306
	id/passwd: root / passwd123
```

