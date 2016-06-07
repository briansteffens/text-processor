#!/usr/bin/env python3

from glob import glob

scripts = []

for script in glob('srv/scripts/*.js'):
    script = script.replace('srv/', '')
    scripts.append('<script src="{}"></script>'.format(script))

scripts = '\n    '.join(scripts)

with open('src/index.template.html') as f:
    template = f.read()

output = template.replace('{{ scripts }}', scripts)

with open('srv/index.html', 'w') as f:
    f.write(output)
