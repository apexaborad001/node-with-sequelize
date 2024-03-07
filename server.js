const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

const db = require("./app/model");

db.sequelize.sync();
app.get("/", (req, res) => {
  res.json({ message: "Hii" });
});

require("./app/routes/user.route")(app);

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
