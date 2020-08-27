const fetch = require("node-fetch");

module.exports = async (req, res, next) => {
  const { captcha } = req.body;
  const secretKey = process.env.RECAPTCHA_SECRET;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;
  
  console.log("...Verifyning reCaptcha");
  console.table([{ publicKey: captcha }], ["publicKey"]);
  console.table([{ secretKey }], ["secretKey"]);
  
  if (!captcha) {
    return res.status(400).json({ errors: { msg: "Clé publique reCaptcha manquante ou invalide" } });
  }

  try {
    const verified = await fetch(verifyUrl, { method: "POST" });
    const response = await verified.json();

    console.table([response]);
    // Score déterminé arbitrairement, à discuter
    if(!response.success || response.score < .3) return res.status(429).json(response);

    res.json(response);
    // next();

  } catch (error) {
    next(error);
  }
};