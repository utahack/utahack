setlocal

set tmp=chrometmp
rmdir /s /q %tmp%
mkdir %tmp%
start /wait chrome --user-data-dir=%tmp% https://utahack.github.io
timeout /t 3 /nobreak
rmdir /s /q %tmp%