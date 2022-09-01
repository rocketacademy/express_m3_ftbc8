const axios = require("axios");

class DataRouter {
  constructor(express, controller) {
    this.express = express;
    this.cache = [];
    this.controller = controller;
  }
  routes() {
    const router = this.express.Router();

    router.get("/", (req, res) => {
      res.send(this.cache);
    });

    router.get("/country/:name", async (req, res) => {
      const name = req.params.name;
      try {
        let data = await axios.get(
          `https://restcountries.com/v3.1/name/${name}`
        );
        console.log(data);
        res.json(data.data);
      } catch (e) {
        console.log(e);
      }
    });

    router.post("/", (req, res) => {
      console.log("POST");
      console.log(req.body);
      const command = req.body.command;
      this.cache.push(command);
      res.send(this.cache);
    });

    router.put("/:index", (req, res) => {
      const index = req.params.index;
      const command = req.body.command;
      this.cache[index] = command;
      res.send(this.cache);
    });

    router.get("/ftbc8", this.controller.getData.bind(this.controller));
    router.get("/ftbc8/:name", this.controller.getSingle.bind(this.controller));

    return router;
  }
}

module.exports = DataRouter;
