import jwt from "jsonwebtoken";

export function createToken(Trainees) {
  const token = jwt.sign(
    {
      id: Trainees.id,
    },
    "1234",
    { expiresIn: "1h" }
  );
  return token;
}

export function TokenDecoding(token) {
  const decoded = jwt.verify(token, "1234");
  return decoded.id;
}


export const auth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(403).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; 
    const decoded = jwt.verify(token, "1234");

    if (typeof decoded === "string") {
      throw new Error("Invalid token");
    }

    req.user = decoded;
    next();

  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};