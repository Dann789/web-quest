import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const mrcWords = [
  {
    word: "Clear",
    indo: "(Jelas)",
    desc: "Materi atau instruksi mudah dipahami.",
  },
  { word: "Clean", indo: "(Bersih/Rapi)", desc: "Tampilan antarmuka rapi." },
  {
    word: "Easy to use",
    indo: "(Mudah digunakan)",
    desc: "Navigasi sistem lancar.",
  },
  {
    word: "Helpful",
    indo: "(Membantu)",
    desc: "Sistem efektif membantu user belajar.",
  },
  {
    word: "Organized",
    indo: "(Terorganisir)",
    desc: "Struktur materi atau level tertata rapi.",
  },
  {
    word: "Responsive",
    indo: "(Responsif)",
    desc: "Sistem cepat merespons input (tidak lag).",
  },
  { word: "Simple", indo: "(Sederhana)", desc: "Tidak berbelit-belit." },
  {
    word: "Usable",
    indo: "(Dapat digunakan)",
    desc: "Fungsionalitas berjalan normal.",
  },
  {
    word: "Confusing",
    indo: "(Membingungkan)",
    desc: "User tersesat atau tidak paham instruksi.",
  },
  {
    word: "Complex",
    indo: "(Rumit)",
    desc: "Alur belajar terlalu sulit dipahami.",
  },
  {
    word: "Distracting",
    indo: "(Mengganggu)",
    desc: "Elemen visual mengganggu fokus belajar.",
  },
  {
    word: "Hard to use",
    indo: "(Sulit digunakan)",
    desc: "Kontrol game atau navigasi susah.",
  },
  {
    word: "Overwhelming",
    indo: "(Berlebihan)",
    desc: "Terlalu banyak informasi sekaligus.",
  },
  { word: "Slow", indo: "(Lambat)", desc: "Masalah performa/loading." },
  {
    word: "Frustrating",
    indo: "(Membuat frustrasi)",
    desc: "Sistem error atau terlalu susah dikendalikan.",
  },
  {
    word: "Attractive",
    indo: "(Menarik)",
    desc: "Visual game memanjakan mata.",
  },
  {
    word: "Creative",
    indo: "(Kreatif)",
    desc: "Konsep Pembelajaran terasa unik.",
  },
  {
    word: "Engaging",
    indo: "(Melibatkan)",
    desc: "User merasa tertarik dalam pembelajaran.",
  },
  {
    word: "Fresh",
    indo: "(Segar)",
    desc: "Tampilan baru, tidak seperti e-learning kaku.",
  },
  {
    word: "Friendly",
    indo: "(Ramah)",
    desc: "Suasana/tone aplikasi menyenangkan.",
  },
  {
    word: "Fun",
    indo: "(Menyenangkan)",
    desc: "Unsur pembelajaran menyenangkan.",
  },
  {
    word: "Innovative",
    indo: "(Inovatif)",
    desc: "Terasa ada kebaruan teknologi.",
  },
  {
    word: "Motivating",
    indo: "(Memotivasi)",
    desc: "Mendorong user untuk lanjut ke level berikutnya.",
  },
  {
    word: "Satisfying",
    indo: "(Memuaskan)",
    desc: "Perasaan puas saat menyelesaikan tantangan.",
  },
  {
    word: "Stimulating",
    indo: "(Menstimulasi)",
    desc: "Memicu rasa ingin tahu dan semangat.",
  },
  {
    word: "Annoying",
    indo: "(Menyebalkan)",
    desc: "Ada bagian yang sangat mengganggu emosi.",
  },
  {
    word: "Boring",
    indo: "(Membosankan)",
    desc: "Gamifikasi gagal membuat seru.",
  },
  {
    word: "Dull",
    indo: "(Tumpul/Hambar)",
    desc: "Kurang variasi, terasa datar.",
  },
  { word: "Old", indo: "(Kuno)", desc: "Desain terasa ketinggalan zaman." },
  {
    word: "Unattractive",
    indo: "(Tidak menarik)",
    desc: "Visual tidak menggugah selera.",
  },
];

await prisma.mrcWords.deleteMany();
const sampleWord = [];
for (const item of mrcWords) {
  const word = await prisma.mrcWords.create({
    data: {
      word: item.word,
      translate: item.indo,
      description: item.desc,
    },
  });
  sampleWord.push(word);
}
