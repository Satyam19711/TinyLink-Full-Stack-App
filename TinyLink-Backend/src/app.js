const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();
const linkRoutes = require("./routes/link.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/healthz", (req, res) => {
  res.status(200).json({
    ok: true,
    version: "1.0",
  });
});

app.use("/api/links", linkRoutes);

app.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    const result = await db.query(
      `SELECT target_url, deleted FROM links WHERE code = $1`,
      [code]
    );

    if (result.rows.length === 0 || result.rows[0].deleted === true) {
      return res.status(404).sendFile("404.html", { root: "./src/pages" });
    }

    const targetUrl = result.rows[0].target_url;

    await db.query(
      `UPDATE links
       SET clicks = clicks + 1, last_clicked = NOW()
       WHERE code = $1`,
      [code]
    );

    return res.redirect(302, targetUrl);
  } catch (error) {
    console.error("Redirect error:", error);
    res.status(500).send("Server error");
  }
});
module.exports = app;
