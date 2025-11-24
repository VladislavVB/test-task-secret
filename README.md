## Node version

```sh
node: v22.10.0
```

## Project Setup

```sh
npm install
```

### For: development

```sh
npm run dev
```

## For: build widget

```sh
npm run build:widget
```

en: After building the build widget for local testing, create an HTML file in the !!!!!!'./dist-widget/weather.html' directory and add the contents. To run index.html, use the Life Server extension.

ru: После сборки build widget для локального теста созадать в директории !!!!!!'./dist-widget/weather.html' html файл и доабвить содержимое. Чтобы запустить index.html используй расширение Life Server

content/содержимое

```sh
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TOP WIDGET</title>

    <link href="./style.css" rel="stylesheet" />
  </head>
  <body>
    <h1>START</h1>
    <weather-widget />
    <script src="weather-widget.umd.js"></script>
  </body>
</html>

```
