function generateCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const length = Math.floor(Math.random() * 3) + 6;
  let code = "";

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * characters.length);

    code += characters[index];
  }

  return code;
}

module.exports = generateCode;
