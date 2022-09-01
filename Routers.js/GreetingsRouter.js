class GreetingsRouter {
  constructor(express) {
    this.express = express;
  }
  routes() {
    const router = this.express.Router();

    router.get("/", (request, response) => {
      console.log(request.method);
      response.send("Hello FTBC8");
    });

    router.get("/secret", (req, res) => {
      res.send(process.env.DB_NAME);
    });

    router.get("/hello/:name", (req, res) => {
      const name = req.params.name;
      res.send(`Hello ${name}`);
    });

    return router;
  }
}

module.exports = GreetingsRouter;
