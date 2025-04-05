export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userName, password, password2 } = req.body;

  if (!userName || !password || !password2) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password !== password2) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  return res.status(201).json({ message: "User registered successfully!" });
}
