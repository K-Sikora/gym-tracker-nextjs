import { getToken } from "next-auth/jwt";
import prisma from "../../../connection";
export default async function getUserExercises(req, res) {
  const token = await getToken({ req });
  const { id } = req.query;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    if (token.name === parseInt(id)) {
      const userExercises = await prisma.userExercise.findMany({
        where: {
          userId: parseInt(id),
        },
      });
      res.json(userExercises);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}
