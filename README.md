# inf_sys

*1) устанавливаем зависимости*

pip install -r requirements.txt

*2) переходим в проект*

cd monitoring_system

*3) стандартная миграция*

python manage.py migrate

*4) миграции моделей*

python manage.py makemigrations

python manage.py migrate

*5) положим data.json в корень проекта monitoring_system (рядом с manage.py)*

*6) загружаем данные в базу данных*

python manage.py loaddata data.json

*7) запускаем сервер*

python manage.py runserver


# ВХОД В АДМИН ПАНЕЛЬ

http://127.0.0.1:8000/admin/



