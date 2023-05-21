import { getToken } from "next-auth/jwt";
import prisma from "../../../connection";
export default async function getUserInfo(req, res) {
  const token = await getToken({ req });
  const { id } = req.query;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    if (token.name === parseInt(id)) {
      const response = await prisma.user.findMany({
        where: {
          id: parseInt(id),
        },
        select: {
          date: true,
        },
      });
      res.json(response);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}
