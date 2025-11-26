const db = require("../db");
const validateUrl = require("../middlewares/validateUrl");
const generateCode = require("../utils/generateCode");

exports.createLink = async (req, res) => {
  try {
    const { targetUrl, code } = req.body;

    if (!validateUrl(targetUrl)) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    let shortCode = code;
    const codeRegex = /^[A-Za-z0-9]{6,8}$/;

    if (shortCode) {
      if (!codeRegex.test(shortCode)) {
        return res.status(400).json({
          error: "Code must be 6-8 characters, letters or numbers only",
        });
      }
    } else {
      shortCode = generateCode();
    }

    const existing = await db.query(
      "SELECT * FROM links WHERE code = $1 AND deleted = false",
      [shortCode]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "Code already exists" });
    }

    await db.query(
      `INSERT INTO links (code, target_url)
       VALUES ($1, $2)`,
      [shortCode, targetUrl]
    );

    return res.status(201).json({
      code: shortCode,
      targetUrl,
      clicks: 0,
      lastClicked: null,
    });
  } catch (error) {
    console.error("Error creating link:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllLinks = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT code, target_url AS "targetUrl", clicks, last_clicked AS "lastClicked", created_at AS "createdAt"
       FROM links
       WHERE deleted = false
       ORDER BY created_at DESC`
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching links:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getLinkStats = async (req, res) => {
  try {
    const { code } = req.params;

    const result = await db.query(
      `SELECT code, target_url AS "targetUrl", clicks, last_clicked AS "lastClicked", created_at AS "createdAt"
       FROM links
       WHERE code = $1 AND deleted = false`,
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Link not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching link:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteLink = async (req, res) => {
  try {
    const { code } = req.params;

    const result = await db.query(
      `UPDATE links SET deleted = true WHERE code = $1 AND deleted = false RETURNING *`,
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Link not found" });
    }

    res.status(200).json({ message: "Link deleted successfully" });
  } catch (error) {
    console.error("Error deleting link:", error);
    res.status(500).json({ error: "Server error" });
  }
};
