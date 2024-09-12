const http = require("http")
const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const { expressMiddleware } = require("@apollo/server/express4")
const buildGraphqlServer = require("./graphql")
const mongo = require("./config/mongo")

const app = express()
const httpServer = http.createServer(app)

const PORT = process.env.PORT
app.use(express.json())

mongo()
      .then(() => {console.log("DB connected")})
      .catch(err => console.log(err))

let serverStart = async ()=> {
    let server = buildGraphqlServer(httpServer)
    await server.start()
    app.use(expressMiddleware(server))
}

serverStart()

httpServer.listen(PORT, () => {
    console.log(`The server is running ${PORT}`);
})