# notes

Notes app with possibility to set font, color, background color and text alignment.

Backend uses mongodb database with port 27018. You shouldn't have mongodb installed on your system if you have docker. Docker-compose.yaml file is included with back-end.

In order to start back-end you should run the following commands:
```
cd "express app"
docker-compose up -d
npm install
npm start

```
To start front-end:
```
cd "react app"
npm install
npm start
```
## Notes list

![Notes list](https://user-images.githubusercontent.com/95356840/144575182-58f0d99d-a2d3-4f93-9bb9-84956afda120.png)

## Note view

![Note view](https://user-images.githubusercontent.com/95356840/144575245-95b5c84d-1ade-4ae9-bedc-4e4d8dabd90c.png)

## Note edit

![Note edit](https://user-images.githubusercontent.com/95356840/144575273-8d3aa815-2403-4dcb-98ee-4c346d10818a.png)

## Note with custom formatting

![Note with custom formatting](https://user-images.githubusercontent.com/95356840/144575400-f4917983-99e5-43a1-997d-67dad0da15b7.png)
