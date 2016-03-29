web_packages:
  pkg.installed:
    - pkgs:
      - libapache2-mod-php5

web_content:
  file.symlink:
    - name: /var/www/html
    - target: /vagrant/src
    - force: True

web_php_error_reporting:
  file.line:
    - name: /etc/php5/apache2/php.ini
    - match: error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT
    - content: error_reporting = E_ALL
    - mode: replace

web_php_display_errors:
  file.line:
    - name: /etc/php5/apache2/php.ini
    - match: display_errors = Off
    - content: display_errors = On
    - mode: replace

web_service_restart:
  service.running:
    - name: apache2
    - reload: True
    - watch:
      - file: web_php_error_reporting
      - file: web_php_display_errors
