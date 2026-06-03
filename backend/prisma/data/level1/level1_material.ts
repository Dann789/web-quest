import { PrismaClient, Difficulty, ChallengeMethod } from "@prisma/client";

export async function seedLevel1Material(prisma: PrismaClient) {
  console.log("🌱 Seeding Material Level 1: HTML Basics...");

  const level = await prisma.level.upsert({
    where: { id: 1 },
    update: {
      name: "HTML Basics",
      xpRequired: 0,
      description: "Belajar dasar HTML dan struktur web",
      iconName: "fa-html5",
      easyNodes: 4,
      mediumNodes: 4,
      hardNodes: 3,
    },
    create: {
      id: 1,
      name: "HTML Basics",
      xpRequired: 0,
      description: "Belajar dasar HTML dan struktur web",
      iconName: "fa-html5",
      easyNodes: 4,
      mediumNodes: 4,
      hardNodes: 3,
    },
  });

  const materials = [
  {
    id: 1,
    levelId: 1,
    title: "Pengenalan HTML",
    content: "\n        <h2>Apa itu HTML?</h2>\n        <p>HTML (HyperText Markup Language) adalah bahasa markup standar yang digunakan untuk membuat dan menyusun halaman website. HTML berfungsi untuk menentukan struktur konten pada halaman web seperti judul, paragraf, gambar, tabel, form, dan elemen lainnya. HTML bukan bahasa pemrograman, melainkan bahasa markup yang digunakan untuk memberi tanda atau struktur pada konten.</p>\n        <h2>Fungsi HTML</h2>\n        <ul>\n          <li>Membuat struktur halaman website</li>\n          <li>Menampilkan teks, gambar, video, dan audio</li>\n          <li>Membuat form input pengguna</li>\n          <li>Menghubungkan halaman dengan link</li>\n          <li>Menjadi fondasi utama pengembangan web</li>\n        </ul>\n        <h3>Struktur Dasar HTML</h3>\n        <pre><code>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n  &lt;head&gt;\n    &lt;title&gt;Judul Halaman&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Hello World!&lt;/h1&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</code></pre>\n      ",
    order: 1,
    createdAt: "2026-05-19T16:10:10.153Z",
    updatedAt: "2026-05-26T05:32:34.688Z",
    level: {
      id: 1,
      name: "HTML Basics"
    }
  },
  {
    id: 2,
    levelId: 1,
    title: "Struktur Dasar Dokumen HTML",
    content: "\n        <h2>Struktur Dasar HTML</h2>\n\n<pre><code>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n    &lt;title&gt;Judul Halaman&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n    Konten Website\n&lt;/body&gt;\n&lt;/html&gt;\n</code></pre>\n\n<h3>Penjelasan Struktur</h3>\n\n<table>\n    <thead>\n        <tr>\n            <th>Tag</th>\n            <th>Fungsi</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>&lt;!DOCTYPE html&gt;</td>\n            <td>Mendefinisikan dokumen sebagai HTML5</td>\n        </tr>\n        <tr>\n            <td>&lt;html&gt;</td>\n            <td>Elemen pembungkus seluruh HTML</td>\n        </tr>\n        <tr>\n            <td>&lt;head&gt;</td>\n            <td>Berisi metadata halaman</td>\n        </tr>\n        <tr>\n            <td>&lt;title&gt;</td>\n            <td>Judul halaman browser</td>\n        </tr>\n        <tr>\n            <td>&lt;body&gt;</td>\n            <td>Tempat seluruh isi website ditampilkan</td>\n        </tr>\n    </tbody>\n</table>\n\n<h3>Contoh Implementasi</h3>\n\n<pre><code>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n    &lt;title&gt;Belajar HTML&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n    &lt;h1&gt;Selamat Datang&lt;/h1&gt;\n    &lt;p&gt;Belajar HTML dasar sangat mudah.&lt;/p&gt;\n&lt;/body&gt;\n&lt;/html&gt;\n</code></pre>\n      ",
    order: 2,
    createdAt: "2026-05-19T16:10:10.172Z",
    updatedAt: "2026-05-26T05:32:34.690Z",
    level: {
      id: 1,
      name: "HTML Basics"
    }
  },
  {
    id: 3,
    levelId: 1,
    title: "Heading",
    content: "<h3>Pengertian Heading</h3><p>Heading digunakan untuk membuat judul atau subjudul pada halaman website.</p><p>HTML menyediakan heading dari &lt;h1&gt; sampai &lt;h6&gt;.</p><h3>Contoh Heading</h3><pre class=\"block rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono my-4\"><code>&lt;h1&gt;Heading 1&lt;/h1&gt;\n&lt;h2&gt;Heading 2&lt;/h2&gt;\n&lt;h3&gt;Heading 3&lt;/h3&gt;\n&lt;h4&gt;Heading 4&lt;/h4&gt;\n&lt;h5&gt;Heading 5&lt;/h5&gt;\n&lt;h6&gt;Heading 6&lt;/h6&gt;</code></pre><h3>Best Practice</h3><ul><li><p>Gunakan satu &lt;h1&gt; untuk judul utama</p></li><li><p>Gunakan heading secara berurutan</p></li><li><p>Jangan gunakan heading hanya untuk memperbesar teks</p></li></ul><interactive-code-block language=\"html\" codecontent=\"&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n  &lt;title&gt;Playground&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n  &lt;h1&gt;Heading 1&lt;/h1&gt;\n  &lt;h2&gt;Heading 2&lt;/h2&gt;\n  &lt;h3&gt;Heading 3&lt;/h3&gt;\n  &lt;h4&gt;Heading 4&lt;/h4&gt;\n  &lt;h5&gt;Heading 5&lt;/h5&gt;\n  &lt;h6&gt;Heading 6&lt;/h6&gt;\n&lt;/body&gt;\n&lt;/html&gt;\"></interactive-code-block><p></p>",
    order: 3,
    createdAt: "2026-05-19T16:10:10.175Z",
    updatedAt: "2026-05-29T08:16:04.112Z",
    level: {
      id: 1,
      name: "HTML Basics"
    }
  },
  {
    id: 4,
    levelId: 1,
    title: "Paragraph",
    content: "<h3>Pengertian Paragraph</h3><p>Tag &lt;p&gt; digunakan untuk membuat paragraf pada halaman website.</p><h3>Contoh Paragraph</h3><pre class=\"block rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono my-4\"><code>&lt;p&gt;Ini adalah sebuah paragraf.&lt;/p&gt;</code></pre><h3>Contoh Banyak Paragraph</h3><pre class=\"block rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono my-4\"><code>&lt;p&gt;HTML adalah bahasa markup.&lt;/p&gt;\n&lt;p&gt;HTML digunakan untuk membuat website.&lt;/p&gt;</code></pre><h3>Line Break</h3><pre class=\"block rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono my-4\"><code>&lt;p&gt;\nBaris Pertama&lt;br&gt;\nBaris Kedua\n&lt;/p&gt;</code></pre><h3>Horizontal Line</h3><pre class=\"block rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono my-4\"><code>&lt;hr&gt;</code></pre><interactive-code-block language=\"html\" codecontent=\"&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n  &lt;title&gt;Playground&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n  &lt;p&gt;Contoh paragraph&lt;/p&gt;\n  &lt;hr&gt;\n  &lt;p&gt;\n    Baris Pertama&lt;br&gt;\n    Baris Kedua\n  &lt;/p&gt;\n&lt;/body&gt;\n&lt;/html&gt;\"></interactive-code-block><p></p>",
    order: 4,
    createdAt: "2026-05-19T16:10:10.177Z",
    updatedAt: "2026-05-29T08:19:23.823Z",
    level: {
      id: 1,
      name: "HTML Basics"
    }
  },
  {
    id: 5,
    levelId: 1,
    title: "Formatting Text",
    content: "<h3>Pengertian Formatting Text</h3><p>Formatting text digunakan untuk memberikan format tertentu pada teks.</p><h3>Tag Formatting</h3><table class=\"border-collapse table-auto w-full border border-slate-300 dark:border-slate-700\" style=\"min-width: 432px;\"><colgroup><col style=\"width: 407px;\"><col style=\"min-width: 25px;\"></colgroup><tbody><tr><th class=\"border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-2 font-bold text-left\" colspan=\"1\" rowspan=\"1\" colwidth=\"407\"><p>Tag</p></th><th class=\"border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-2 font-bold text-left\" colspan=\"1\" rowspan=\"1\"><p>Fungsi</p></th></tr><tr><td class=\"border border-slate-300 dark:border-slate-700 p-2\" colspan=\"1\" rowspan=\"1\" colwidth=\"407\"><p>&lt;b&gt; atau &lt;strong&gt;</p></td><td class=\"border border-slate-300 dark:border-slate-700 p-2\" colspan=\"1\" rowspan=\"1\"><p>Teks Tebal</p></td></tr><tr><td class=\"border border-slate-300 dark:border-slate-700 p-2\" colspan=\"1\" rowspan=\"1\" colwidth=\"407\"><p>&lt;i&gt; atau &lt;em&gt;</p></td><td class=\"border border-slate-300 dark:border-slate-700 p-2\" colspan=\"1\" rowspan=\"1\"><p>Teks Miring</p></td></tr><tr><td class=\"border border-slate-300 dark:border-slate-700 p-2\" colspan=\"1\" rowspan=\"1\" colwidth=\"407\"><p>&lt;u&gt;</p></td><td class=\"border border-slate-300 dark:border-slate-700 p-2\" colspan=\"1\" rowspan=\"1\"><p>Garis Bawah</p></td></tr><tr><td class=\"border border-slate-300 dark:border-slate-700 p-2\" colspan=\"1\" rowspan=\"1\" colwidth=\"407\"><p>&lt;mark&gt;</p></td><td class=\"border border-slate-300 dark:border-slate-700 p-2\" colspan=\"1\" rowspan=\"1\"><p>Highlight Teks</p></td></tr><tr><td class=\"border border-slate-300 dark:border-slate-700 p-2\" colspan=\"1\" rowspan=\"1\" colwidth=\"407\"><p>&lt;sub&gt;</p></td><td class=\"border border-slate-300 dark:border-slate-700 p-2\" colspan=\"1\" rowspan=\"1\"><p>Subscript (baseline) -&nbsp;menurunkan posisi teks di bawah garis dasar normal</p></td></tr><tr><td class=\"border border-slate-300 dark:border-slate-700 p-2\" colspan=\"1\" rowspan=\"1\" colwidth=\"407\"><p>&lt;sup&gt;</p></td><td class=\"border border-slate-300 dark:border-slate-700 p-2\" colspan=\"1\" rowspan=\"1\"><p>Superscript (footnote) -&nbsp;menaikkan posisi teks di atas garis dasar normal</p></td></tr></tbody></table><h3>Contoh Formatting</h3><pre class=\"block rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono my-4\"><code>&lt;p&gt;&lt;b&gt;Teks Tebal&lt;/b&gt;&lt;/p&gt;\n&lt;p&gt;&lt;i&gt;Teks Miring&lt;/i&gt;&lt;/p&gt;\n&lt;p&gt;&lt;u&gt;Teks Garis Bawah&lt;/u&gt;&lt;/p&gt;\n&lt;p&gt;&lt;mark&gt;Teks Highlight&lt;/mark&gt;&lt;/p&gt;\n&lt;p&gt;H&lt;sub&gt;2&lt;/sub&gt;O&lt;/p&gt;\n&lt;p&gt;10&lt;sup&gt;2&lt;/sup&gt;&lt;/p&gt;</code></pre><interactive-code-block language=\"html\" codecontent=\"&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n  &lt;title&gt;Playground&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n  &lt;p&gt;&lt;b&gt;Teks Tebal&lt;/b&gt;&lt;/p&gt;\n  &lt;p&gt;&lt;i&gt;Teks Miring&lt;/i&gt;&lt;/p&gt;\n  &lt;p&gt;&lt;u&gt;Teks Garis Bawah&lt;/u&gt;&lt;/p&gt;\n  &lt;p&gt;&lt;mark&gt;Teks Highlight&lt;/mark&gt;&lt;/p&gt;\n  &lt;p&gt;H&lt;sub&gt;2&lt;/sub&gt;O&lt;/p&gt;\n  &lt;p&gt;10&lt;sup&gt;2&lt;/sup&gt;&lt;/p&gt;\n&lt;/body&gt;\n&lt;/html&gt;\"></interactive-code-block><p></p>",
    order: 5,
    createdAt: "2026-05-19T16:10:10.179Z",
    updatedAt: "2026-05-29T08:23:44.479Z",
    level: {
      id: 1,
      name: "HTML Basics"
    }
  },
  {
    id: 6,
    levelId: 1,
    title: "List",
    content: "<h2>Pengertian List</h2><p>List adalah elemen HTML yang digunakan untuk menampilkan kumpulan informasi dalam bentuk daftar agar lebih terstruktur dan mudah dibaca.&nbsp;HTML menyediakan beberapa jenis list, yaitu ordered list (menggunakan angka), unordered list (menggunakan simbol atau bullet), dan description list (untuk menampilkan istilah beserta penjelasannya).</p><h3>Ordered List</h3><pre class=\"block rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono my-4\"><code>&lt;ol&gt;\n    &lt;li&gt;HTML&lt;/li&gt;\n    &lt;li&gt;CSS&lt;/li&gt;\n    &lt;li&gt;JavaScript&lt;/li&gt;\n&lt;/ol&gt;\n</code></pre><h3>Unordered List</h3><pre class=\"block rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono my-4\"><code>&lt;ul&gt;\n    &lt;li&gt;Apel&lt;/li&gt;\n    &lt;li&gt;Jeruk&lt;/li&gt;\n    &lt;li&gt;Mangga&lt;/li&gt;\n&lt;/ul&gt;\n</code></pre><h3>Description List</h3><pre class=\"block rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono my-4\"><code>&lt;dl&gt;\n    &lt;dt&gt;HTML&lt;/dt&gt;\n    &lt;dd&gt;Bahasa markup website&lt;/dd&gt;\n\n    &lt;dt&gt;CSS&lt;/dt&gt;\n    &lt;dd&gt;Digunakan untuk styling&lt;/dd&gt;\n&lt;/dl&gt;</code></pre><p>Bisa dicoba untuk melihat previewnya di bagian bawah ini</p><interactive-code-block language=\"html\" codecontent=\"&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n  &lt;title&gt;Playground&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n  &lt;ol&gt;\n    &lt;li&gt;HTML&lt;/li&gt;\n    &lt;li&gt;CSS&lt;/li&gt;\n    &lt;li&gt;JavaScript&lt;/li&gt;\n  &lt;/ol&gt;\n&lt;/body&gt;\n&lt;/html&gt;\"></interactive-code-block><p></p>",
    order: 6,
    createdAt: "2026-05-19T16:10:10.181Z",
    updatedAt: "2026-05-29T09:21:41.474Z",
    level: {
      id: 1,
      name: "HTML Basics"
    }
  },
  {
    id: 7,
    levelId: 1,
    title: "Link",
    content: "<h3>Pengertian Link</h3><p>Tag &lt;a&gt; digunakan untuk membuat link atau tautan.</p><h3>Contoh Link</h3><pre class=\"block rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono my-4\"><code>&lt;a href=\"https://google.com\"&gt;\n    Kunjungi Google\n&lt;/a&gt;\n</code></pre><h3>Membuka di Tab Baru</h3><pre class=\"block rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono my-4\"><code>&lt;a \n    href=\"https://google.com\"\n    target=\"_blank\"\n&gt;\n    Buka Google\n&lt;/a&gt;</code></pre><h3>Link ke Halaman Lokal</h3><pre class=\"block rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono my-4\"><code>&lt;a href=\"about.html\"&gt;\n    Halaman About\n&lt;/a&gt;</code></pre><interactive-code-block language=\"html\" codecontent=\"&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n  &lt;title&gt;Playground&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n  &lt;a \n    href=&quot;https://google.com&quot;\n    target=&quot;_blank&quot;\n&gt;\n    Buka Google\n&lt;/a&gt;\n&lt;/body&gt;\n&lt;/html&gt;\"></interactive-code-block><p></p>",
    order: 7,
    createdAt: "2026-05-19T16:10:10.183Z",
    updatedAt: "2026-05-29T09:22:23.578Z",
    level: {
      id: 1,
      name: "HTML Basics"
    }
  },
  {
    id: 8,
    levelId: 1,
    title: "Image",
    content: "<h3>Pengertian Image</h3><p>Tag &lt;img&gt; digunakan untuk menampilkan gambar.</p><h3>Contoh Image</h3><pre class=\"block rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono my-4\"><code>&lt;img \n    src=\"kucing.jpg\"\n    alt=\"Foto Kucing\"\n    width=\"300\"\n&gt;\n</code></pre><h3>Attribute Penting</h3><table class=\"border-collapse table-auto w-full border border-slate-300 dark:border-slate-700\" style=\"min-width: 357px;\"><colgroup><col style=\"width: 332px;\"><col style=\"min-width: 25px;\"></colgroup><tbody><tr><th class=\"border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-2 font-bold text-left\" colspan=\"1\" rowspan=\"1\" colwidth=\"332\"><p>Attribute</p></th><th class=\"border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-2 font-bold text-left\" colspan=\"1\" rowspan=\"1\"><p>Fungsi</p></th></tr><tr><td class=\"border border-slate-300 dark:border-slate-700 p-2\" colspan=\"1\" rowspan=\"1\" colwidth=\"332\"><p>src</p></td><td class=\"border border-slate-300 dark:border-slate-700 p-2\" colspan=\"1\" rowspan=\"1\"><p>Lokasi gambar (bisa dari folder project atau url)</p></td></tr><tr><td class=\"border border-slate-300 dark:border-slate-700 p-2\" colspan=\"1\" rowspan=\"1\" colwidth=\"332\"><p>alt</p></td><td class=\"border border-slate-300 dark:border-slate-700 p-2\" colspan=\"1\" rowspan=\"1\"><p>Deskripsi gambar</p></td></tr><tr><td class=\"border border-slate-300 dark:border-slate-700 p-2\" colspan=\"1\" rowspan=\"1\" colwidth=\"332\"><p>width</p></td><td class=\"border border-slate-300 dark:border-slate-700 p-2\" colspan=\"1\" rowspan=\"1\"><p>Lebar gambar</p></td></tr><tr><td class=\"border border-slate-300 dark:border-slate-700 p-2\" colspan=\"1\" rowspan=\"1\" colwidth=\"332\"><p>height</p></td><td class=\"border border-slate-300 dark:border-slate-700 p-2\" colspan=\"1\" rowspan=\"1\"><p>Tinggi gambar</p></td></tr></tbody></table><interactive-code-block language=\"html\" codecontent=\"&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n  &lt;title&gt;Playground&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n  &lt;img \n    src=&quot;https://i.pinimg.com/736x/dd/29/2d/dd292db338d0b9a59439af572579377f.jpg&quot;\n    alt=&quot;Foto&quot;\n    width=&quot;100&quot;\n&gt;\n&lt;/body&gt;\n&lt;/html&gt;\"></interactive-code-block><p></p>",
    order: 8,
    createdAt: "2026-05-19T16:10:10.185Z",
    updatedAt: "2026-05-29T09:25:19.902Z",
    level: {
      id: 1,
      name: "HTML Basics"
    }
  },
  {
    id: 9,
    levelId: 1,
    title: "Table",
    content: "<h3>Pengertian Table</h3><p>Tag Table digunakan untuk menampilkan data dalam bentuk tabel.&nbsp;Untuk membuat tabel, HTML menyediakan beberapa tag utama yaitu <code>&lt;table&gt;</code> sebagai wadah tabel, <code>&lt;tr&gt;</code> (Table Row) untuk membuat baris, <code>&lt;th&gt;</code> (Table Header) untuk membuat judul kolom, dan <code>&lt;td&gt;</code> (Table Data) untuk mengisi data pada tabel.</p><p>Selain itu, terdapat atribut seperti <code>colspan</code> untuk menggabungkan beberapa kolom dan <code>rowspan</code> untuk menggabungkan beberapa baris. Atribut ini sering digunakan untuk membuat struktur tabel yang lebih kompleks.</p><h3>Contoh Table</h3><pre class=\"block rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono my-4\"><code>&lt;table border=\"1\"&gt;\n    &lt;tr&gt;\n        &lt;th&gt;Nama&lt;/th&gt;\n        &lt;th&gt;Umur&lt;/th&gt;\n    &lt;/tr&gt;\n\n    &lt;tr&gt;\n        &lt;td&gt;Andi&lt;/td&gt;\n        &lt;td&gt;20&lt;/td&gt;\n    &lt;/tr&gt;\n&lt;/table&gt;</code></pre><interactive-code-block language=\"html\" codecontent=\"&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n  &lt;title&gt;Playground&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n  &lt;table border=&quot;1&quot;&gt;\n    &lt;tr&gt;\n        &lt;th&gt;Nama&lt;/th&gt;\n        &lt;th&gt;Umur&lt;/th&gt;\n    &lt;/tr&gt;\n\n    &lt;tr&gt;\n        &lt;td&gt;Andi&lt;/td&gt;\n        &lt;td&gt;20&lt;/td&gt;\n    &lt;/tr&gt;\n&lt;/table&gt;\n&lt;/body&gt;\n&lt;/html&gt;\"></interactive-code-block><p></p>",
    order: 9,
    createdAt: "2026-05-19T16:10:10.187Z",
    updatedAt: "2026-05-29T09:28:28.067Z",
    level: {
      id: 1,
      name: "HTML Basics"
    }
  },
  {
    id: 10,
    levelId: 1,
    title: "Form Dasar",
    content: "<h3>Pengertian Form</h3><p>Form digunakan untuk menerima input dari pengguna.</p><h3>Contoh Form</h3><pre class=\"block rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono my-4\"><code>&lt;form&gt;\n    &lt;label&gt;Nama:&lt;/label&gt;\n    &lt;input type=\"text\" name=\"nama\"&gt;\n\n    &lt;br&gt;&lt;br&gt;\n\n    &lt;label&gt;Password:&lt;/label&gt;\n    &lt;input type=\"password\" name=\"password\"&gt;\n\n    &lt;br&gt;&lt;br&gt;\n\n    &lt;button type=\"submit\"&gt;\n        Simpan\n    &lt;/button&gt;\n&lt;/form&gt;</code></pre><h3>Jenis Input Penting</h3><pre class=\"block rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono my-4\"><code>&lt;input type=\"text\"&gt;\n&lt;input type=\"email\"&gt;\n&lt;input type=\"password\"&gt;\n&lt;input type=\"number\"&gt;\n&lt;input type=\"date\"&gt;\n&lt;input type=\"checkbox\"&gt;\n&lt;input type=\"radio\"&gt;\n&lt;input type=\"submit\"&gt;\n&lt;input type=\"reset\"&gt;</code></pre><h3>Atribut Tag Input</h3><table class=\"border-collapse table-auto w-full border border-slate-300 dark:border-slate-700\"><thead><tr><th class=\"border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-2 font-bold text-left\">Atribut</th><th class=\"border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-2 font-bold text-left\">Fungsi</th></tr></thead><tbody><tr><td class=\"border border-slate-300 dark:border-slate-700 p-2\">type</td><td class=\"border border-slate-300 dark:border-slate-700 p-2\">Menentukan jenis input (text, password, email, dll.)</td></tr><tr><td class=\"border border-slate-300 dark:border-slate-700 p-2\">name</td><td class=\"border border-slate-300 dark:border-slate-700 p-2\">Nama variabel yang dikirim ke server saat form di-submit</td></tr><tr><td class=\"border border-slate-300 dark:border-slate-700 p-2\">placeholder</td><td class=\"border border-slate-300 dark:border-slate-700 p-2\">Teks petunjuk (hint) di dalam input yang kosong</td></tr><tr><td class=\"border border-slate-300 dark:border-slate-700 p-2\">value</td><td class=\"border border-slate-300 dark:border-slate-700 p-2\">Nilai awal (default) dari input</td></tr><tr><td class=\"border border-slate-300 dark:border-slate-700 p-2\">required</td><td class=\"border border-slate-300 dark:border-slate-700 p-2\">Membuat input wajib diisi</td></tr></tbody></table><interactive-code-block language=\"html\" codecontent=\"&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n  &lt;title&gt;Playground&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n  &lt;form&gt;\n    &lt;label&gt;Nama:&lt;/label&gt;\n    &lt;input type=&quot;text&quot; name=&quot;nama&quot;&gt;\n\n    &lt;br&gt;&lt;br&gt;\n\n    &lt;label&gt;Password:&lt;/label&gt;\n    &lt;input type=&quot;password&quot; name=&quot;password&quot;&gt;\n\n    &lt;br&gt;&lt;br&gt;\n\n    &lt;button type=&quot;submit&quot;&gt;\n        Simpan\n    &lt;/button&gt;\n&lt;/form&gt;\n&lt;/body&gt;\n&lt;/html&gt;\"></interactive-code-block><p></p>",
    order: 10,
    createdAt: "2026-05-19T16:10:10.189Z",
    updatedAt: "2026-05-29T09:39:38.173Z",
    level: {
      id: 1,
      name: "HTML Basics"
    }
  },
  {
    id: 11,
    levelId: 1,
    title: "Elemen Container (div dan span)",
    content: "<h3>Pengertian Container</h3><p>Dalam HTML, <code>&lt;div&gt;</code> dan <code>&lt;span&gt;</code> digunakan sebagai wadah (container) untuk mengelompokkan elemen lain. Mereka tidak memiliki makna visual bawaan, namun sangat penting untuk memberikan styling (menggunakan CSS) atau memanipulasinya dengan JavaScript.</p><h3>Tag &lt;div&gt; (Block-level)</h3><p>Tag <code>&lt;div&gt;</code> adalah elemen <i>block-level</i>. Ini berarti ia akan selalu dimulai di baris baru dan mengambil lebar penuh yang tersedia (kecuali diatur berbeda menggunakan CSS).</p><pre class=\"block rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono my-4\"><code>&lt;div style=\"background-color: lightblue; padding: 10px;\"&gt;\n  &lt;h4&gt;Ini Judul di dalam div&lt;/h4&gt;\n  &lt;p&gt;Ini paragraf di dalam div.&lt;/p&gt;\n&lt;/div&gt;</code></pre><h3>Tag &lt;span&gt; (Inline-level)</h3><p>Tag <code>&lt;span&gt;</code> adalah elemen <i>inline-level</i>. Ini berarti ia tidak membuat baris baru dan hanya mengambil lebar sebesar konten di dalamnya. Sangat cocok untuk memberikan style pada sebagian teks di dalam paragraf.</p><pre class=\"block rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono my-4\"><code>&lt;p&gt;Sebagian teks ini &lt;span style=\"color: red; font-weight: bold;\"&gt;berwarna merah&lt;/span&gt;.&lt;/p&gt;</code></pre><interactive-code-block language=\"html\" codecontent=\"&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n  &lt;title&gt;Playground&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n  &lt;div style=&quot;border: 1px solid black; padding: 10px;&quot;&gt;\n    &lt;p&gt;Ini berada di dalam div pertama&lt;/p&gt;\n  &lt;/div&gt;\n  &lt;br&gt;\n  &lt;p&gt;Teks biasa dengan &lt;span style=&quot;background-color: yellow;&quot;&gt;highlight kuning&lt;/span&gt; menggunakan span.&lt;/p&gt;\n&lt;/body&gt;\n&lt;/html&gt;\"></interactive-code-block><p></p>",
    order: 11,
    createdAt: "2026-05-19T16:10:10.191Z",
    updatedAt: "2026-05-26T05:32:34.700Z",
    level: {
      id: 1,
      name: "HTML Basics"
    }
  },
  {
    id: 12,
    levelId: 1,
    title: "Semantic HTML",
    content: "\n        <h3>Pengertian Semantic HTML</h3>\n\n<p>\nSemantic HTML adalah penggunaan tag HTML sesuai makna atau fungsi kontennya.\n</p>\n\n<h3>Tag Semantic</h3>\n\n<table>\n    <thead>\n        <tr>\n            <th>Tag</th>\n            <th>Fungsi</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>&lt;header&gt;</td>\n            <td>Bagian kepala halaman</td>\n        </tr>\n        <tr>\n            <td>&lt;nav&gt;</td>\n            <td>Navigasi</td>\n        </tr>\n        <tr>\n            <td>&lt;main&gt;</td>\n            <td>Konten utama</td>\n        </tr>\n        <tr>\n            <td>&lt;section&gt;</td>\n            <td>Section halaman</td>\n        </tr>\n        <tr>\n            <td>&lt;footer&gt;</td>\n            <td>Bagian footer</td>\n        </tr>\n    </tbody>\n</table>\n\n<h3>Contoh Semantic HTML</h3>\n\n<pre><code>&lt;header&gt;\n    &lt;h1&gt;Website Belajar HTML&lt;/h1&gt;\n&lt;/header&gt;\n\n&lt;nav&gt;\n    &lt;a href=\"#\"&gt;Home&lt;/a&gt;\n    &lt;a href=\"#\"&gt;Materi&lt;/a&gt;\n&lt;/nav&gt;\n\n&lt;main&gt;\n    &lt;section&gt;\n        &lt;h2&gt;Materi HTML&lt;/h2&gt;\n        &lt;p&gt;Belajar semantic HTML.&lt;/p&gt;\n    &lt;/section&gt;\n&lt;/main&gt;\n\n&lt;footer&gt;\n    &lt;p&gt;Copyright 2026&lt;/p&gt;\n&lt;/footer&gt;\n</code></pre>\n      ",
    order: 12,
    createdAt: "2026-05-19T16:10:10.192Z",
    updatedAt: "2026-05-26T05:32:34.709Z",
    level: {
      id: 1,
      name: "HTML Basics"
    }
  },
  {
    id: 13,
    levelId: 1,
    title: "Audio & Video Basic",
    content: "\n        <h3>Contoh Audio</h3>\n\n<pre><code>&lt;audio controls&gt;\n    &lt;source \n        src=\"musik.mp3\"\n        type=\"audio/mpeg\"\n    &gt;\n&lt;/audio&gt;\n</code></pre>\n\n<h3>Contoh Video</h3>\n\n<pre><code>&lt;video width=\"400\" controls&gt;\n    &lt;source \n        src=\"video.mp4\"\n        type=\"video/mp4\"\n    &gt;\n&lt;/video&gt;\n</code></pre>\n      ",
    order: 13,
    createdAt: "2026-05-19T16:10:10.195Z",
    updatedAt: "2026-05-26T05:32:34.711Z",
    level: {
      id: 1,
      name: "HTML Basics"
    }
  },
  {
    id: 14,
    levelId: 1,
    title: "Attribute HTML",
    content: "\n        <h3>Pengertian Attribute HTML</h3>\n\n<p>\nAttribute adalah informasi tambahan yang diberikan pada tag HTML.\n</p>\n\n<h3>Contoh Attribute</h3>\n\n<pre><code>&lt;a href=\"https://google.com\"&gt;\n    Google\n&lt;/a&gt;\n\n&lt;img \n    src=\"gambar.jpg\"\n    alt=\"Gambar\"\n&gt;\n\n&lt;input \n    type=\"text\"\n    placeholder=\"Masukkan nama\"\n&gt;\n</code></pre>\n\n<h3>Attribute Umum HTML</h3>\n\n<table>\n    <thead>\n        <tr>\n            <th>Attribute</th>\n            <th>Fungsi</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>id</td>\n            <td>Identitas unik elemen</td>\n        </tr>\n        <tr>\n            <td>class</td>\n            <td>Nama class elemen</td>\n        </tr>\n        <tr>\n            <td>style</td>\n            <td>CSS inline</td>\n        </tr>\n        <tr>\n            <td>href</td>\n            <td>Tujuan link</td>\n        </tr>\n        <tr>\n            <td>src</td>\n            <td>Sumber file</td>\n        </tr>\n    </tbody>\n</table>\n      ",
    order: 14,
    createdAt: "2026-05-19T16:10:10.200Z",
    updatedAt: "2026-05-26T05:32:34.717Z",
    level: {
      id: 1,
      name: "HTML Basics"
    }
  }
  ];

  for (const m of materials) {
    await prisma.material.upsert({
      where: { id: m.id },
      update: {
        title: m.title,
        content: m.content,
        order: m.order,
      },
      create: {
        id: m.id,
        levelId: m.levelId,
        title: m.title,
        content: m.content,
        order: m.order,
      },
    });
  }

  console.log("✅ Material Level 1 HTML Basics seeding completed!");
}

const p = new PrismaClient();
seedLevel1Material(p)
  .catch(console.error)
  .finally(() => p.$disconnect());
