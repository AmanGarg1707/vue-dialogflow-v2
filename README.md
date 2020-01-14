# vue-dialogflow-v2

A dialogflow frontend developed in [vuejs](https://vuejs.org) [CLI 4](https://cli.vuejs.org/).

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

Vue configuration can be edited in **_vue.config.js_**.
See [Configuration Reference](https://cli.vuejs.org/config/).

### Deployment

First run the node server by executing **npm run start** from **chat/** folder.

Then run the build command from the root directory. After running the build command, all the code for deployment will be stored in the chatbot folder - **chatbot**.

Just place the **chatbot** folder in the root of your server and deploy. Path will be - **_www.yourdomain.com_/chatbot/index.html**

### Note

Please make the changes to **config.js** file as required. And also generate a service account key for your dialogflow agent and paste it in **agent1707.json** file.

[Screenshots](sample.png)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
