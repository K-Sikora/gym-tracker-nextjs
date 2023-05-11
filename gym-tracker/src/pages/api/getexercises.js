import prisma from "../../connection";

export default async function (req, res) {
  try {
    const results = await prisma.ExerciseList.findMany();
    res.json(results);
  } catch (err) {
    console.log(err);
  }
}
