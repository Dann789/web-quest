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
      levelId: level.id,
      title: "Pengenalan HTML",
      order: 1,
      content: `
        <h2>Apa itu HTML?</h2>
        <p>HTML (HyperText Markup Language) adalah bahasa markup standar yang digunakan untuk membuat dan menyusun halaman website. HTML berfungsi untuk menentukan struktur konten pada halaman web seperti judul, paragraf, gambar, tabel, form, dan elemen lainnya. HTML bukan bahasa pemrograman, melainkan bahasa markup yang digunakan untuk memberi tanda atau struktur pada konten.</p>
        <h2>Fungsi HTML</h2>
        <ul>
          <li>Membuat struktur halaman website</li>
          <li>Menampilkan teks, gambar, video, dan audio</li>
          <li>Membuat form input pengguna</li>
          <li>Menghubungkan halaman dengan link</li>
          <li>Menjadi fondasi utama pengembangan web</li>
        </ul>
        <h3>Struktur Dasar HTML</h3>
        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Judul Halaman&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello World!&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
      `,
    },
    {
      id: 2,
      levelId: level.id,
      title: "Struktur Dasar Dokumen HTML",
      order: 2,
      content: `
        <h2>Struktur Dasar HTML</h2>

<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Judul Halaman&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    Konten Website
&lt;/body&gt;
&lt;/html&gt;
</code></pre>

<h3>Penjelasan Struktur</h3>

<table>
    <thead>
        <tr>
            <th>Tag</th>
            <th>Fungsi</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>&lt;!DOCTYPE html&gt;</td>
            <td>Mendefinisikan dokumen sebagai HTML5</td>
        </tr>
        <tr>
            <td>&lt;html&gt;</td>
            <td>Elemen pembungkus seluruh HTML</td>
        </tr>
        <tr>
            <td>&lt;head&gt;</td>
            <td>Berisi metadata halaman</td>
        </tr>
        <tr>
            <td>&lt;title&gt;</td>
            <td>Judul halaman browser</td>
        </tr>
        <tr>
            <td>&lt;body&gt;</td>
            <td>Tempat seluruh isi website ditampilkan</td>
        </tr>
    </tbody>
</table>

<h3>Contoh Implementasi</h3>

<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Belajar HTML&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Selamat Datang&lt;/h1&gt;
    &lt;p&gt;Belajar HTML dasar sangat mudah.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
      `,
    },
    {
      id: 3,
      levelId: level.id,
      title: "Heading",
      order: 3,
      content: `
        <h3>Pengertian Heading</h3>

<p>
Heading digunakan untuk membuat judul atau subjudul pada halaman website.
</p>

<p>
HTML menyediakan heading dari &lt;h1&gt; sampai &lt;h6&gt;.
</p>

<h3>Contoh Heading</h3>

<pre><code>&lt;h1&gt;Heading 1&lt;/h1&gt;
&lt;h2&gt;Heading 2&lt;/h2&gt;
&lt;h3&gt;Heading 3&lt;/h3&gt;
&lt;h4&gt;Heading 4&lt;/h4&gt;
&lt;h5&gt;Heading 5&lt;/h5&gt;
&lt;h6&gt;Heading 6&lt;/h6&gt;
</code></pre>

<h3>Best Practice</h3>

<ul>
    <li>Gunakan satu &lt;h1&gt; untuk judul utama</li>
    <li>Gunakan heading secara berurutan</li>
    <li>Jangan gunakan heading hanya untuk memperbesar teks</li>
</ul>
      `,
    },
    {
      id: 4,
      levelId: level.id,
      title: "Paragraph",
      order: 4,
      content: `
        <h3>Pengertian Paragraph</h3>

<p>
Tag &lt;p&gt; digunakan untuk membuat paragraf pada halaman website.
</p>

<h3>Contoh Paragraph</h3>

<pre><code>&lt;p&gt;Ini adalah sebuah paragraf.&lt;/p&gt;
</code></pre>

<h3>Contoh Banyak Paragraph</h3>

<pre><code>&lt;p&gt;HTML adalah bahasa markup.&lt;/p&gt;
&lt;p&gt;HTML digunakan untuk membuat website.&lt;/p&gt;
</code></pre>

<h3>Line Break</h3>

<pre><code>&lt;p&gt;
Baris Pertama&lt;br&gt;
Baris Kedua
&lt;/p&gt;
</code></pre>

<h3>Horizontal Line</h3>

<pre><code>&lt;hr&gt;
</code></pre>
      `,
    },
    {
      id: 5,
      levelId: level.id,
      title: "Formatting Text",
      order: 5,
      content: `
        <h3>Pengertian Formatting Text</h3>

<p>
Formatting text digunakan untuk memberikan format tertentu pada teks.
</p>

<h3>Tag Formatting</h3>

<table>
    <thead>
        <tr>
            <th>Tag</th>
            <th>Fungsi</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>&lt;b&gt;</td>
            <td>Teks Tebal</td>
        </tr>
        <tr>
            <td>&lt;i&gt;</td>
            <td>Teks Miring</td>
        </tr>
        <tr>
            <td>&lt;u&gt;</td>
            <td>Garis Bawah</td>
        </tr>
        <tr>
            <td>&lt;mark&gt;</td>
            <td>Highlight Teks</td>
        </tr>
        <tr>
            <td>&lt;sub&gt;</td>
            <td>Subscript</td>
        </tr>
        <tr>
            <td>&lt;sup&gt;</td>
            <td>Superscript</td>
        </tr>
    </tbody>
</table>

<h3>Contoh Formatting</h3>

<pre><code>&lt;p&gt;&lt;b&gt;Teks Tebal&lt;/b&gt;&lt;/p&gt;
&lt;p&gt;&lt;i&gt;Teks Miring&lt;/i&gt;&lt;/p&gt;
&lt;p&gt;&lt;u&gt;Teks Garis Bawah&lt;/u&gt;&lt;/p&gt;
&lt;p&gt;&lt;mark&gt;Teks Highlight&lt;/mark&gt;&lt;/p&gt;
&lt;p&gt;H&lt;sub&gt;2&lt;/sub&gt;O&lt;/p&gt;
&lt;p&gt;10&lt;sup&gt;2&lt;/sup&gt;&lt;/p&gt;
</code></pre>
      `,
    },
    {
      id: 6,
      levelId: level.id,
      title: "List",
      order: 6,
      content: `
        <h3>Ordered List</h3>

<pre><code>&lt;ol&gt;
    &lt;li&gt;HTML&lt;/li&gt;
    &lt;li&gt;CSS&lt;/li&gt;
    &lt;li&gt;JavaScript&lt;/li&gt;
&lt;/ol&gt;
</code></pre>

<h3>Unordered List</h3>

<pre><code>&lt;ul&gt;
    &lt;li&gt;Apel&lt;/li&gt;
    &lt;li&gt;Jeruk&lt;/li&gt;
    &lt;li&gt;Mangga&lt;/li&gt;
&lt;/ul&gt;
</code></pre>

<h3>Description List</h3>

<pre><code>&lt;dl&gt;
    &lt;dt&gt;HTML&lt;/dt&gt;
    &lt;dd&gt;Bahasa markup website&lt;/dd&gt;

    &lt;dt&gt;CSS&lt;/dt&gt;
    &lt;dd&gt;Digunakan untuk styling&lt;/dd&gt;
&lt;/dl&gt;
</code></pre>
      `,
    },
    {
      id: 7,
      levelId: level.id,
      title: "Link",
      order: 7,
      content: `
        <h3>Pengertian Link</h3>

<p>
Tag &lt;a&gt; digunakan untuk membuat link atau tautan.
</p>

<h3>Contoh Link</h3>

<pre><code>&lt;a href="https://google.com"&gt;
    Kunjungi Google
&lt;/a&gt;
</code></pre>

<h3>Membuka di Tab Baru</h3>

<pre><code>&lt;a 
    href="https://google.com"
    target="_blank"
&gt;
    Buka Google
&lt;/a&gt;
</code></pre>

<h3>Link ke Halaman Lokal</h3>

<pre><code>&lt;a href="about.html"&gt;
    Halaman About
&lt;/a&gt;
</code></pre>
      `,
    },
    {
      id: 8,
      levelId: level.id,
      title: "Image",
      order: 8,
      content: `
        <h3>Pengertian Image</h3>

<p>
Tag &lt;img&gt; digunakan untuk menampilkan gambar.
</p>

<h3>Contoh Image</h3>

<pre><code>&lt;img 
    src="kucing.jpg"
    alt="Foto Kucing"
    width="300"
&gt;
</code></pre>

<h3>Attribute Penting</h3>

<table>
    <thead>
        <tr>
            <th>Attribute</th>
            <th>Fungsi</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>src</td>
            <td>Lokasi gambar</td>
        </tr>
        <tr>
            <td>alt</td>
            <td>Deskripsi gambar</td>
        </tr>
        <tr>
            <td>width</td>
            <td>Lebar gambar</td>
        </tr>
        <tr>
            <td>height</td>
            <td>Tinggi gambar</td>
        </tr>
    </tbody>
</table>
      `,
    },
    {
      id: 9,
      levelId: level.id,
      title: "Table",
      order: 9,
      content: `
        <h3>Pengertian Table</h3>

<p>
Table digunakan untuk menampilkan data dalam bentuk tabel.
</p>

<h3>Contoh Table</h3>

<pre><code>&lt;table border="1"&gt;
    &lt;tr&gt;
        &lt;th&gt;Nama&lt;/th&gt;
        &lt;th&gt;Umur&lt;/th&gt;
    &lt;/tr&gt;

    &lt;tr&gt;
        &lt;td&gt;Andi&lt;/td&gt;
        &lt;td&gt;20&lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;
</code></pre>
      `,
    },
    {
      id: 10,
      levelId: level.id,
      title: "Form Dasar",
      order: 10,
      content: `
        <h3>Pengertian Form</h3>

<p>
Form digunakan untuk menerima input dari pengguna.
</p>

<h3>Contoh Form</h3>

<pre><code>&lt;form&gt;
    &lt;label&gt;Nama:&lt;/label&gt;
    &lt;input type="text" name="nama"&gt;

    &lt;br&gt;&lt;br&gt;

    &lt;label&gt;Password:&lt;/label&gt;
    &lt;input type="password" name="password"&gt;

    &lt;br&gt;&lt;br&gt;

    &lt;button type="submit"&gt;
        Simpan
    &lt;/button&gt;
&lt;/form&gt;
</code></pre>

<h3>Jenis Input Penting</h3>

<pre><code>&lt;input type="text"&gt;
&lt;input type="email"&gt;
&lt;input type="password"&gt;
&lt;input type="number"&gt;
&lt;input type="date"&gt;
&lt;input type="checkbox"&gt;
&lt;input type="radio"&gt;
&lt;input type="submit"&gt;
&lt;input type="reset"&gt;
</code></pre>
      `,
    },
    {
      id: 11,
      levelId: level.id,
      title: "Semantic HTML",
      order: 11,
      content: `
        <h3>Pengertian Semantic HTML</h3>

<p>
Semantic HTML adalah penggunaan tag HTML sesuai makna atau fungsi kontennya.
</p>

<h3>Tag Semantic</h3>

<table>
    <thead>
        <tr>
            <th>Tag</th>
            <th>Fungsi</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>&lt;header&gt;</td>
            <td>Bagian kepala halaman</td>
        </tr>
        <tr>
            <td>&lt;nav&gt;</td>
            <td>Navigasi</td>
        </tr>
        <tr>
            <td>&lt;main&gt;</td>
            <td>Konten utama</td>
        </tr>
        <tr>
            <td>&lt;section&gt;</td>
            <td>Section halaman</td>
        </tr>
        <tr>
            <td>&lt;footer&gt;</td>
            <td>Bagian footer</td>
        </tr>
    </tbody>
</table>

<h3>Contoh Semantic HTML</h3>

<pre><code>&lt;header&gt;
    &lt;h1&gt;Website Belajar HTML&lt;/h1&gt;
&lt;/header&gt;

&lt;nav&gt;
    &lt;a href="#"&gt;Home&lt;/a&gt;
    &lt;a href="#"&gt;Materi&lt;/a&gt;
&lt;/nav&gt;

&lt;main&gt;
    &lt;section&gt;
        &lt;h2&gt;Materi HTML&lt;/h2&gt;
        &lt;p&gt;Belajar semantic HTML.&lt;/p&gt;
    &lt;/section&gt;
&lt;/main&gt;

&lt;footer&gt;
    &lt;p&gt;Copyright 2026&lt;/p&gt;
&lt;/footer&gt;
</code></pre>
      `,
    },
    {
      id: 12,
      levelId: level.id,
      title: "Audio & Video Basic",
      order: 12,
      content: `
        <h3>Contoh Audio</h3>

<pre><code>&lt;audio controls&gt;
    &lt;source 
        src="musik.mp3"
        type="audio/mpeg"
    &gt;
&lt;/audio&gt;
</code></pre>

<h3>Contoh Video</h3>

<pre><code>&lt;video width="400" controls&gt;
    &lt;source 
        src="video.mp4"
        type="video/mp4"
    &gt;
&lt;/video&gt;
</code></pre>
      `,
    },
    {
      id: 13,
      levelId: level.id,
      title: "HTML Entities",
      order: 13,
      content: `
        <h3>Pengertian HTML Entities</h3>

<p>
HTML Entities digunakan untuk menampilkan karakter khusus di HTML.
</p>

<h3>Contoh HTML Entities</h3>

<table>
    <thead>
        <tr>
            <th>Karakter</th>
            <th>Entity</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>&lt;</td>
            <td>&amp;lt;</td>
        </tr>
        <tr>
            <td>&gt;</td>
            <td>&amp;gt;</td>
        </tr>
        <tr>
            <td>&amp;</td>
            <td>&amp;amp;</td>
        </tr>
        <tr>
            <td>\"</td>
            <td>&amp;quot;</td>
        </tr>
    </tbody>
</table>

<h3>Contoh Penggunaan</h3>

<pre><code>&lt;p&gt;&amp;lt;h1&amp;gt;Hello&amp;lt;/h1&amp;gt;&lt;/p&gt;
&lt;p&gt;Harga &amp;gt; 10000&lt;/p&gt;
&lt;p&gt;A &amp;amp; B&lt;/p&gt;
</code></pre>
      `,
    },
    {
      id: 14,
      levelId: level.id,
      title: "Meta Tags Dasar",
      order: 14,
      content: `
        <h3>Pengertian Meta Tags</h3>

<p>
Meta tag digunakan untuk memberikan informasi tentang halaman website.
</p>

<h3>Contoh Meta Tags</h3>

<pre><code>&lt;meta charset="UTF-8"&gt;
&lt;meta 
    name="viewport"
    content="width=device-width, initial-scale=1.0"
&gt;
&lt;meta 
    name="description"
    content="Belajar HTML dasar"
&gt;
&lt;meta 
    name="keywords"
    content="HTML, CSS, JavaScript"
&gt;
</code></pre>
      `,
    },
    {
      id: 15,
      levelId: level.id,
      title: "Attribute HTML",
      order: 15,
      content: `
        <h3>Pengertian Attribute HTML</h3>

<p>
Attribute adalah informasi tambahan yang diberikan pada tag HTML.
</p>

<h3>Contoh Attribute</h3>

<pre><code>&lt;a href="https://google.com"&gt;
    Google
&lt;/a&gt;

&lt;img 
    src="gambar.jpg"
    alt="Gambar"
&gt;

&lt;input 
    type="text"
    placeholder="Masukkan nama"
&gt;
</code></pre>

<h3>Attribute Umum HTML</h3>

<table>
    <thead>
        <tr>
            <th>Attribute</th>
            <th>Fungsi</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>id</td>
            <td>Identitas unik elemen</td>
        </tr>
        <tr>
            <td>class</td>
            <td>Nama class elemen</td>
        </tr>
        <tr>
            <td>style</td>
            <td>CSS inline</td>
        </tr>
        <tr>
            <td>href</td>
            <td>Tujuan link</td>
        </tr>
        <tr>
            <td>src</td>
            <td>Sumber file</td>
        </tr>
    </tbody>
</table>
      `,
    },
  ];

  for (const m of materials) {
    await prisma.material.upsert({
      where: { id: m.id },
      update: {
        title: m.title,
        content: m.content,
        order: m.order,
      },
      create: m,
    });
  }

  console.log("✅ Material Level 1 HTML Basics seeding completed!");
}

const p = new PrismaClient();
seedLevel1Material(p)
  .catch(console.error)
  .finally(() => p.$disconnect());
