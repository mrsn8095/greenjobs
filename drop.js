const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Dropping old POS tables to clean the Greenjobs DB...');
  await prisma.$executeRawUnsafe(`DROP SCHEMA public CASCADE;`);
  await prisma.$executeRawUnsafe(`CREATE SCHEMA public;`);
  await prisma.$executeRawUnsafe(`GRANT ALL ON SCHEMA public TO postgres;`);
  await prisma.$executeRawUnsafe(`GRANT ALL ON SCHEMA public TO public;`);
  console.log('Schema completely reset.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
