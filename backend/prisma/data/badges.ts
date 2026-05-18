import { PrismaClient, Rarity } from '@prisma/client';

export const badgesData = [
    {
        id: 1,
        name: "Web Beginner",
        description: "Menyelesaikan Level 1",
        rarity: Rarity.COMMON,
        createdAt: new Date(),
        iconPath: "/badge/badge-1.png",
    },
    {
        id: 2,
        name: "Web Explorer",
        description: "Membuka 3 Level",
        rarity: Rarity.COMMON,
        createdAt: new Date(),
        iconPath: "/badge/badge-2.png",
    },
    {
        id: 3,
        name: "Web Adventurer",
        description: "Membuka Seluruh Level",
        rarity: Rarity.RARE,
        createdAt: new Date(),
        iconPath: "/badge/badge-3.png",
    },
    {
        id: 4,
        name: "Brave Coder",
        description: "Menyelesaikan 4 Challenge Hard",
        rarity: Rarity.COMMON,
        createdAt: new Date(),
        iconPath: "/badge/badge-4.png",
    },
    {
        id: 5,
        name: "Hard Challenger",
        description: "Menyelesaikan 12 Challenge Hard",
        rarity: Rarity.RARE,
        createdAt: new Date(),
        iconPath: "/badge/badge-5.png",
    },
    {
        id: 6,
        name: "Dedicated Learner",
        description: "Menyelesaikan Seluruh Materi yang Ada",
        rarity: Rarity.RARE,
        createdAt: new Date(),
        iconPath: "/badge/badge-6.png",
    },
    {
        id: 7,
        name: "Top Performer",
        description: "Masuk Top 3 Leaderboard",
        rarity: Rarity.EPIC,
        createdAt: new Date(),
        iconPath: "/badge/badge-7.png",
    },
    {
        id: 8,
        name: "Consistent Learner",
        description: "Selesaikan Challenge 5 Hari Berturut-turut",
        rarity: Rarity.EPIC,
        createdAt: new Date(),
        iconPath: "/badge/badge-8.png",
    },
];

export async function seedBadges(prisma: PrismaClient) {
  console.log('\n📋 Seeding badges...');

  for (const badge of badgesData) {
    await prisma.badge.upsert({
      where: { id: badge.id },
      update: {},
      create: {
        id: badge.id,
        name: badge.name,
        description: badge.description,
        rarity: badge.rarity,
        createdAt: badge.createdAt,
        iconPath: badge.iconPath,
      },
    });
  }

  console.log('✅ Badge seeding completed!');
}