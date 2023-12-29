const app = require("./src/app");
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log('server is running ' + port));

process.on('SIGINT', () => {
    server.close(() => console.log(`Server is exit!`));
})