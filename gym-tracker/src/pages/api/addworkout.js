import prisma from "../../connection";

export default async function (req, res) {
  const { workoutTitle, userId, selectedExercise } = req.body;
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
            name: exercise.selected.name,
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
    console.log(workout);
  } catch (error) {
    console.error(error);
  }
}
