import prisma from "../../../connection";

export default async function getWorkouts(req, res) {
  const { id } = req.query;
  const userWorkouts = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: {
      workouts: {
        include: {
          exercises: {
            include: {
              sets: true,
            },
          },
        },
      },
    },
  });
  res.json(userWorkouts);
}
