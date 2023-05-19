import prisma from "../../connection";
export default async function addUserExercise(req, res) {
  const { exerciseName, exerciseMuscle, id } = req.body;
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
}
