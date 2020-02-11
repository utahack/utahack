#!/usr/bin/env python
# -*- coding: utf-8 -*-

import re
from pathlib import Path

path = Path('.')

for p in path.glob('**/*.html'):
    text = p.read_text(encoding='utf-8')
    text = re.sub(r'(href|src)="([^\?\s">]*?)\?[^\?\s">]*?"', r'\1="\2"', text)
    text = re.sub(r'<li class="coupon_status_bg_list">[\s\S]*?</li>', '<li class="coupon_status_bg_list"></li>', text)
    p.write_text(text, encoding='utf-8')


