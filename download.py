#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os.path
import re
from urllib.parse import urljoin, urlparse
from pathlib import Path
import requests

exts = {'.js', '.css', '.png', '.jpg', '.gif', '.ico', '.svg'}


def linkiter(path):
    html = path.read_text(encoding='utf-8')
    for m in re.finditer(r'(href|src)="(.*?)"', html):
        url = urlparse(urljoin(f'https://entm.auone.jp/', m.group(2)))
        ext = os.path.splitext(url.path)[1]
        if url.hostname == 'entm.auone.jp' and ext in exts:
            yield url
        #yield re.sub(rf'.*{url.netloc}/', '', url.geturl())


def download(path):
    print(path)
    for url in linkiter(path):
        p = Path('.' + url.path)
        if p.exists():
            print('exists: ', url.path)
            continue
        r = requests.get(url.geturl())
        if not r.ok:
            print('error: ', url.geturl())
            continue
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_bytes(r.content)
        print('download: ', url.geturl())


def main():
    path = Path('.')
    for p in path.glob('**/*.html'):
        download(p)


if __name__ == '__main__':
    main()
