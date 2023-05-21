import prisma from "../../connection";
import { getToken } from "next-auth/jwt";
export default async function (req, res) {
  const token = await getToken({ req });
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    try {
      const results = await prisma.ExerciseList.findMany();
      res.json(results);
    } catch (err) {
      console.log(err);
    }
  }
}
