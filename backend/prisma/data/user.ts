import { PrismaClient, UserRole } from '@prisma/client';

export const usersData = [
  {
    username: 'admin',
    name: 'Administrator',
    email: 'admin@webquest.com',
    password: 'Admin123!',
    role: UserRole.ADMIN,
  },
  {
    username: 'dosen',
    name: 'Dosen Web',
    email: 'dosen1@gmail.com',
    password: 'dosen123!',
    role: UserRole.DOSEN,
  },
  {
    username: '2241760086',
    name: 'Muhammad Wildan Ramadhana',
    email: 'wildan123@gmail.com',
    password: 'wildan123!',
    role: UserRole.MAHASISWA,
  },
];

export async function seedUsers(prisma: PrismaClient) {
  console.log('\n📋 Seeding users (Admin, Dosen, Mahasiswa)...');
  
  const seededUsers = [];

  for (const u of usersData) {
    const hashedPassword = await Bun.password.hash(u.password);

    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {
        username: u.username,
        name: u.name,
        role: u.role,
        password: hashedPassword,
      },
      create: {
        username: u.username,
        name: u.name,
        email: u.email,
        password: hashedPassword,
        role: u.role,
        totalXp: 0,
      },
    });

    seededUsers.push(user);
    console.log(`   - Seeded user: ${user.username} (${user.role})`);
  }

  console.log(`✅ Seeding users selesai! Berhasil memproses ${seededUsers.length} user.`);
  return seededUsers;
}