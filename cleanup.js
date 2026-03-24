const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning up old mock resume links from the database...');
  const result = await prisma.user.updateMany({
    where: {
      resumeUrl: 'https://example.com/mock-resume-url.pdf'
    },
    data: {
      resumeUrl: null
    }
  });
  console.log(`Successfully cleaned ${result.count} old test accounts!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
