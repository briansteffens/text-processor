Vagrant.configure(2) do |config|
  config.vm.box = "bento/debian-8.2"
  config.vm.network "forwarded_port", guest: 80, host: 8383

  config.vm.synced_folder "salt/roots/", "/srv/salt/"
  config.vm.provision :salt do |salt|
    salt.verbose = true
    salt.colorize = true
    salt.masterless = true
    salt.minion_config = "salt/minion"
    salt.run_highstate = true
  end
end
