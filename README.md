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
make
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


# Docker

Install Docker:

```bash
sudo apt-get install docker
```

Build the docker image:

```bash
docker build -t text-processor .
```

Run the container:

```bash
docker run -p 80:80 -d text-processor apache2ctl -D FOREGROUND
```
