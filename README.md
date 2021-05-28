# kb2abot-cli
## Cài đặt
```shellscript
npm i kb2abot-cli -g
```
Nhớ cài kb2abot-cli global nhé các bạn!
##  Các câu lệnh
### 1. Lệnh tải kb2abot
```shellscript
kb2abot-cli clone
```
Lệnh này sẽ tự động tải kb2abot phiên bản mới nhất trên github về ~/kb2abot (https://github.com/kb2ateam/kb2abot)
### 2. Lệnh tạo plugin mới
```shellscript
kb2abot-cli create-plugin <tên plugin> [--clean]
```
<tên plugin>: Tên file của plugin<br>
--clean: Xóa hết comment hướng dẫn trong file đó
### 3. Lệnh tạo command mới
```shellscript
kb2abot-cli create-command <tên command> [--clean]
```
### 4. Lệnh đổi mới cấu trúc command
```shellscript
kb2abot-cli rebase <đường dẫn tới file command> [--clean]
```
Lệnh này sẽ comment hết code của file sau đó ghép cấu trúc mới vào (dành cho nhà phát triển)
<br><br>
*Các bạn có thể xem danh sách lệnh bằng cách gõ:*
```shellscript
kb2abot-cli help
```
