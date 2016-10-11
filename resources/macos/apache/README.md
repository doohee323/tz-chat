sudo vi /etc/apache2/httpd.conf
LoadModule vhost_alias_module libexec/apache2/mod_vhost_alias.so
Include /private/etc/apache2/extra/httpd-vhosts.conf

atom /etc/apache2/extra/httpd-vhosts.conf
<VirtualHost *:8080>
    ServerAdmin webmaster@localhost.com
    DocumentRoot "/usr/local/var/tz-chat"
    ServerName localhost
    ErrorLog "/private/var/log/apache2/localhost.com-error_log"
    CustomLog "/private/var/log/apache2/localhost.com-access_log" common
</VirtualHost>

vi /usr/local/var/tz-chat/.htaccess
Require all granted

xcode-select --install
brew update
brew prune
brew cleanup
brew tap homebrew/dupes
brew tap homebrew/versions
brew tap homebrew/homebrew-php

brew install php70
brew link libpng freetype jpeg unixodbc pcre
brew install php70-opcache
brew install php70-apcu
brew install --HEAD homebrew/php/php70-yaml

brew install php70-xdebug

brew services restart php70
sudo apachectl restart
