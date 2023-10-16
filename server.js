require('dotenv').config()

const http = require('http'),
    app = require('./app'),
    port = process.env.PORT;

http.createServer(app);

app.listen(port, () => {
    console.log(`server running on localhost:${port}`)
})