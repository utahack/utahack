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
        url = urlparse(urljoin(f'https://entm.auone.jp/', m.group(2)))
        ext = os.path.splitext(url.path)[1]
        if url.hostname == 'entm.auone.jp' and ext in suffixs:
            yield re.sub(r'.*entm.auone.jp/', '', url.geturl())


def allow(p):
    for ignore in ignores:
        if ignore in str(p):
            return False
    return p.suffix in suffixs

def main():
    template = Path('service_worker.tpl.js').read_text(encoding='utf-8')
    cacheURLs = {str(p).replace('\\', '/') for p in Path('.').glob('**/*.*') if allow(p)}
    path = Path('.')
    for p in path.glob('**/*.html'):
        html = p.read_text(encoding='utf-8')
        cacheURLs |= set(linkiter(html))

    template = template.replace('$cacheURLs', json.dumps(sorted(cacheURLs), indent=4))
    Path('service_worker.js').write_text(template, encoding='utf-8')


if __name__ == '__main__':
    main()




