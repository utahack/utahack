#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os.path
import re
from urllib.parse import urljoin, urlparse
import json
from pathlib import Path

suffixs = {'.js', '.png', '.html', '.jpg', '.ico', '.json', '.css', '.gif'}
ignores = {'test', '.git', '.vscode', 'service_worker.js'}

def linkiter(html):
    for m in re.finditer(r'(href|src)="(.*?)"', html):
        url = urlparse(urljoin('https://entm.auone.jp', m.group(2)))
        ext = os.path.splitext(url.geturl())[1]
        yield url.geturl()


def allow(p):
    for ignore in ignores:
        if ignore in str(p):
            return False
    return p.suffix in suffixs

def main():
    template = Path('service_worker.tpl').read_text(encoding='utf-8')
    cacheURLs = {str(p).replace('\\', '/') for p in Path('.').glob('**/*.*') if allow(p)}
    cacheURLs.add('//www.googletagmanager.com/gtm.js?id=GTM-K25DZQH')
    path = Path('.')
    for p in path.glob('**/*.html'):
        html = p.read_text(encoding='utf-8')
        cacheURLs = cacheURLs or set(linkiter(html))

    template = template.replace('$cacheURLs', json.dumps(sorted(cacheURLs), indent=4))
    Path('service_worker.js').write_text(template, encoding='utf-8')


if __name__ == '__main__':
    main()




