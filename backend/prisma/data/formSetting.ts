import { PrismaClient} from '@prisma/client';

export const formSettingData = [
    {
        id: 1,
        isActive: false,
    },
];

export async function seedFormSetting(prisma: PrismaClient) {
    console.log('\n📋 Seeding form setting...');

    for (const formSetting of formSettingData) {
        await prisma.formSetting.upsert({
            where: { id: formSetting.id },
            update: {},
            create: {
                id: formSetting.id,
                isActive: formSetting.isActive,
            },
        });
    }

    console.log('✅ Form setting seeding completed!');
}

// Allows the file to be executed directly using `bun prisma/data/formSetting.ts`
if (import.meta.main) {
    const prisma = new PrismaClient();
    seedFormSetting(prisma)
        .catch((e) => {
            console.error(e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}