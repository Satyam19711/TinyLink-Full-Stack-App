const { parse } = require("dotenv");

function validateUrl(url) {
  try {
    const parsed = new URL(url);

    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (error) {
    return false;
  }
}

module.exports = validateUrl;
