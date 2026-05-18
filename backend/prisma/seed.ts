import { PrismaClient } from '@prisma/client';
import { seedUsers } from './data/user';
import { seedBadges } from './data/badges';

// Level 1 (HTML)
import { seedLevel1Material } from './data/level1/level1_material';
import { seedLevel1Challenge } from './data/level1/level1_challenge';

// Level 2 (CSS)
import { seedLevel2Material } from './data/level2/level2_material';
import { seedLevel2Challenge } from './data/level2/level2_challenge';

// Level 3 (JS)
import { seedLevel3Material } from './data/level3/level3_material';
import { seedLevel3Challenge } from './data/level3/level3_challenge';

// Level 4 (PHP)
import { seedLevel4Material } from './data/level4/level4_material';
import { seedLevel4Challenge } from './data/level4/level4_challenge';

// Level 5 (DB SQL)
import { seedLevel5Material } from './data/level5/level5_material';
import { seedLevel5Challenge } from './data/level5/level5_challenge';

const prisma = new PrismaClient();

async function main() {
  console.log('🏁 Starting Web-Quest modular database seeding...\n');

  // ============================================
  // 1. SEED USERS (Admin, Dosen, Mahasiswa)
  // ============================================
  await seedUsers(prisma);

  // ============================================
  // 2. SEED BADGES
  // ============================================
  await seedBadges(prisma);

  // ============================================
  // 3. SEED LEVELS, MATERIALS & CHALLENGES (1-5)
  // ============================================
  console.log('\n🗺️  Seeding educational levels, materials, and challenges...');
  
  // Level 1: HTML
  await seedLevel1Material(prisma);
  await seedLevel1Challenge(prisma);

  // Level 2: CSS
  await seedLevel2Material(prisma);
  await seedLevel2Challenge(prisma);

  // Level 3: JS
  await seedLevel3Material(prisma);
  await seedLevel3Challenge(prisma);

  // Level 4: PHP
  await seedLevel4Material(prisma);
  await seedLevel4Challenge(prisma);

  // Level 5: DB SQL
  await seedLevel5Material(prisma);
  await seedLevel5Challenge(prisma);

  // ============================================
  // 4. SEED MRC WORDS (Automatically executed on import)
  // ============================================
  console.log('\n🗣️  Seeding MRC Words...');
  await import('./data/mrcWords');

  console.log('\n🎉 ========================================');
  console.log('🎉 WEB-QUEST DATABASE SEEDING COMPLETED!');
  console.log('🎉 ========================================\n');
}

main()
  .catch((e) => {
    console.error('\n❌ ========================================');
    console.error('❌ SEEDING ERROR!');
    console.error('❌ ========================================\n');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });