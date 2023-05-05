import prisma from "../../connection";

export default async function main() {
  const users = await prisma.users.deleteMany();
  console.log(users);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
