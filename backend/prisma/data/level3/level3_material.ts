import { PrismaClient } from "@prisma/client";

export async function seedLevel3Material(prisma: PrismaClient) {
  console.log("🌱 Seeding Material Level 3: JavaScript Basics...");

  const level = await prisma.level.upsert({
    where: { id: 3 },
    update: {
      name: "JavaScript Basics",
      xpRequired: 500,
      description: "Interaktivitas dan logika pemrograman dengan JavaScript",
      iconName: "fa-js",
      easyNodes: 4,
      mediumNodes: 4,
      hardNodes: 3,
    },
    create: {
      id: 3,
      name: "JavaScript Basics",
      xpRequired: 500,
      description: "Interaktivitas dan logika pemrograman dengan JavaScript",
      iconName: "fa-js",
      easyNodes: 4,
      mediumNodes: 4,
      hardNodes: 3,
    },
  });

  const materials = [
    {
      id: 28,
      levelId: level.id,
      title: "Pengenalan JavaScript",
      order: 1,
      content: `
        <h2>Apa itu JavaScript?</h2>
        <p>JavaScript adalah bahasa pemrograman scripting yang digunakan untuk membuat halaman website menjadi interaktif, dinamis, dan hidup. Jika HTML menentukan struktur dan CSS menentukan visual, maka JavaScript bertugas memberikan 'otak' dan interaksi pada halaman tersebut.</p>

        <h2>Fungsi Utama JavaScript</h2>
        <ul>
          <li>Memvalidasi data input pada form sebelum dikirim ke server</li>
          <li>Membuat slider gambar, galeri interaktif, dan modal pop-up</li>
          <li>Mengambil dan mengirim data secara dinamis dari background tanpa me-refresh halaman (AJAX/Fetch API)</li>
          <li>Memanipulasi struktur HTML dan CSS (DOM Manipulation) secara langsung</li>
          <li>Membangun logika game berbasis browser</li>
        </ul>

        <h2>Cara Menulis JavaScript</h2>
        <ol>
          <li><strong>Internal Script:</strong> Ditulis di dalam tag <code>&lt;script&gt;</code> di dalam HTML (biasanya sebelum penutup tag <code>&lt;/body&gt;</code>).
            <pre><code>&lt;script&gt;
  console.log("Halo dari JavaScript!");
&lt;/script&gt;</code></pre>
          </li>
          <li><strong>External Script:</strong> Menghubungkan berkas <code>.js</code> eksternal menggunakan atribut <code>src</code> (Best Practice).
            <pre><code>&lt;script src="script.js"&gt;&lt;/script&gt;</code></pre>
          </li>
        </ol>
      `,
    },
    {
      id: 29,
      levelId: level.id,
      title: "Variabel & Tipe Data",
      order: 2,
      content: `
        <h2>Deklarasi Variabel di JavaScript</h2>
        <p>Variabel adalah wadah penyimpanan data sementara. Di JavaScript modern (ES6+), ada dua keyword utama untuk membuat variabel:</p>
        
        <ul>
          <li><code>let</code>: Digunakan untuk mendeklarasikan variabel yang nilainya **dapat diubah** kemudian hari.</li>
          <li><code>const</code>: Digunakan untuk mendeklarasikan konstanta yang nilainya **tidak dapat diubah** setelah diisi pertama kali.</li>
        </ul>

        <h3>Tipe Data Primitif Utama</h3>
        <table>
          <thead>
            <tr>
              <th>Tipe Data</th>
              <th>Deskripsi</th>
              <th>Contoh Penulisan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>String</td>
              <td>Teks dibungkus tanda kutip</td>
              <td>"John Doe"</td>
            </tr>
            <tr>
              <td>Number</td>
              <td>Angka bulat atau desimal</td>
              <td>25, 3.14</td>
            </tr>
            <tr>
              <td>Boolean</td>
              <td>Nilai kebenaran logika</td>
              <td>true / false</td>
            </tr>
            <tr>
              <td>Undefined</td>
              <td>Variabel yang belum diisi nilai</td>
              <td>let x;</td>
            </tr>
            <tr>
              <td>Null</td>
              <td>Representasi nilai kosong yang disengaja</td>
              <td>let y = null;</td>
            </tr>
          </tbody>
        </table>
      `,
    },
    {
      id: 30,
      levelId: level.id,
      title: "Conditional",
      order: 3,
      content: `
        <h3>Pengertian Conditional</h3>

<p>
Conditional digunakan untuk menjalankan kode berdasarkan kondisi tertentu.
</p>

<p>
JavaScript akan mengecek apakah suatu kondisi bernilai <strong>true</strong> atau <strong>false</strong>.
</p>

<h3>Jenis Conditional</h3>

<ul>
    <li>if</li>
    <li>if else</li>
    <li>else if</li>
    <li>switch</li>
</ul>

<h3>Operator Logika & Perbandingan</h3>
<p>Dalam membuat kondisi, kita sering membandingkan nilai menggunakan operator berikut:</p>
<ul>
    <li><code>===</code> : Sama dengan (tipe data dan nilai harus persis sama)</li>
    <li><code>!==</code> : Tidak sama dengan</li>
    <li><code>></code> atau <code><</code> : Lebih besar / Lebih kecil</li>
    <li><code>&&</code> : AND (Semua kondisi harus <strong>true</strong>)</li>
    <li><code>||</code> : OR (Salah satu kondisi harus <strong>true</strong>)</li>
</ul>

<pre><code>// Contoh penggunaan operator AND (&&) dan Sama Dengan (===)
if (username === "admin" && password === "123") {
    console.log("Login Berhasil");
}</code></pre>

<h3>Contoh If</h3>

<pre><code>let umur = 18;

if (umur >= 17) {
    console.log("Boleh membuat SIM");
}
</code></pre>

<h3>Contoh If Else</h3>

<pre><code>let nilai = 75;

if (nilai >= 75) {
    console.log("Lulus");
} else {
    console.log("Tidak Lulus");
}
</code></pre>

<h3>Contoh Else If</h3>

<pre><code>let nilai = 85;

if (nilai >= 90) {
    console.log("Grade A");
} else if (nilai >= 80) {
    console.log("Grade B");
} else {
    console.log("Grade C");
}
</code></pre>

<h3>Contoh Switch</h3>

<pre><code>let hari = "Senin";

switch (hari) {
    case "Senin":
        console.log("Hari kerja");
        break;

    case "Minggu":
        console.log("Hari libur");
        break;

    default:
        console.log("Hari biasa");
}
</code></pre>
      `,
    },
    {
      id: 31,
      levelId: level.id,
      title: "Looping",
      order: 4,
      content: `
        <h3>Pengertian Looping</h3>

<p>
Looping digunakan untuk menjalankan kode secara berulang.
</p>

<h3>Jenis Looping</h3>

<ul>
    <li>for</li>
    <li>while</li>
    <li>do while</li>
    <li>for of</li>
</ul>

<h3>Contoh For Loop</h3>

<pre><code>for (let i = 1; i <= 5; i++) {
    console.log(i);
}
</code></pre>

<h3>Contoh While</h3>

<pre><code>let angka = 1;

while (angka <= 5) {
    console.log(angka);
    angka++;
}
</code></pre>

<h3>Contoh Do While</h3>

<pre><code>let nomor = 1;

do {
    console.log(nomor);
    nomor++;
} while (nomor <= 5);
</code></pre>

<h3>Contoh For Of</h3>

<pre><code>let buah = ["Apel", "Mangga", "Jeruk"];

for (let item of buah) {
    console.log(item);
}
</code></pre>
      `,
    },
    {
      id: 32,
      levelId: level.id,
      title: "Array",
      order: 5,
      content: `
        <h3>Pengertian Array</h3>

<p>
Array digunakan untuk menyimpan banyak data dalam satu variabel.
</p>

<h3>Contoh Array</h3>

<pre><code>let buah = ["Apel", "Mangga", "Jeruk"];
</code></pre>

<h3>Mengakses Data Array</h3>

<pre><code>let buah = ["Apel", "Mangga", "Jeruk"];

console.log(buah[0]);
console.log(buah[1]);
</code></pre>

<h3>Menambahkan Data Array</h3>

<pre><code>let buah = ["Apel", "Mangga"];

buah.push("Jeruk");

console.log(buah);
</code></pre>

<h3>Menghapus Data Array</h3>

<pre><code>let buah = ["Apel", "Mangga", "Jeruk"];

buah.pop();

console.log(buah);
</code></pre>

<h3>Looping Array</h3>

<pre><code>let angka = [1, 2, 3, 4];

angka.forEach(function(item) {
    console.log(item);
});
</code></pre>
      `,
    },
    {
      id: 33,
      levelId: level.id,
      title: "Function Dasar",
      order: 6,
      content: `
        <h3>Pengertian Function</h3>

<p>
Function adalah blok kode yang dapat digunakan kembali untuk menjalankan tugas tertentu.
</p>

<h3>Keuntungan Function</h3>

<ul>
    <li>Kode lebih rapi</li>
    <li>Mudah digunakan ulang</li>
    <li>Mengurangi duplikasi kode</li>
</ul>

<h3>Contoh Function Dasar</h3>

<pre><code>function salam() {
    console.log("Hello JavaScript");
}

salam();
</code></pre>

<h3>Function Dengan Parameter</h3>

<pre><code>function tambah(a, b) {
    return a + b;
}

console.log(tambah(5, 3));
</code></pre>

<h3>Arrow Function</h3>

<pre><code>const kali = (a, b) => {
    return a * b;
};

console.log(kali(4, 2));
</code></pre>
      `,
    },
    {
      id: 34,
      levelId: level.id,
      title: "Object",
      order: 7,
      content: `
        <h3>Pengertian Object</h3>

<p>
Object digunakan untuk menyimpan data dalam bentuk pasangan key dan value.
</p>

<h3>Contoh Object</h3>

<pre><code>let mahasiswa = {
    nama: "Budi",
    umur: 20,
    jurusan: "Teknik Informatika"
};
</code></pre>

<h3>Mengakses Property Object</h3>

<pre><code>console.log(mahasiswa.nama);
console.log(mahasiswa.umur);
</code></pre>

<h3>Menambahkan Property</h3>

<pre><code>mahasiswa.alamat = "Malang";

console.log(mahasiswa);
</code></pre>

<h3>Object Dengan Function</h3>

<pre><code>let user = {
    nama: "Andi",

    salam: function() {
        console.log("Hello " + this.nama);
    }
};

user.salam();
</code></pre>
      `,
    },
    {
      id: 35,
      levelId: level.id,
      title: "DOM Manipulation",
      order: 8,
      content: `
        <h3>Pengertian DOM Manipulation</h3>

<p>
DOM (Document Object Model) Manipulation digunakan untuk mengubah isi HTML menggunakan JavaScript.
</p>

<p>
Dengan DOM, JavaScript dapat:
</p>

<ul>
    <li>Mengubah teks</li>
    <li>Mengubah style</li>
    <li>Menambah elemen</li>
    <li>Menghapus elemen</li>
</ul>

<h3>Memilih Elemen HTML</h3>

<pre><code>document.getElementById("judul");

document.querySelector(".box");
</code></pre>

<h3>Mengubah Isi Teks</h3>

<pre><code>document.getElementById("judul").innerHTML = 
    "Belajar JavaScript";
</code></pre>

<h3>Mengubah CSS Dengan JavaScript</h3>

<pre><code>document.getElementById("judul").style.color = 
    "blue";
</code></pre>

<h3>Contoh HTML</h3>

<pre><code>&lt;h1 id="judul"&gt;
    Hello World
&lt;/h1&gt;
</code></pre>

<h3>Contoh JavaScript</h3>

<pre><code>document.getElementById("judul").innerHTML = 
    "Hello JavaScript";
</code></pre>
      `,
    },
    {
      id: 36,
      levelId: level.id,
      title: "Event Handling",
      order: 9,
      content: `
        <h3>Pengertian Event Handling</h3>

<p>
Event handling digunakan untuk menjalankan kode ketika suatu event terjadi.
</p>

<p>
Contoh event:
</p>

<ul>
    <li>click</li>
    <li>submit</li>
    <li>keyup</li>
    <li>mouseover</li>
</ul>

<h3>Contoh Event Click</h3>

<pre><code>&lt;button onclick="tampilPesan()"&gt;
    Klik Saya
&lt;/button&gt;
</code></pre>

<pre><code>function tampilPesan() {
    alert("Button diklik");
}
</code></pre>

<h3>Event Listener</h3>

<pre><code>const button = document.querySelector("button");

button.addEventListener("click", function() {
    alert("Button ditekan");
});
</code></pre>

<h3>Contoh Mouseover</h3>

<pre><code>const box = document.querySelector(".box");

box.addEventListener("mouseover", function() {
    box.style.backgroundColor = "red";
});
</code></pre>
      `,
    },
    {
      id: 37,
      levelId: level.id,
      title: "Form Validation",
      order: 10,
      content: `
        <h3>Pengertian Form Validation</h3>

<p>
Form validation digunakan untuk memastikan input pengguna sudah benar sebelum dikirim.
</p>

<h3>Tujuan Form Validation</h3>

<ul>
    <li>Mencegah data kosong</li>
    <li>Mengecek format input</li>
    <li>Meningkatkan keamanan data</li>
</ul>

<h3>Contoh HTML Form</h3>

<pre><code>&lt;form id="formLogin"&gt;
    &lt;input 
        type="text"
        id="username"
        placeholder="Username"
    &gt;

    &lt;button type="submit"&gt;
        Login
    &lt;/button&gt;
&lt;/form&gt;
</code></pre>

<h3>Contoh Validation Dasar</h3>

<pre><code>const form = document.getElementById("formLogin");

form.addEventListener("submit", function(event) {

    let username = 
        document.getElementById("username").value;

    if (username === "") {
        event.preventDefault();

        alert("Username tidak boleh kosong");
    }

});
</code></pre>

        <h3>Validasi Panjang Password</h3>

<pre><code>if (password.length < 8) {
    alert("Password minimal 8 karakter");
}
</code></pre>

<h3>Validasi Email Sederhana</h3>

<pre><code>if (!email.includes("@")) {
    alert("Format email tidak valid");
}
</code></pre>
      `,
    },
    {
      id: 38,
      levelId: level.id,
      title: "DOM Manipulation Lanjutan",
      order: 11,
      content: `
        <h3>Mengelola Class (classList)</h3>
        <p>Properti <code>classList</code> sangat berguna untuk menambah, menghapus, atau mengganti class CSS pada sebuah elemen (misalnya untuk fitur Dark Mode).</p>
        <pre><code>const box = document.getElementById("box");
// Menambah class
box.classList.add("dark");
// Menghapus class
box.classList.remove("dark");
// Mengganti otomatis (jika ada dihapus, jika tidak ada ditambah)
box.classList.toggle("dark");</code></pre>

        <h3>Membuat & Memasukkan Elemen Baru</h3>
        <p>Selain menggunakan <code>innerHTML</code>, kita bisa membuat elemen secara spesifik lalu memasukkannya ke dalam struktur HTML (seperti membuat Todo List).</p>
        <pre><code>// 1. Buat elemen baru
const li = document.createElement("li");
li.innerText = "Belajar JavaScript";

// 2. Masukkan ke dalam elemen parent (ul)
const ul = document.getElementById("list");
ul.appendChild(li);</code></pre>
      `,
    },
    {
      id: 39,
      levelId: level.id,
      title: "Array Method Lanjutan",
      order: 12,
      content: `
        <h3>Method .map()</h3>
        <p>Method <code>map()</code> membuat <strong>array baru</strong> dengan hasil dari pemanggilan fungsi pada setiap elemen array awal. Sangat berguna untuk mengubah format data.</p>
        <pre><code>const angka = [1, 2, 3];
const dikaliDua = angka.map(item => item * 2);
console.log(dikaliDua); // Hasil: [2, 4, 6]</code></pre>

        <h3>Method .filter()</h3>
        <p>Method <code>filter()</code> membuat <strong>array baru</strong> yang hanya berisi elemen-elemen yang <strong>lulus uji</strong> dari kondisi tertentu.</p>
        <pre><code>const angka = [1, 2, 3, 6, 7, 8];
// Ambil angka yang lebih besar dari 5
const hasil = angka.filter(item => item > 5);
console.log(hasil); // Hasil: [6, 7, 8]</code></pre>
      `,
    },
    {
      id: 40,
      levelId: level.id,
      title: "Async JavaScript & Fetch API",
      order: 13,
      content: `
        <h3>Pengertian Asynchronous</h3>
        <p>JavaScript biasanya mengeksekusi kode baris per baris. Namun, operasi seperti mengambil data dari server membutuhkan waktu (Asynchronous). Kita menggunakan kata kunci <code>async</code> dan <code>await</code> agar JavaScript mau "menunggu" proses tersebut selesai sebelum melanjutkan ke baris berikutnya.</p>

        <h3>Fetch API & JSON</h3>
        <p><code>fetch()</code> digunakan untuk memanggil API. Format data balasan dari server umumnya berupa teks JSON, sehingga kita harus mengubahnya menjadi object JavaScript menggunakan <code>JSON.parse()</code> atau method <code>.json()</code>.</p>
        <pre><code>async function getData() {
    // 1. Tunggu data di-download
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    // 2. Tunggu konversi ke JSON selesai
    const data = await response.json(); 
    console.log(data.title);
}</code></pre>

        <h3>Error Handling (Try-Catch)</h3>
        <p>Sangat penting menangani potensi kegagalan (seperti internet putus) saat menggunakan Fetch. Gunakan blok <code>try...catch</code>.</p>
        <pre><code>async function getData() {
    try {
        const response = await fetch("url-api");
        const data = await response.json();
    } catch (error) {
        // Blok ini dieksekusi jika terjadi error
        console.log("Terjadi masalah: ", error);
    }
}</code></pre>
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

  console.log("✅ Material Level 3 JavaScript Basics seeding completed!");
}

const p = new PrismaClient();
seedLevel3Material(p)
  .catch(console.error)
  .finally(() => p.$disconnect());