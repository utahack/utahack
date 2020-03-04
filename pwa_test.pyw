import subprocess
import tempfile
import time

URL = 'https://utahack.github.io'

with tempfile.TemporaryDirectory() as td:
    subprocess.call(['chrome', f'--user-data-dir={td}', URL])
    time.sleep(10)
