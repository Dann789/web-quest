import { PrismaClient } from "@prisma/client";

export async function seedLevel2Material(prisma: PrismaClient) {
  console.log("🌱 Seeding Material Level 2: CSS Styling...");

  const level = await prisma.level.upsert({
    where: { id: 2 },
    update: {
      name: "CSS Styling",
      xpRequired: 250,
      description: "Styling dan layout halaman web dengan CSS",
      iconName: "fa-css3",
      easyNodes: 5,
      mediumNodes: 8,
      hardNodes: 3,
    },
    create: {
      id: 2,
      name: "CSS Styling",
      xpRequired: 250,
      description: "Styling dan layout halaman web dengan CSS",
      iconName: "fa-css3",
      easyNodes: 5,
      mediumNodes: 8,
      hardNodes: 3,
    },
  });

  const materials = [
    {
      id: 16,
      levelId: level.id,
      title: "Pengenalan CSS",
      order: 1,
      content: `
        <h2>Apa itu CSS?</h2>
        <p>CSS (Cascading Style Sheets) adalah bahasa stylesheet yang digunakan untuk mengatur tampilan, layout, dan estetika visual halaman web yang dibuat dengan HTML. CSS bertugas mendesain halaman web agar terlihat lebih indah, rapi, dan ramah pengguna.</p>
        
        <h2>Fungsi Utama CSS</h2>
        <ul>
          <li>Mengatur warna teks, latar belakang, dan batas elemen</li>
          <li>Mengatur jenis font, ukuran, ketebalan, dan perataan teks</li>
          <li>Menentukan layout halaman web (posisi elemen, spasi, kolom)</li>
          <li>Membuat website menjadi responsif (ramah perangkat mobile)</li>
          <li>Menyediakan efek animasi dan transisi interaktif</li>
        </ul>

        <h2>Cara Menghubungkan CSS ke HTML</h2>
        <ol>
          <li><strong>Inline CSS:</strong> Menulis kode langsung di atribut <code>style</code> tag HTML.
            <pre><code>&lt;p style="color: blue;"&gt;Teks ini berwarna biru&lt;/p&gt;</code></pre>
          </li>
          <li><strong>Internal CSS:</strong> Ditulis di dalam tag <code>&lt;style&gt;</code> pada bagian <code>&lt;head&gt;</code>.
            <pre><code>&lt;head&gt;
  &lt;style&gt;
    p { color: green; }
  &lt;/style&gt;
&lt;/head&gt;</code></pre>
          </li>
          <li><strong>External CSS:</strong> Menghubungkan berkas <code>.css</code> terpisah menggunakan tag <code>&lt;link&gt;</code> (Best Practice).
            <pre><code>&lt;link rel="stylesheet" href="style.css"&gt;</code></pre>
          </li>
        </ol>
      `,
    },
    {
      id: 17,
      levelId: level.id,
      title: "CSS Selector Dasar",
      order: 2,
      content: `
        <h2>Apa itu CSS Selector?</h2>
        <p>Selector digunakan untuk memilih atau menargetkan elemen HTML mana yang ingin diberikan gaya visual.</p>

        <h3>1. Element Selector (Tag)</h3>
        <p>Menargetkan seluruh tag HTML tertentu pada halaman web.</p>
        <pre><code>p {
  color: navy;
  font-size: 16px;
}</code></pre>

        <h3>2. Class Selector</h3>
        <p>Menargetkan elemen yang memiliki atribut <code>class</code> tertentu. Ditandai dengan tanda titik (<code>.</code>).</p>
        <pre><code>.highlight {
  background-color: yellow;
}</code></pre>

        <h3>3. ID Selector</h3>
        <p>Menargetkan satu elemen unik yang memiliki atribut <code>id</code>. Ditandai dengan tanda pagar (<code>#</code>).</p>
        <pre><code>#header-utama {
  font-weight: bold;
}</code></pre>
      `,
    },
    {
      id: 18,
      levelId: level.id,
      title: "CSS Colors & Backgrounds",
      order: 3,
      content: `
        <h2>Mengatur Warna Teks dan Background</h2>
        <p>CSS menyediakan beberapa cara untuk merepresentasikan warna:</p>

        <h3>Representasi Warna di CSS</h3>
        <ul>
          <li><strong>Color Name:</strong> Langsung menuliskan nama warna standar Inggris (e.g. <code>red</code>, <code>blue</code>, <code>tomato</code>).</li>
          <li><strong>HEX Code:</strong> Kode hexadecimal 6 karakter diawali tanda pagar (e.g. <code>#ff5733</code>).</li>
          <li><strong>RGB:</strong> Kombinasi nilai Red, Green, Blue antara 0-255 (e.g. <code>rgb(255, 87, 51)</code>).</li>
        </ul>

        <h3>Contoh Penerapan</h3>
        <pre><code>.box-warna {
  color: #333333; /* Warna teks gelap */
  background-color: rgb(240, 240, 240); /* Latar belakang abu-abu terang */
}</code></pre>
      `,
    },
    {
      id: 19,
      levelId: level.id,
      title: "CSS Box Model",
      order: 4,
      content: `
        <h2>Memahami CSS Box Model</h2>
        <p>Di dalam CSS, setiap elemen dianggap sebagai sebuah kotak persegi (box). Box Model terdiri atas empat bagian dari dalam ke luar:</p>
        
        <ol>
          <li><strong>Content:</strong> Isi elemen yang sebenarnya (seperti teks atau gambar).</li>
          <li><strong>Padding:</strong> Ruang spasi kosong antara konten dengan batas terluar konten (border).</li>
          <li><strong>Border:</strong> Batas garis yang membungkus padding dan konten.</li>
          <li><strong>Margin:</strong> Ruang spasi kosong terluar untuk memberi jarak antar-elemen.</li>
        </ol>

        <h3>Contoh Implementasi Box Model</h3>
        <pre><code>.box {
  width: 300px;
  padding: 20px;
  border: 2px solid black;
  margin: 15px;
}</code></pre>
      `,
    },
    {
      id: 20,
      levelId: level.id,
      title: "CSS Typography",
      order: 5,
      content: `
        <h2>Manipulasi Teks dengan CSS</h2>
        <p>CSS memungkinkan Anda mengontrol gaya teks secara sangat detail:</p>

        <h3>Properti Font & Text Utama</h3>
        <table>
          <thead>
            <tr>
              <th>Properti</th>
              <th>Fungsi</th>
              <th>Contoh Nilai</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>font-family</td>
              <td>Menentukan jenis font</td>
              <td>'Arial', sans-serif</td>
            </tr>
            <tr>
              <td>font-size</td>
              <td>Ukuran font</td>
              <td>16px, 1.2rem</td>
            </tr>
            <tr>
              <td>font-weight</td>
              <td>Ketebalan font</td>
              <td>bold, 600, normal</td>
            </tr>
            <tr>
              <td>text-align</td>
              <td>Perataan teks</td>
              <td>center, justify, left</td>
            </tr>
            <tr>
              <td>line-height</td>
              <td>Spasi antar-baris teks</td>
              <td>1.5, 24px</td>
            </tr>
          </tbody>
        </table>
      `,
    },
    {
      id: 21,
      levelId: level.id,
      title: "CSS Display",
      order: 6,
      content: `
        <h3>Pengertian Display</h3>

<p>
Property <strong>display</strong> digunakan untuk menentukan bagaimana sebuah elemen HTML ditampilkan pada halaman website.
</p>

<p>
Display sangat penting dalam mengatur layout dan posisi elemen pada halaman web.
</p>

<h3>Jenis Display yang Sering Digunakan</h3>

<table>
    <thead>
        <tr>
            <th>Value</th>
            <th>Fungsi</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>block</td>
            <td>Elemen tampil memenuhi satu baris</td>
        </tr>
        <tr>
            <td>inline</td>
            <td>Elemen tampil dalam satu baris tanpa line break</td>
        </tr>
        <tr>
            <td>inline-block</td>
            <td>Gabungan inline dan block</td>
        </tr>
        <tr>
            <td>none</td>
            <td>Menyembunyikan elemen</td>
        </tr>
        <tr>
            <td>flex</td>
            <td>Membuat layout fleksibel</td>
        </tr>
        <tr>
            <td>grid</td>
            <td>Membuat layout berbasis grid</td>
        </tr>
    </tbody>
</table>

<h3>Contoh Display Block</h3>

<pre><code>.box {
    display: block;
}
</code></pre>

<h3>Contoh Display Inline</h3>

<pre><code>span {
    display: inline;
}
</code></pre>

<h3>Contoh Display None</h3>

<pre><code>.hidden {
    display: none;
}
</code></pre>

<h3>Contoh Implementasi HTML &amp; CSS</h3>

<pre><code>&lt;div class="box"&gt;
    Box Pertama
&lt;/div&gt;

&lt;div class="box"&gt;
    Box Kedua
&lt;/div&gt;
</code></pre>

<pre><code>.box {
    display: inline-block;
    width: 150px;
    height: 100px;
    background-color: lightblue;
}
</code></pre>
      `,
    },
    {
      id: 22,
      levelId: level.id,
      title: "CSS Position",
      order: 7,
      content: `
        <h3>Pengertian Position</h3>

<p>
Property <strong>position</strong> digunakan untuk mengatur posisi elemen pada halaman website.
</p>

<h3>Jenis Position</h3>

<table>
    <thead>
        <tr>
            <th>Value</th>
            <th>Fungsi</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>static</td>
            <td>Posisi default elemen</td>
        </tr>
        <tr>
            <td>relative</td>
            <td>Posisi relatif terhadap posisi awal</td>
        </tr>
        <tr>
            <td>absolute</td>
            <td>Posisi relatif terhadap parent</td>
        </tr>
        <tr>
            <td>fixed</td>
            <td>Posisi tetap pada layar</td>
        </tr>
        <tr>
            <td>sticky</td>
            <td>Menempel saat discroll</td>
        </tr>
    </tbody>
</table>

<h3>Contoh Position Relative</h3>

<pre><code>.box {
    position: relative;
    left: 20px;
    top: 10px;
}
</code></pre>

<h3>Contoh Position Absolute</h3>

<pre><code>.parent {
    position: relative;
}

.child {
    position: absolute;
    top: 0;
    right: 0;
}
</code></pre>

<h3>Contoh Position Fixed</h3>

<pre><code>.navbar {
    position: fixed;
    top: 0;
    width: 100%;
}
</code></pre>

<h3>Contoh HTML</h3>

<pre><code>&lt;div class="parent"&gt;
    &lt;div class="child"&gt;
        Box
    &lt;/div&gt;
&lt;/div&gt;
</code></pre>

      `,
    },
    {
      id: 23,
      levelId: level.id,
      title: "CSS Flexbox Dasar",
      order: 8,
      content: `
        <h2>Pengenalan CSS Flexbox Layout</h2>
        <p>CSS Flexbox adalah modul tata letak satu dimensi yang memudahkan Anda mengatur susunan elemen anak (flex items) di dalam elemen induk (flex container), bahkan ketika ukurannya tidak diketahui.</p>

        <h3>Properti Penting Flexbox</h3>
        <ul>
          <li><code>display: flex;</code>: Mengaktifkan mode tata letak Flexbox pada container induk.</li>
          <li><code>flex-direction</code>: Menentukan arah susunan (e.g. <code>row</code> mendatar, <code>column</code> menurun).</li>
          <li><code>justify-content</code>: Mengatur perataan elemen secara horizontal (e.g. <code>center</code>, <code>space-between</code>).</li>
          <li><code>align-items</code>: Mengatur perataan elemen secara vertikal (e.g. <code>center</code>, <code>stretch</code>).</li>
        </ul>
      `,
    },
    {
      id: 24,
      levelId: level.id,
      title: "Pengenalan CSS Grid",
      order: 9,
      content: `
        <h3>Pengertian Grid</h3>

<p>
CSS Grid digunakan untuk membuat layout website berbentuk baris dan kolom secara lebih mudah dan fleksibel.
</p>

<p>
Grid sangat cocok digunakan untuk membuat dashboard, galeri, layout website, dan tampilan modern lainnya.
</p>

<h3>Property Grid Penting</h3>

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Fungsi</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>display: grid</td>
            <td>Mengaktifkan grid layout</td>
        </tr>
        <tr>
            <td>grid-template-columns</td>
            <td>Mengatur jumlah kolom</td>
        </tr>
        <tr>
            <td>grid-template-rows</td>
            <td>Mengatur jumlah baris</td>
        </tr>
        <tr>
            <td>gap</td>
            <td>Jarak antar item</td>
        </tr>
    </tbody>
</table>

<h3>Contoh Grid Dasar</h3>

<pre><code>.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
}
</code></pre>

<h3>Contoh HTML Grid</h3>

<pre><code>&lt;div class="container"&gt;
    &lt;div class="item"&gt;1&lt;/div&gt;
    &lt;div class="item"&gt;2&lt;/div&gt;
    &lt;div class="item"&gt;3&lt;/div&gt;
&lt;/div&gt;
</code></pre>

<h3>Contoh CSS Lengkap</h3>

<pre><code>.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}

.item {
    background-color: lightblue;
    padding: 20px;
    text-align: center;
}
</code></pre>
      `,
    },
    {
      id: 25,
      levelId: level.id,
      title: "Responsive Design/Media Query",
      order: 10,
      content: `
        <h3>Pengertian Responsive Design</h3>

<p>
Responsive design adalah teknik membuat tampilan website agar dapat menyesuaikan ukuran layar perangkat.
</p>

<p>
Website responsive dapat tampil baik di:
</p>

<ul>
    <li>Laptop</li>
    <li>Komputer</li>
    <li>Tablet</li>
    <li>Smartphone</li>
</ul>

<h3>Pengertian Media Query</h3>

<p>
Media query digunakan untuk memberikan style CSS berbeda berdasarkan ukuran layar perangkat.
</p>

<h3>Contoh Media Query</h3>

<pre><code>@media screen and (max-width: 768px) {
    body {
        background-color: lightgray;
    }
}
</code></pre>

<h3>Contoh Responsive Grid</h3>

<pre><code>.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

@media screen and (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
    }
}
</code></pre>

<h3>Contoh HTML</h3>

<pre><code>&lt;div class="container"&gt;
    &lt;div class="item"&gt;Item 1&lt;/div&gt;
    &lt;div class="item"&gt;Item 2&lt;/div&gt;
    &lt;div class="item"&gt;Item 3&lt;/div&gt;
&lt;/div&gt;
</code></pre>
      `,
    },
    {
      id: 26,
      levelId: level.id,
      title: "Hover",
      order: 11,
      content: `
        <h3>Pengertian Hover</h3>

<p>
Hover adalah efek CSS yang aktif ketika cursor mouse berada di atas sebuah elemen.
</p>

<p>
Hover biasanya digunakan pada:
</p>

<ul>
    <li>Button</li>
    <li>Link</li>
    <li>Card</li>
    <li>Menu navigasi</li>
</ul>

<h3>Syntax Hover</h3>

<pre><code>selector:hover {
    property: value;
}
</code></pre>

<h3>Contoh Hover Button</h3>

<pre><code>.btn {
    background-color: blue;
    color: white;
}

.btn:hover {
    background-color: darkblue;
}
</code></pre>

<h3>Contoh HTML</h3>

<pre><code>&lt;button class="btn"&gt;
    Klik Saya
&lt;/button&gt;
</code></pre>

<h3>Contoh Hover Card</h3>

<pre><code>.card:hover {
    transform: scale(1.05);
}
</code></pre>
      `,
    },
    {
      id: 27,
      levelId: level.id,
      title: "Transition",
      order: 12,
      content: `
        <h3>Pengertian Transition</h3>

<p>
Transition digunakan untuk memberikan efek animasi perubahan style secara halus.
</p>

<p>
Transition sering digunakan bersama hover agar animasi terlihat lebih smooth.
</p>

<h3>Property Transition</h3>

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Fungsi</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>transition-property</td>
            <td>Property yang dianimasikan</td>
        </tr>
        <tr>
            <td>transition-duration</td>
            <td>Durasi animasi</td>
        </tr>
        <tr>
            <td>transition-delay</td>
            <td>Delay animasi</td>
        </tr>
        <tr>
            <td>transition-timing-function</td>
            <td>Kecepatan animasi</td>
        </tr>
    </tbody>
</table>

<h3>Contoh Transition Dasar</h3>

<pre><code>.box {
    background-color: blue;
    transition: 0.3s;
}

.box:hover {
    background-color: red;
}
</code></pre>

<h3>Contoh Transition Lengkap</h3>

<pre><code>.card {
    width: 200px;
    padding: 20px;
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-10px);
}
</code></pre>

<h3>Contoh HTML</h3>

<pre><code>&lt;div class="card"&gt;
    Card Hover
&lt;/div&gt;
</code></pre>
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

  console.log("✅ Material Level 2 CSS Styling seeding completed!");
}
