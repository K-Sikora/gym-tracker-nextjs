import { getToken } from "next-auth/jwt";
import prisma from "../../../connection";
export default async function getWorkouts(req, res) {
  const token = await getToken({ req });
  const { id } = req.query;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    if (token.name === parseInt(id)) {
      const userWorkouts = await prisma.workout.findMany({
        where: {
          userId: parseInt(id),
        },
        include: {
          exercises: {
            include: {
              sets: true,
            },
          },
        },
      });
      res.json(userWorkouts.reverse());
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}
