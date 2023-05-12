import prisma from "../../../connection";
export default async function getUserInfo(req, res) {
  const { id } = req.query;

  const response = await prisma.user.findMany({
    where: {
      id: parseInt(id),
    },
    select: {
      date: true,
    },
  });
  res.json(response);
}
