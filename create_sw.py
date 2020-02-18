#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
from pathlib import Path

suffixs = {'.js', '.png', '.html', '.jpg', '.ico', '.json', '.css', '.gif'}
ignores = {'test', '.git', '.vscode', 'service_worker.js'}

def allow(p):
    for ignore in ignores:
        if ignore in str(p):
            return False
    return p.suffix in suffixs

template = Path('service_worker.tpl').read_text(encoding='utf-8')
cacheURLs = [str(p).replace('\\', '/') for p in Path('.').glob('**/*.*') if allow(p)]

template = template.replace('$cacheURLs', json.dumps(cacheURLs, indent=4))

Path('service_worker.js').write_text(template, encoding='utf-8')
