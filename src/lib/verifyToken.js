import jwt from "jsonwebtoken";

export function verifyToken(handler) {
  return async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access token required" });
    }

    try {
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
      req.user = decoded;
      return handler(req, res);
    } catch (err) {
      console.error("Error in verifyToken:", err.message);

      return res.status(403).json({ message: "Invalid token" });
    }
  };
}
