const jwt = require("jsonwebtoken");



exports.MiddlewareCheckTokenHeader = (req, res, next) => {

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token: " + token);
  if (!token) {
    return res.status(401).send("not valid");
  }
  try {

    const userId = req.params.id;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userId != userId) {
        console.log('decoded.userId : '+ decoded.userId )
        console.log('userId : '+ userId )
      res.status(401).send("error message here");
      next();
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

exports.MiddlewareCheckTokenBody = (req, res, next) => {
    // Get the token from the request header
    const token = req.body.token;
    const userId = req.body.userId;
    console.log("token: " + token);
    if (!token) {
      return res.status(401).send("not valid");
    }
    try {
      // Verify the token and decode its payload
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.userId != userId) {
        console.log('decoded.userId : '+ decoded.userId )
        console.log('userId : '+ userId )
        res.status(401).send("error message here");
      }
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(400).json({ message: "Invalid token." });
    }
  };
  


