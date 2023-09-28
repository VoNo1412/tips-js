const app = require("./src/app");
const server = app.listen(1412, () => console.log('server is running'));

process.on('SIGINT', () => {
    server.close(() => console.log(`Server is exit!`));
})