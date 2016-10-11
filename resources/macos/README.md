# Tz-Chat app

install Tz-Chat app on macbook

## install, nginx, php7.0, codeignite
```
	cd /tz-chat/resources/scripts
	bash macos.sh
```

## run servers
```
	# php
	brew services restart php70

	# nginx
	nginx -s stop; nginx
```

## cf. http://www.shako.net/blog/installing-lemp-stack-on-os-x-10-11/

## xdebug
```
	1) fail - nginx
	#brew uninstall homebrew/php/php55-xdebug
	https://xdebug.org/docs/install
	brew install php70-xdebug
	https://www.dionysopoulos.me/248-set-up-nginx-and-php-for-development-on-mac-os-x.html
	https://xdebug.org/wizard.php
	
	2) try - apache2
	
```

## phpAdmin
```
	http://localhost:8090/index.php
```
	
