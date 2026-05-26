import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Mapping: title → sandboxTemplate yang sesuai
// soal_1: template dengan tabel users + products (dasar)
// soal_18: template dengan tabel products lengkap (name, price, stock, category)
const templateMapping: Record<string, string> = {
  // Soal berbasis tabel users (gunakan soal_1: users + products dasar)
  "Koneksi Database SQLite": "soal_1",
  "Query Semua Data": "soal_1",
  "Menampilkan Data User": "soal_1",
  "Insert Data User": "soal_1",
  "Update Data User": "soal_1",
  "Delete Data User": "soal_1",
  "Prepared Statement": "soal_1",
  "Cari Data User": "soal_1",
  "Perbaiki Query SQL": "soal_1",
  "Perbaiki Prepare": "soal_1",
  "Pagination Sederhana": "soal_1",
  
  // Soal berbasis tabel products lengkap (gunakan soal_18: products dengan stock + category)
  "Menampilkan Daftar Produk": "soal_18",
  "CRUD Produk Lengkap": "soal_18",
};

async function main() {
  const challenges = await prisma.challenge.findMany({
    where: { levelId: 4 },
    select: { id: true, title: true, content: true }
  });

  let updated = 0;
  let skipped = 0;

  for (const c of challenges) {
    const template = templateMapping[c.title];
    if (!template) {
      // Soal ini tidak membutuhkan sandbox template (tidak ada DB interaction)
      skipped++;
      continue;
    }

    const oldContent = (c.content as any) || {};
    
    // Jika sudah benar, skip
    if (oldContent.sandboxTemplate === template) {
      console.log(`✓ [ID ${c.id}] "${c.title}" → sudah benar (${template})`);
      skipped++;
      continue;
    }

    const newContent = {
      ...oldContent,
      sandboxEnabled: true,
      sandboxTemplate: template,
      sandboxLevel: "php_level",
    };

    await prisma.challenge.update({
      where: { id: c.id },
      data: { content: newContent },
    });

    console.log(`✅ [ID ${c.id}] "${c.title}" → sandboxTemplate diset ke "${template}"`);
    updated++;
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Updated : ${updated} soal`);
  console.log(`   Skipped : ${skipped} soal (tidak perlu template atau sudah benar)`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
