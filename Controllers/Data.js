class DataController {
  constructor(client) {
    this.client = client;
  }

  getData(req, res) {
    console.log("New route!!");
    this.client.query("SELECT * FROM bootcamp_students;", (err, results) => {
      if (err) {
        console.log(err);
      }
      // console.log(results);
      res.json(results.rows);
    });
  }

  getSingle(req, res) {
    console.log("New route!!");
    const name = req.params.name;
    console.log(name);
    this.client.query(
      `SELECT * FROM bootcamp_students WHERE name = '${name}';`,
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results);
        res.json(results.rows);
      }
    );
  }
}

module.exports = DataController;
