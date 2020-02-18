#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os.path
import re
from urllib.parse import urljoin, urlparse
from pathlib import Path
import requests

exts = {'.js', '.css', '.png', '.jpg', '.gif', '.ico', '.svg'}


def linkiter(html):
    for m in re.finditer(r'(href|src)="(.*?)"', html):
        url = urlparse(urljoin('https://entm.auone.jp', m.group(2)))
        ext = os.path.splitext(url.geturl())[1]
        if url.hostname == 'entm.auone.jp' and ext in exts:
            yield url


def download(html):
    for url in linkiter(html):
        p = Path(url.path)
        if p.exists:
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
        html = p.read_text(encoding='utf-8')
        download(html)


if __name__ == '__main__':
    main()
