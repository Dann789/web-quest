import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mrcSeeder = [
  {
    word: "Simplistic",
    indo: "(Terlalu Sederhana)",
    desc: "Desain atau fitur terasa kurang mendalam atau terlalu dasar.",
  },
  {
    word: "Inviting",
    indo: "(Mengundang)",
    desc: "Tampilan awal membuat pengguna tertarik untuk mulai mencoba.",
  },
  {
    word: "Clean",
    indo: "(Bersih)",
    desc: "Desain antarmuka rapi, lega, dan tidak berantakan.",
  },
  {
    word: "Irrelevant",
    indo: "(Tidak Relevan)",
    desc: "Fitur atau materi tidak sesuai dengan kebutuhan atau ekspektasi pengguna.",
  },
  {
    word: "Patronizing",
    indo: "(Menggurui)",
    desc: "Nada bahasa atau instruksi terasa merendahkan kemampuan pengguna.",
  },
  {
    word: "Not Valuable",
    indo: "(Tidak Bernilai)",
    desc: "Pengguna merasa tidak mendapatkan manfaat yang berarti dari sistem ini.",
  },
  {
    word: "Boring",
    indo: "(Membosankan)",
    desc: "Pengalaman belajar atau bermain terasa monoton dan kurang menarik.",
  },
  {
    word: "Motivating",
    indo: "(Memotivasi)",
    desc: "Mendorong pengguna untuk terus melanjutkan dan menyelesaikan aktivitas.",
  },
  {
    word: "Fresh",
    indo: "(Segar)",
    desc: "Konsep atau tampilan visual terasa baru dan tidak membosankan.",
  },
  {
    word: "Energetic",
    indo: "(Penuh Energi)",
    desc: "Memberikan kesan dinamis, hidup, dan bersemangat saat digunakan.",
  },
  {
    word: "Empowering",
    indo: "(Memberdayakan)",
    desc: "Membuat pengguna merasa mampu dan memegang kendali atas progresnya.",
  },
  {
    word: "Organized",
    indo: "(Terorganisir)",
    desc: "Struktur materi, navigasi, dan informasi tertata dengan sangat baik.",
  },
  {
    word: "Approachable",
    indo: "(Mudah Didekati)",
    desc: "Tampilan sistem ramah dan tidak mengintimidasi bagi pengguna baru.",
  },
  {
    word: "Effortless",
    indo: "(Tanpa Usaha)",
    desc: "Pengguna dapat mengoperasikan sistem dengan sangat lancar dan mudah.",
  },
  {
    word: "Compelling",
    indo: "(Sangat Menarik)",
    desc: "Sangat memikat sehingga pengguna ingin terus berinteraksi dengan sistem.",
  },
  {
    word: "Fragile",
    indo: "(Rapuh)",
    desc: "Sistem terasa tidak stabil, mudah error, atau rentan rusak.",
  },
  {
    word: "Creative",
    indo: "(Kreatif)",
    desc: "Pendekatan desain dan penyampaian materi terasa unik serta imajinatif.",
  },
  {
    word: "Not Secure",
    indo: "(Tidak Aman)",
    desc: "Sistem menimbulkan keraguan terkait keamanan data penggunanya.",
  },
  {
    word: "Unconventional",
    indo: "(Tidak Biasa)",
    desc: "Menggunakan pendekatan yang berbeda dari aplikasi pada umumnya.",
  },
  {
    word: "Dated",
    indo: "(Kuno)",
    desc: "Tampilan, gaya desain, atau teknologi yang digunakan terasa sudah usang.",
  },
  {
    word: "Comprehensive",
    indo: "(Komprehensif)",
    desc: "Menyediakan informasi atau materi pembelajaran yang sangat menyeluruh.",
  },
  {
    word: "Overbearing",
    indo: "(Memaksa)",
    desc: "Sistem terlalu banyak mengatur atau membatasi kebebasan pengguna.",
  },
  {
    word: "Accessible",
    indo: "(Dapat Diakses)",
    desc: "Sistem dapat digunakan dengan mudah oleh berbagai kalangan tanpa hambatan.",
  },
  {
    word: "Relevant",
    indo: "(Relevan)",
    desc: "Konten dan fitur sangat sesuai dengan tujuan penggunaan.",
  },
  {
    word: "Low Maintenance",
    indo: "(Minim Perawatan)",
    desc: "Tidak merepotkan dan tidak butuh banyak penyesuaian saat digunakan.",
  },
  {
    word: "Controllable",
    indo: "(Dapat Dikendalikan)",
    desc: "Pengguna merasa memegang kendali penuh atas navigasi dan aksi mereka.",
  },
  {
    word: "Valuable",
    indo: "(Bernilai)",
    desc: "Memberikan keuntungan atau manfaat yang besar bagi penggunanya.",
  },
  {
    word: "Stable",
    indo: "(Stabil)",
    desc: "Sistem berjalan lancar tanpa hambatan, *crash*, atau gangguan teknis.",
  },
  {
    word: "Disconnected",
    indo: "(Terputus)",
    desc: "Alur navigasi atau hubungan antar materi terasa tidak berkesinambungan.",
  },
  {
    word: "Confusing",
    indo: "(Membingungkan)",
    desc: "Pengguna kesulitan memahami cara kerja fitur atau instruksi yang diberikan.",
  },
  {
    word: "Impressive",
    indo: "(Mengagumkan)",
    desc: "Kualitas sistem secara keseluruhan sangat baik dan memukau pengguna.",
  },
  {
    word: "Stimulating",
    indo: "(Menstimulasi)",
    desc: "Memicu rasa ingin tahu dan semangat pengguna untuk bereksplorasi.",
  },
  {
    word: "Exceptional",
    indo: "(Luar Biasa)",
    desc: "Kualitas fungsi dan desain sistem berada jauh di atas ekspektasi.",
  },
  {
    word: "Consistent",
    indo: "(Konsisten)",
    desc: "Desain, warna, dan alur kerja seragam di seluruh bagian aplikasi.",
  },
  {
    word: "Easy to use",
    indo: "(Mudah Digunakan)",
    desc: "Sistem sangat intuitif dan tidak menyulitkan pengoperasian.",
  },
  {
    word: "Satisfying",
    indo: "(Memuaskan)",
    desc: "Pengguna merasa senang setelah menyelesaikan tugas di dalam sistem.",
  },
  {
    word: "Useful",
    indo: "(Berguna)",
    desc: "Sistem memenuhi fungsi utamanya dengan sangat baik dan fungsional.",
  },
  {
    word: "Ordinary",
    indo: "(Biasa Saja)",
    desc: "Tidak ada hal yang spesial atau menonjol dari pengalaman pengguna.",
  },
  {
    word: "Enthusiastic",
    indo: "(Antusias)",
    desc: "Sistem berhasil memancing respon penuh semangat dari penggunanya.",
  },
  {
    word: "Predictable",
    indo: "(Dapat Diprediksi)",
    desc: "Pengguna mudah menebak respons sistem atas aksi yang mereka lakukan.",
  },
  {
    word: "Desirable",
    indo: "(Diinginkan)",
    desc: "Sangat menarik sehingga membuat orang ingin terus menggunakannya.",
  },
  {
    word: "Comfortable",
    indo: "(Nyaman)",
    desc: "Pengguna merasa rileks dan betah berlama-lama menelusuri sistem.",
  },
  {
    word: "Impersonal",
    indo: "(Tidak Personal)",
    desc: "Sistem terasa dingin layaknya mesin dan kurang memiliki interaksi manusiawi.",
  },
  {
    word: "Business-like",
    indo: "(Kaku/Serius)",
    desc: "Tampilan terlalu formal layaknya aplikasi korporat, kurang unsur santai.",
  },
  {
    word: "Convenient",
    indo: "(Nyaman/Praktis)",
    desc: "Memudahkan pengguna dalam mencapai tujuannya tanpa proses berbelit.",
  },
  {
    word: "Effective",
    indo: "(Efektif)",
    desc: "Berhasil mencapai target atau fungsi pembelajarannya dengan baik.",
  },
  {
    word: "Difficult",
    indo: "(Sulit)",
    desc: "Membutuhkan usaha keras untuk memahami atau mengoperasikan aplikasi.",
  },
  {
    word: "Frustrating",
    indo: "(Membuat Frustrasi)",
    desc: "Menimbulkan emosi kesal karena sering error atau alurnya yang buruk.",
  },
  {
    word: "Clear",
    indo: "(Jelas)",
    desc: "Materi atau instruksi mudah dipahami tanpa menimbulkan ambiguitas.",
  },
  {
    word: "Gets in the way",
    indo: "(Menghalangi)",
    desc: "Fitur atau elemen desain justru mempersulit proses yang dilakukan pengguna.",
  },
  {
    word: "Powerful",
    indo: "(Kuat)",
    desc: "Sistem memiliki kemampuan dan fitur yang sangat tangguh serta mumpuni.",
  },
  {
    word: "Customizable",
    indo: "(Dapat Disesuaikan)",
    desc: "Pengguna bisa mengatur tampilan atau preferensi sesuai keinginan mereka.",
  },
  {
    word: "Hard to Use",
    indo: "(Sulit Digunakan)",
    desc: "Antarmukanya rumit dan menyulitkan pengguna, terutama bagi pemula.",
  },
  {
    word: "Fast",
    indo: "(Cepat)",
    desc: "Waktu *loading* perpindahan halaman atau respon sistem sangat singkat.",
  },
  {
    word: "Stressful",
    indo: "(Membuat Stres)",
    desc: "Pengalaman penggunaan aplikasi membuat penggunanya merasa tertekan.",
  },
  {
    word: "Time-Saving",
    indo: "(Menghemat Waktu)",
    desc: "Membantu pengguna menyelesaikan aktivitas dengan jauh lebih cepat.",
  },
  {
    word: "Connected",
    indo: "(Terhubung)",
    desc: "Komponen aplikasi saling berkaitan dan mengalir dengan sangat baik.",
  },
  {
    word: "Compatible",
    indo: "(Kompatibel)",
    desc: "Berjalan dengan mulus dan menyesuaikan diri di berbagai ukuran layar.",
  },
  {
    word: "Calm",
    indo: "(Tenang)",
    desc: "Desain visual tidak berlebihan dan memberikan kesan damai pada mata.",
  },
  {
    word: "Undesirable",
    indo: "(Tidak Diinginkan)",
    desc: "Pengguna sama sekali tidak merasa tertarik untuk menggunakan sistem ini.",
  },
  {
    word: "Attractive",
    indo: "(Menarik)",
    desc: "Tampilan visual antarmuka sangat estetik dan memanjakan mata.",
  },
  {
    word: "Efficient",
    indo: "(Efisien)",
    desc: "Tugas bisa diselesaikan dengan jumlah langkah atau klik yang minim.",
  },
  {
    word: "Poor quality",
    indo: "(Kualitas Buruk)",
    desc: "Sistem terasa murahan, banyak *bug*, atau desainnya terlihat asal-asalan.",
  },
  {
    word: "Inconsistent",
    indo: "(Tidak Konsisten)",
    desc: "Tampilan atau aturan main di dalam sistem sering berubah-ubah.",
  },
  {
    word: "Uncontrollable",
    indo: "(Tidak Dapat Dikendalikan)",
    desc: "Sistem bertindak di luar dugaan atau tidak mengikuti kehendak pengguna.",
  },
  {
    word: "Familiar",
    indo: "(Akrab/Dikenal)",
    desc: "Menggunakan pola desain atau ikon yang sudah sangat umum bagi pengguna.",
  },
  {
    word: "Overwhelming",
    indo: "(Membingungkan/Berlebihan)",
    desc: "Terlalu banyak informasi atau fitur visual yang disajikan secara bersamaan.",
  },
  {
    word: "Unpredictable",
    indo: "(Tidak Dapat Diprediksi)",
    desc: "Hasil dari sebuah aksi interaksi sering kali di luar dugaan pengguna.",
  },
  {
    word: "Complex",
    indo: "(Rumit)",
    desc: "Struktur informasi dan alur sistem memiliki terlalu banyak percabangan.",
  },
  {
    word: "Confident",
    indo: "(Percaya Diri)",
    desc: "Sistem yang mantap membuat penggunanya merasa yakin saat bertindak.",
  },
  {
    word: "Unrefined",
    indo: "(Belum Sempurna)",
    desc: "Sistem terasa seperti masih versi *beta* dan belum dipoles dengan baik.",
  },
  {
    word: "Rigid",
    indo: "(Kaku)",
    desc: "Aturannya ketat dan tidak memberikan kebebasan opsi bagi penggunanya.",
  },
  {
    word: "Engaging",
    indo: "(Melibatkan)",
    desc: "Berhasil membuat pengguna fokus, tertarik, dan larut dalam aktivitas.",
  },
  {
    word: "Annoying",
    indo: "(Menyebalkan)",
    desc: "Terdapat elemen visual, pop-up, atau navigasi yang sangat mengganggu.",
  },
  {
    word: "Busy",
    indo: "(Terlalu Ramai)",
    desc: "Tampilan antarmuka terlalu padat elemen sehingga membuat mata lelah.",
  },
  {
    word: "Expected",
    indo: "(Sesuai Harapan)",
    desc: "Sistem menjalankan fungsi dasarnya sebagaimana mestinya.",
  },
  {
    word: "Sterile",
    indo: "(Steril/Hambar)",
    desc: "Tampilan terlalu polos, kaku, dan kekurangan elemen daya tarik emosional.",
  },
  {
    word: "Advanced",
    indo: "(Canggih)",
    desc: "Menggunakan pendekatan antarmuka atau fungsi teknologi yang lebih modern.",
  },
  {
    word: "Essential",
    indo: "(Penting)",
    desc: "Keberadaan fitur dalam sistem dirasa sangat krusial dan wajib ada.",
  },
  {
    word: "Straight Forward",
    indo: "(Terus Terang)",
    desc: "Sistem menyajikan fungsi dan informasi secara langsung tanpa berbelit-belit.",
  },
  {
    word: "Unapproachable",
    indo: "(Sulit Didekati)",
    desc: "Kesan pertama dari tampilan aplikasi sudah membuat pengguna enggan mencoba.",
  },
  {
    word: "Distracting",
    indo: "(Mengganggu Fokus)",
    desc: "Banyak elemen tidak penting yang mengalihkan perhatian dari materi utama.",
  },
  {
    word: "Meaningful",
    indo: "(Bermakna)",
    desc: "Interaksi dengan sistem memberikan kesan positif yang mendalam.",
  },
  {
    word: "Trustworthy",
    indo: "(Dapat Dipercaya)",
    desc: "Sistem terlihat kredibel, profesional, dan dapat diandalkan kebenarannya.",
  },
  {
    word: "Old",
    indo: "(Kuno)",
    desc: "Gaya visual dan interaksi aplikasinya terasa tertinggal jauh di masa lalu.",
  },
  {
    word: "Intuitive",
    indo: "(Intuitif)",
    desc: "Pengguna bisa langsung mengerti cara memakainya tanpa perlu membaca tutorial.",
  },
  {
    word: "Cutting edge",
    indo: "(Mutakhir)",
    desc: "Mencerminkan desain atau teknologi yang paling mutakhir di kelasnya.",
  },
  {
    word: "Integrated",
    indo: "(Terintegrasi)",
    desc: "Semua elemen dan fitur menyatu dengan harmonis dan saling mendukung.",
  },
  {
    word: "Unattractive",
    indo: "(Tidak Menarik)",
    desc: "Tampilan visual secara keseluruhan buruk dan tidak mengundang minat.",
  },
  {
    word: "Intimidating",
    indo: "(Mengintimidasi)",
    desc: "Terlalu banyak pilihan atau kerumitan menu yang menakutkan pengguna baru.",
  },
  {
    word: "Time-consuming",
    indo: "(Memakan Waktu)",
    desc: "Proses pengerjaan atau loading terlalu panjang dan membuang waktu.",
  },
  {
    word: "Secure",
    indo: "(Aman)",
    desc: "Sistem menjaga privasi, progres data, dan sesi pengguna dengan sangat baik.",
  },
  {
    word: "Ineffective",
    indo: "(Tidak Efektif)",
    desc: "Sistem gagal atau tidak berhasil memberikan solusi untuk mencapai tujuan.",
  },
  {
    word: "Helpful",
    indo: "(Membantu)",
    desc: "Fungsi-fungsinya sangat menuntun dan mempermudah tugas pengguna.",
  },
  {
    word: "Too Technical",
    indo: "(Terlalu Teknis)",
    desc: "Bahasa atau instruksi yang digunakan terlalu rumit bagi orang awam.",
  },
  {
    word: "Optimistic",
    indo: "(Optimis)",
    desc: "Desain sistem memberikan nuansa cerah, positif, dan penuh harapan.",
  },
  {
    word: "Personal",
    indo: "(Personal)",
    desc: "Sistem terasa memiliki sentuhan khusus seakan dirancang untuk penggunanya.",
  },
  {
    word: "Exciting",
    indo: "(Seru/Mendebarkan)",
    desc: "Sangat menyenangkan untuk digunakan, terutama saat menjalani tantangannya.",
  },
  {
    word: "Professional",
    indo: "(Profesional)",
    desc: "Tampilan keseluruhan rapi, meyakinkan, dan berstandar tinggi.",
  },
  {
    word: "High quality",
    indo: "(Kualitas Tinggi)",
    desc: "Sistem dibangun dengan sangat halus dan menunjukkan spesifikasi premium.",
  },
  {
    word: "Disruptive",
    indo: "(Inovatif/Mengubah Kebiasaan)",
    desc: "Memberikan cara atau metode baru yang mendobrak kebiasaan aplikasi lama.",
  },
  {
    word: "Collaborative",
    indo: "(Kolaboratif)",
    desc: "Memungkinkan atau mendorong terjadinya interaksi yang baik dalam sistem.",
  },
  {
    word: "Fun",
    indo: "(Menyenangkan)",
    desc: "Elemen di dalamnya sukses membawa kegembiraan saat menggunakannya.",
  },
  {
    word: "Entertaining",
    indo: "(Menghibur)",
    desc: "Sistem berhasil mengusir rasa kebosanan pengguna dengan baik.",
  },
  {
    word: "Flexible",
    indo: "(Fleksibel)",
    desc: "Bisa beradaptasi dengan berbagai cara dan preferensi penggunanya.",
  },
  {
    word: "Inspiring",
    indo: "(Menginspirasi)",
    desc: "Memberikan ide-ide baru atau dorongan semangat bagi pengguna.",
  },
  {
    word: "Slow",
    indo: "(Lambat)",
    desc: "Sistem berjalan lelet, patah-patah, atau memakan waktu respons yang lama.",
  },
  {
    word: "Appealing",
    indo: "(Menarik Hati)",
    desc: "Sistem memiliki pesona atau daya pikat yang disukai penggunanya.",
  },
  {
    word: "Understandable",
    indo: "(Dapat Dipahami)",
    desc: "Alur aplikasi dan informasi di dalamnya mudah dicerna secara logika.",
  },
  {
    word: "Incomprehensible",
    indo: "(Tidak Dapat Dipahami)",
    desc: "Bahasa, konsep, atau alur di dalam sistem sangat tidak masuk akal.",
  },
  {
    word: "Dull",
    indo: "(Hambar)",
    desc: "Sistem kekurangan variasi warna, interaksi, dan sama sekali tidak menantang.",
  },
  {
    word: "Responsive",
    indo: "(Responsif)",
    desc: "Sistem dengan gesit memproses klik atau interaksi dari penggunanya.",
  },
  {
    word: "Reliable",
    indo: "(Dapat Diandalkan)",
    desc: "Jarang mengalami error dan performanya selalu tangguh di setiap sesi.",
  },
  {
    word: "Sophisticated",
    indo: "(Canggih/Elegan)",
    desc: "Memiliki kerumitan desain yang elegan dan sistematis.",
  },
  {
    word: "Innovative",
    indo: "(Inovatif)",
    desc: "Memberikan solusi atau metode yang belum pernah ada sebelumnya.",
  },
  {
    word: "Novel",
    indo: "(Unik/Baru)",
    desc: "Pengalaman yang disajikan terasa sangat orisinal bagi pengguna.",
  },
  {
    word: "Usable",
    indo: "(Dapat Digunakan)",
    desc: "Sistem berhasil memenuhi standar fungsi dasar dan berjalan dengan lancar.",
  },
  {
    word: "Friendly",
    indo: "(Ramah)",
    desc: "Menggunakan nada bahasa dan visual yang terasa sangat bersahabat.",
  }
];

await prisma.mrcWords.deleteMany();
const sampleWord = [];
for (const item of mrcSeeder) {
  const word = await prisma.mrcWords.create({
    data: {
      word: item.word,
      translate: item.indo,
      description: item.desc,
    },
  });
  sampleWord.push(word);
}
