import prisma from "../../../connection";
export default async function getUserExercises(req, res) {
  const { id } = req.query;

  const userExercises = await prisma.userExercise.findMany({
    where: {
      userId: parseInt(id),
    },
  });
  res.json(userExercises);
}
