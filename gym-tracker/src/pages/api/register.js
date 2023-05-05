import bcrypt from "bcrypt";
import prisma from "../../connection";

export default async function register(req, res) {
  const { emailRegister, passwordRegister } = req.body; // Downloading data from request

  try {
    // Hashing password
    const hashedPassword = await bcrypt.hash(passwordRegister, 10);

    // Check if user already exists
    const user = await prisma.user.findUnique({
      where: {
        email: emailRegister,
      },
    });

    if (user) {
      // User already exists
      res.status(409).json({ message: "User already exists" });
    } else {
      // Adding new user to database
      await prisma.user.create({
        data: {
          email: emailRegister,
          password: hashedPassword,
        },
      });

      res.status(201).json({ message: "User created successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
