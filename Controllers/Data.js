class DataController {
  constructor(client) {
    this.client = client;
  }

  getData(req, res) {
    console.log("Get all");
    this.client.query("SELECT * FROM bootcamp_students;", (err, results) => {
      if (err) {
        console.log(err);
      }
      // console.log(results);
      res.json(results.rows);
    });
  }

  getSingle(req, res) {
    console.log("Get 1!!");

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

  getSchedules(req, res) {
    console.log("Getting Schedules!!");
    this.client.query("SELECT * FROM schedule;", (err, results) => {
      if (err) {
        console.log(err);
      }
      // console.log(results);
      res.json(results.rows);
    });
  }

  async postSchedule(req, res) {
    const { name, start_date, end_date, iteration } = req.body;

    console.log(name, start_date, end_date, iteration);

    try {
      await this.client.query(
        `INSERT INTO schedule (name, start_date, end_date, iteration) VALUES ('${name}','${start_date}','${end_date}','${iteration}');`,
        (err, results) => {
          if (err) {
            console.log(err);
          }
          console.log(results);
          return "okay";
        }
      );

      let schedules = await this.client.query("SELECT * FROM schedule;");

      res.json(schedules);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = DataController;
