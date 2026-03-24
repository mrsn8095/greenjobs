const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Create Admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@greenjobs.com' },
    update: {},
    create: {
      email: 'admin@greenjobs.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'ADMIN',
    },
  });
  console.log('Admin user seeded: admin@greenjobs.com / admin123');

  // Create Jobs
  await prisma.job.createMany({
    data: [
      {
        title: 'Senior Software Engineer',
        company: 'Tech Gulf',
        country: 'UAE',
        salary: 'AED 15,000 / month',
        description: 'Looking for a Senior Software Engineer with Next.js and Node.js experience to join our core team in Dubai.',
      },
      {
        title: 'HR Manager',
        company: 'Global Startup',
        country: 'India',
        salary: 'INR 1,200,000 / year',
        description: 'Exciting opportunity for an experienced HR Manager in Bangalore to lead recruitment and culture strategy.',
      },
      {
        title: 'Store Keeper',
        company: 'Retail World Co.',
        country: 'Qatar',
        salary: 'QAR 4,000 / month',
        description: 'Reliable store keeper required for maintaining inventory in our Doha based warehouse.',
      }
    ]
  });
  console.log('Sample jobs seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
