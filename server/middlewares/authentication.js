import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';

const authentication = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Token not found");
  }

  const secret_key = process.env.Secret_Key;

  try {
    const data = jwt.verify(token, secret_key);
    req.user = data.username; 

    const decoded = jwtDecode(token);
    const userId = decoded.id;
    req.userId = userId;
    next();
  } catch (error) {
    console.log("Token verification error:", error.message); 
    return res.status(401).send("Invalid token");
  }
};

export default authentication;
