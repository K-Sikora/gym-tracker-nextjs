import prisma from "../../connection";
import { getToken } from "next-auth/jwt";
export default async function addUserExercise(req, res) {
  const token = await getToken({ req });
  const { exerciseName, exerciseMuscle, id } = req.body;
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    if (token.name === parseInt(id)) {
      try {
        const createdExercise = await prisma.userExercise.create({
          data: {
            exercise_name: exerciseName,
            muscle_group: exerciseMuscle.name,
            user: {
              connect: { id: id },
            },
          },
        });
        res.json(createdExercise);
      } catch (err) {
        console.log(err);
        if (err.code === "P2002")
          res.status(400).json({ error: "Exercise already exists" });
      }
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  }
}
