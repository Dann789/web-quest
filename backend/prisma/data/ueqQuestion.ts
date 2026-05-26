import { PrismaClient, UEQCategory } from "@prisma/client";

const prisma = new PrismaClient();

export const ueqQuestionData = [
  {
    leftWord: "Menyusahkan",
    rightWord: "Menyenangkan",
    category: UEQCategory.ATTRACTIVENESS,  
  },
  {
    leftWord: "Tak dapat dipahami",
    rightWord: "Dapat dipahami",
    category: UEQCategory.PERSPICUITY,  
  },
  {
    leftWord: "Kreatif",
    rightWord: "Monoton",
    category: UEQCategory.NOVELTY,  
  },
  {
    leftWord: "Mudah dipelajari",
    rightWord: "Sulit dipelajari",
    category: UEQCategory.PERSPICUITY,  
  },
  {
    leftWord: "Bermanfaat",
    rightWord: "Kurang bermanfaat",
    category: UEQCategory.STIMULATION,  
  },
  {
    leftWord: "Membosankan",
    rightWord: "Mengasyikkan",
    category: UEQCategory.STIMULATION,  
  },
  {
    leftWord: "Tidak menarik",
    rightWord: "Menarik",
    category: UEQCategory.STIMULATION,  
  },
  {
    leftWord: "Tak dapat diprediksi",
    rightWord: "Dapat diprediksi",
    category: UEQCategory.DEPENDABILITY,  
  },
  {
    leftWord: "Cepat",
    rightWord: "Lambat",
    category: UEQCategory.EFFICIENCY,  
  },
  {
    leftWord: "Berdaya cipta",
    rightWord: "Konvensional",
    category: UEQCategory.NOVELTY,  
  },
  {
    leftWord: "Menghalangi",
    rightWord: "Mendukung",
    category: UEQCategory.DEPENDABILITY,  
  },
  {
    leftWord: "Baik",
    rightWord: "Buruk",
    category: UEQCategory.ATTRACTIVENESS,  
  },
  {
    leftWord: "Rumit",
    rightWord: "Sederhana",
    category: UEQCategory.PERSPICUITY,  
  },
  {
    leftWord: "Tidak disukai",
    rightWord: "Menggembirakan",
    category: UEQCategory.ATTRACTIVENESS,  
  },
  {
    leftWord: "Lazim",
    rightWord: "Terdepan",
    category: UEQCategory.NOVELTY,  
  },
  {
    leftWord: "Tidak nyaman",
    rightWord: "Nyaman",
    category: UEQCategory.ATTRACTIVENESS,  
  },
  {
    leftWord: "Aman",
    rightWord: "Tidak aman",
    category: UEQCategory.DEPENDABILITY,  
  },
  {
    leftWord: "Memotivasi",
    rightWord: "Tidak memotivasi",
    category: UEQCategory.STIMULATION,  
  },
  {
    leftWord: "Memenuhi ekspektasi",
    rightWord: "Tidak memenuhi ekspektasi",
    category: UEQCategory.DEPENDABILITY,  
  },
  {
    leftWord: "Tidak efisien",
    rightWord: "Efisien",
    category: UEQCategory.EFFICIENCY,  
  },
  {
    leftWord: "Jelas",
    rightWord: "Membingungkan",
    category: UEQCategory.PERSPICUITY,  
  },
  {
    leftWord: "Tidak praktis",
    rightWord: "Praktis",
    category: UEQCategory.EFFICIENCY,  
  },
  {
    leftWord: "Terorganisasi",
    rightWord: "Berantakan",
    category: UEQCategory.EFFICIENCY,  
  },
  {
    leftWord: "Atraktif",
    rightWord: "Tidak atraktif",
    category: UEQCategory.ATTRACTIVENESS,  
  },
  {
    leftWord: "Ramah pengguna",
    rightWord: "Tidak ramah pengguna",
    category: UEQCategory.ATTRACTIVENESS,  
  },
  {
    leftWord: "Konservatif",
    rightWord: "Inovatif",
    category: UEQCategory.NOVELTY,  
  },
];

await prisma.uEQQuestion.deleteMany();
const sampleWord = [];
for (const item of ueqQuestionData) {
  const word = await prisma.uEQQuestion.create({
    data: {
      leftWord: item.leftWord,
      rightWord: item.rightWord,
      category: item.category,
    },
  });
  sampleWord.push(word);
}