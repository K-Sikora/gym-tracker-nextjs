import { getToken } from "next-auth/jwt";
import prisma from "../../connection";

export default async function (req, res) {
  const token = await getToken({ req });
  const { workoutTitle, userId, selectedExercise } = req.body;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    if (token.name === parseInt(userId)) {
      try {
        const workout = await prisma.workout.create({
          data: {
            name: workoutTitle,
            date: new Date(),
            user: {
              connect: { id: userId },
            },

            exercises: {
              create: selectedExercise.map((exercise) => ({
                name: exercise.selected.exercise_name,
                sets: {
                  create: exercise.sets.map((set) => ({
                    repetitions: parseInt(set.reps.value),
                    weight: parseFloat(set.weight.value),
                  })),
                },
              })),
            },
          },

          include: { exercises: { include: { sets: true } } },
        });

        console.log(`Added workout with id ${workout.id}:`);
        res.json(workout);
      } catch (error) {
        console.error(error);
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}
