import prisma from "../../../connection";

export default async function getWorkouts(req, res) {
  const { id } = req.query;
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
}
