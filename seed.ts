const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'PhD student',
      password: 'securepassword',
    },
  });
  console.log('User 1 created:', user1);

  const user2 = await prisma.user.create({
    data: {
      name: 'Dr. Smith',
      email: 'drsmith@example.com',
      role: 'Professor',
      password: 'anotherpassword',
    },
  });
  console.log('User 2 created:', user2);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
