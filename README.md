# Тестовое задание

## Описание веб приложения;

Веб-приложение представляющее собой веб-страницу с полем ввода для URL источника данных и кнопкой “Обновить данные”, 
при нажатии которой приложение получает, обрабатывает и отрисовывает данные в виде линейной диаграммы.

После первичной отрисовки приложение с периодичностью в одну минуту опрашивает источник данных,
чтобы проверить, не обновились ли данные и обновляет диаграмму. 

Если введен некорректный url выдает ошибку, при вводе одинаковых URL повторного запроса на сервер не происходит. 

## Список использованных технологий;

React - удобная работа с dom. 

Redux (thunk) - для хранения глобального стейта, thunk  для того, чтобы вынести асинхронные запросы из компонента.

create-react-app - удобно поднимать окружение.

server nodejs - в качестве сервера.

## Пошаговая инструкция по запуску;

Все команды выполняются в терминале, я использую  bash.

Создайте на своем компьютере папку и спомощью терминала перейдите в директорию.

Склонируйте репозиторий на свой компьютер выполнив команду.

git clone https://github.com/GRrock/Test-task.git

Запустите команду  npm install.

### Для запуска development mode;

Откройте  bash и перейдите в директорию.

cd ./test-task/server-nodejs

Запустите команду.

node server.js

Откройте второй  bash, перейдите в директорию.

cd ./test-task

Запустите команду.

npm start

Страница откроется автоматически, введите в текстовое поле данный url.

http://static.anychart.com/cdn/anydata/common/11.json

### Для запуска build;

Откройте  bash и перейдите в директорию.

cd ./test-task/server-nodejs

Запустите команду.

node server.js

Откройте второй  bash, перейдите в директорию.

cd ./test-task

Запустите команду.

npm run-script build

Запустите команду.

serve -s build  (если у вас не установлен пакет serve, запустите sudo npm install -g serve)

Откройте http://localhost:5000 введите в текстовое поли данный url.

http://static.anychart.com/cdn/anydata/common/11.json

## Server nodejs;

Сервер принимает GET запросы с параметром url после знака '?', после чего делает запрос на указанный url и JSON.
Пример запроса: http://localhost:7000?url=http://static.anychart.com/cdn/anydata/common/11.json

Формат JSON:

{
	...
	data: [

		{ x: string, value: number },

		{ x: string, value: number },

		{ x: string, value: number },

		... 
	]
	...
}

Перед отправкой запроса убедитесь, что JSON соответствуют указанному выше формату.
Иначе могут возникнуть непредвиденные ошибки.