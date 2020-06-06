const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;

const items = require("./routes/api/items");

const app = express();

// Body parser middleware
app.use(express.json());

//DB config
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/api/items", items);

// Serve static assets if we are in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port: ${port}`));
