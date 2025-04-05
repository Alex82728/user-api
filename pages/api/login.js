export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  // Simulate a JWT payload
  const payload = {
    userName,
    role: "user",
    iat: Math.floor(Date.now() / 1000),
  };

  // Create a fake token (header.payload.signature)
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const token = `header.${base64Payload}.signature`;

  return res.status(200).json({ token });
}
