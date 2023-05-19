import prisma from "../../connection";
export default async function addNew(req, res) {
  const createdExercise = await prisma.userExercise.create({
    data: {
      exerciseName: "exerc",
      exerciseMuscle: "abs",
      user: {
        connect: { id: 1 },
      },
    },
  });
  console.log(createdExercise);
}
