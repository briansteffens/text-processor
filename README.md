text-processor
==============

Web-based tools for processing text. Still pretty much in prototype form.
A live installation can be accessed at https://coldplace.net/text-processor/.


# Download

Make sure you have git (Debian/Ubuntu example below):

```bash
sudo apt-get install git
```

Clone the repository:

```bash
git clone https://github.com/briansteffens/text-processor
cd text-processor
```


# Development environment

Install Vagrant:

```bash
sudo apt-get install vagrant
```

Bring up the environment:

```bash
vagrant up
```

Now visit [http://localhost:8383/](http://localhost:8383) in a browser.


Installation
============
There's no formal installation process yet, so your mileage may vary. Below is
an example. It makes a number of assumptions, so most commands will need
modifications to suit your system.

Requirements include a web server (Apache/nginx), database server
(MariaDB/MySQL), PHP, PHP-CLI, and Mysqli.

Download:
```
git clone https://github.com/Tiltar/text-processor
cd text-processor
```

Create a database (MariaDB/MySQL console):
```
create database text_processor;

grant select,insert,delete on text_processor.scripts to
    'text_processor'@'localhost' identified by '<somepass>';
```

Create database tables:
```
mysql text_processor < schema.sql
```

Copy configuration template to /etc:
```
sudo cp etc/text-processor.conf /etc/text-processor.conf
```

Edit configuration file, changing any relevant settings:
```
nano /etc/text-processor.conf
```

Install scripts to database:
```
cd scripts
php install_scripts.php
cd ..
```

Install web interface (assuming httpd root is /var/www):
```
sudo ln -s src /var/www/text-processor
```

Assuming everything went right, the UI should be accessible through a URL like
http://localhost/text-processor/.
