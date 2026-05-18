import { PrismaClient } from "@prisma/client";

export async function seedLevel4Material(prisma: PrismaClient) {
  console.log("🌱 Seeding Material Level 4: PHP...");

  const level = await prisma.level.upsert({
    where: { id: 4 },
    update: {
      name: "PHP Programming",
      xpRequired: 1000,
      description: "Pemrograman server-side dengan PHP",
      iconName: "fa-php",
      easyNodes: 3,
      mediumNodes: 4,
      hardNodes: 3,
    },
    create: {
      id: 4,
      name: "PHP Programming",
      xpRequired: 1000,
      description: "Pemrograman server-side dengan PHP",
      iconName: "fa-php",
      easyNodes: 3,
      mediumNodes: 4,
      hardNodes: 3,
    },
  });

  const materials = [
    {
      id: 27,
      levelId: level.id,
      title: "Pengenalan PHP",
      order: 1,
      content: `
        <h2>Apa itu PHP?</h2>
        <p>PHP (Hypertext Preprocessor) adalah bahasa pemrograman server-side yang dirancang khusus untuk pengembangan web dinamis. Berbeda dengan HTML, CSS, dan JavaScript yang berjalan di browser pengguna (client-side), kode PHP dieksekusi di server web, lalu hasilnya dikirim ke browser berupa file HTML biasa.</p>

        <h2>Cara Kerja PHP</h2>
        <p>Ketika pengguna meminta halaman web ber-ekstensi <code>.php</code>, server web akan memproses kode PHP tersebut terlebih dahulu menggunakan interpreter PHP, lalu menerjemahkannya menjadi HTML polos untuk dikirim kembali ke browser client.</p>

        <h2>Syntax Dasar PHP</h2>
        <p>Setiap berkas PHP harus dibungkus dengan tag pembuka <code>&lt;?php</code> dan tag penutup <code>?&gt;</code>.</p>
        <pre><code>&lt;?php
echo "Halo, selamat datang di Web-Quest!";
?&gt;</code></pre>
        <p><em>Catatan: Setiap baris perintah di PHP wajib diakhiri dengan titik koma (<code>;</code>). Jika terlewat, PHP akan memicu error Syntax Error.</em></p>
      `,
    },
    {
      id: 28,
      levelId: level.id,
      title: "Variabel & Tipe Data PHP",
      order: 2,
      content: `
        <h2>Deklarasi Variabel di PHP</h2>
        <p>Di PHP, variabel dideklarasikan menggunakan tanda dolar (<code>$</code>) diikuti nama variabelnya. PHP bersifat *loosely typed*, artinya kita tidak perlu mendefinisikan tipe data variabel secara eksplisit.</p>

        <pre><code>&lt;?php
$nama = "Aditya";
$umur = 21;
$IPK = 3.85;
$lulus = true;
?&gt;</code></pre>

        <h3>Konkatenasi String (Penggabung Teks)</h3>
        <p>Di PHP, operator penggabung string menggunakan tanda titik (<code>.</code>), berbeda dengan JavaScript yang menggunakan tanda tambah (<code>+</code>).</p>
        <pre><code>&lt;?php
echo "Nama saya " . $nama . ", umur " . $umur . " tahun.";
?&gt;</code></pre>
      `,
    },
    {
      id: 29,
      levelId: level.id,
      title: "Operator",
      order: 3,
      content: `
        <h3>Pengertian Operator</h3>

<p>
Operator pada PHP digunakan untuk melakukan operasi terhadap variabel dan nilai.
</p>

<h3>Jenis Operator PHP</h3>

<table>
    <thead>
        <tr>
            <th>Jenis Operator</th>
            <th>Fungsi</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Aritmatika</td>
            <td>Perhitungan matematika</td>
        </tr>
        <tr>
            <td>Perbandingan</td>
            <td>Membandingkan nilai</td>
        </tr>
        <tr>
            <td>Logika</td>
            <td>Operasi logika</td>
        </tr>
        <tr>
            <td>Assignment</td>
            <td>Memberikan nilai variabel</td>
        </tr>
    </tbody>
</table>

<h3>Contoh Operator Aritmatika</h3>

<pre><code>&lt;?php

$a = 10;
$b = 5;

echo $a + $b;
echo $a - $b;
echo $a * $b;
echo $a / $b;

?&gt;
</code></pre>

<h3>Contoh Operator Perbandingan</h3>

<pre><code>&lt;?php

$nilai = 80;

if ($nilai &gt;= 75) {
    echo "Lulus";
}

?&gt;
</code></pre>

<h3>Contoh Operator Logika</h3>

<pre><code>&lt;?php

$username = "admin";
$password = "123";

if ($username == "admin" &amp;&amp; $password == "123") {
    echo "Login berhasil";
}

?&gt;
</code></pre>
      `,
    },
    {
      id: 30,
      levelId: level.id,
      title: "Conditional",
      order: 4,
      content: `
        <h3>Pengertian Conditional</h3>

<p>
Conditional digunakan untuk menjalankan kode berdasarkan kondisi tertentu.
</p>

<h3>Jenis Conditional</h3>

<ul>
    <li>if</li>
    <li>if else</li>
    <li>else if</li>
    <li>switch</li>
</ul>

<h3>Contoh If Else</h3>

<pre><code>&lt;?php

$umur = 18;

if ($umur &gt;= 17) {
    echo "Boleh membuat SIM";
} else {
    echo "Belum cukup umur";
}

?&gt;
</code></pre>

<h3>Contoh Else If</h3>

<pre><code>&lt;?php

$nilai = 85;

if ($nilai &gt;= 90) {
    echo "Grade A";
} elseif ($nilai &gt;= 80) {
    echo "Grade B";
} else {
    echo "Grade C";
}

?&gt;
</code></pre>

<h3>Contoh Switch</h3>

<pre><code>&lt;?php

$hari = "Senin";

switch ($hari) {

    case "Senin":
        echo "Hari kerja";
        break;

    case "Minggu":
        echo "Hari libur";
        break;

    default:
        echo "Hari biasa";
}

?&gt;
</code></pre>
      `,
    },
    {
      id: 31,
      levelId: level.id,
      title: "Looping",
      order: 5,
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
    <li>foreach</li>
</ul>

<h3>Contoh For Loop</h3>

<pre><code>&lt;?php

for ($i = 1; $i &lt;= 5; $i++) {
    echo $i;
}

?&gt;
</code></pre>

<h3>Contoh While</h3>

<pre><code>&lt;?php

$angka = 1;

while ($angka &lt;= 5) {
    echo $angka;
    $angka++;
}

?&gt;
</code></pre>

<h3>Contoh Foreach</h3>

<pre><code>&lt;?php

$buah = ["Apel", "Mangga", "Jeruk"];

foreach ($buah as $item) {
    echo $item;
}

?&gt;
</code></pre>
      `,
    },
    {
      id: 32,
      levelId: level.id,
      title: "Function",
      order: 6,
      content: `
        <h3>Pengertian Function</h3>

<p>
Function digunakan untuk membungkus kode agar bisa digunakan kembali (reusable).
</p>

<h3>Membuat Function</h3>

<pre><code>&lt;?php

function sapa($nama) {
    echo "Halo, " . $nama;
}

// Memanggil function
sapa("Budi");

?&gt;
</code></pre>

<h3>Function dengan Return</h3>

<pre><code>&lt;?php

function tambah($a, $b) {
    return $a + $b;
}

echo tambah(10, 5);

?&gt;
</code></pre>
      `,
    },
    {
      id: 33,
      levelId: level.id,
      title: "Array di PHP",
      order: 7,
      content: `
        <h2>Mengelola Banyak Data dengan Array</h2>
        <p>Array di PHP dapat menampung banyak data dalam satu variabel. Ada dua jenis array yang umum digunakan:</p>

        <h3>1. Indexed Array</h3>
        <p>Array dengan indeks berupa angka berurutan dimulai dari 0.</p>
        <pre><code>&lt;?php
$teknologi = array("HTML", "CSS", "PHP");
// Atau penulisan modern:
$teknologi = ["HTML", "CSS", "PHP"];

echo $teknologi[2]; // Output: PHP
?&gt;</code></pre>

        <h3>2. Associative Array</h3>
        <p>Array yang menggunakan key bernama (string) untuk mengakses nilainya menggunakan operator panah (<code>=&gt;</code>).</p>
        <pre><code>&lt;?php
$mahasiswa = [
  "nama" => "Wildan",
  "nim" => "2241760086",
  "jurusan" => "TI"
];

echo $mahasiswa["nama"]; // Output: Wildan
?&gt;</code></pre>
      `,
    },
    {
      id: 34,
      levelId: level.id,
      title: "Form Handling",
      order: 8,
      content: `
        <h3>Pengertian Form Handling</h3>

<p>
Form handling digunakan untuk menerima data dari form HTML menggunakan PHP.
</p>

<h3>Contoh Form HTML</h3>

<pre><code>&lt;form method="POST"&gt;

    &lt;input 
        type="text"
        name="nama"
        placeholder="Masukkan nama"
    &gt;

    &lt;button type="submit"&gt;
        Kirim
    &lt;/button&gt;

&lt;/form&gt;
</code></pre>

<h3>Mengambil Data Form</h3>

<pre><code>&lt;?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nama = $_POST["nama"];

    echo "Hello " . $nama;
}

?&gt;
</code></pre>

<h3>Method Form</h3>

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Fungsi</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>GET</td>
            <td>Mengirim data melalui URL</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>Mengirim data secara aman</td>
        </tr>
    </tbody>
</table>
      `,
    },
    {
      id: 35,
      levelId: level.id,
      title: "Session di PHP",
      order: 9,
      content: `
        <h3>Pengertian Session</h3>

<p>
Session digunakan untuk menyimpan data pengguna sementara selama pengguna membuka website.
</p>

<h3>Fungsi Session</h3>

<ul>
    <li>Menyimpan status login</li>
    <li>Menyimpan data user</li>
    <li>Menyimpan keranjang belanja</li>
</ul>

<h3>Memulai Session</h3>

<pre><code>&lt;?php

session_start();

?&gt;
</code></pre>

<h3>Menyimpan Data Session</h3>

<pre><code>&lt;?php

session_start();

$_SESSION["username"] = "admin";

?&gt;
</code></pre>

<h3>Mengambil Data Session</h3>

<pre><code>&lt;?php

session_start();

echo $_SESSION["username"];

?&gt;
</code></pre>

<h3>Menghapus Session</h3>

<pre><code>&lt;?php

session_start();

session_destroy();

?&gt;
</code></pre>
      `,
    },
    {
      id: 36,
      levelId: level.id,
      title: "Cookies di PHP",
      order: 10,
      content: `
        <h3>Pengertian Cookies</h3>

<p>
Cookies digunakan untuk menyimpan data kecil di browser pengguna.
</p>

<h3>Fungsi Cookies</h3>

<ul>
    <li>Menyimpan preferensi pengguna</li>
    <li>Mengingat login pengguna</li>
    <li>Menyimpan data sementara</li>
</ul>

<h3>Membuat Cookie</h3>

<pre><code>&lt;?php

setcookie(
    "username",
    "admin",
    time() + 3600
);

?&gt;
</code></pre>

<h3>Mengambil Cookie</h3>

<pre><code>&lt;?php

echo $_COOKIE["username"];

?&gt;
</code></pre>

<h3>Menghapus Cookie</h3>

<pre><code>&lt;?php

setcookie(
    "username",
    "",
    time() - 3600
);

?&gt;
</code></pre>

      `,
    },
    {
      id: 37,
      levelId: level.id,
      title: "File Upload",
      order: 11,
      content: `
        <h3>Pengertian File Upload</h3>

<p>
File upload digunakan untuk mengunggah file dari browser ke server.
</p>

<h3>Contoh Form Upload</h3>

<pre><code>&lt;form 
    method="POST"
    enctype="multipart/form-data"
&gt;

    &lt;input 
        type="file"
        name="gambar"
    &gt;

    &lt;button type="submit"&gt;
        Upload
    &lt;/button&gt;

&lt;/form&gt;
</code></pre>

<h3>Contoh Upload File</h3>

<pre><code>&lt;?php

$fileName = $_FILES["gambar"]["name"];
$tmpName = $_FILES["gambar"]["tmp_name"];

move_uploaded_file(
    $tmpName,
    "uploads/" . $fileName
);

echo "Upload berhasil";

?&gt;
</code></pre>
      `,
    },
    {
      id: 38,
      levelId: level.id,
      title: "Konsep CRUD",
      order: 12,
      content: `
        <h3>Pengertian CRUD</h3>

<p>
CRUD adalah konsep dasar pengolahan data pada database.
</p>

<table>
    <thead>
        <tr>
            <th>CRUD</th>
            <th>Fungsi</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Create</td>
            <td>Menambahkan data</td>
        </tr>
        <tr>
            <td>Read</td>
            <td>Menampilkan data</td>
        </tr>
        <tr>
            <td>Update</td>
            <td>Mengubah data</td>
        </tr>
        <tr>
            <td>Delete</td>
            <td>Menghapus data</td>
        </tr>
    </tbody>
</table>

<h3>Contoh Insert Data</h3>

<pre><code>&lt;?php

$query = "
INSERT INTO mahasiswa(nama)
VALUES('Budi')
";

?&gt;
</code></pre>

<h3>Contoh Read Data</h3>

<pre><code>&lt;?php

$query = "SELECT * FROM mahasiswa";

?&gt;
</code></pre>

<h3>Contoh Update Data</h3>

<pre><code>&lt;?php

$query = "
UPDATE mahasiswa
SET nama='Andi'
WHERE id=1
";

?&gt;
</code></pre>

<h3>Contoh Delete Data</h3>

<pre><code>&lt;?php

$query = "
DELETE FROM mahasiswa
WHERE id=1
";

?&gt;
</code></pre>
      `,
    },
    {
      id: 39,
      levelId: level.id,
      title: "Database Connection",
      order: 13,
      content: `
        <h3>Pengertian Database Connection</h3>

<p>
Database connection digunakan untuk menghubungkan PHP dengan database MySQL.
</p>

<h3>Contoh Koneksi Database</h3>

<pre><code>&lt;?php

$conn = mysqli_connect(
    "localhost",
    "root",
    "",
    "db_sekolah"
);

if (!$conn) {
    die("Koneksi gagal");
}

echo "Koneksi berhasil";

?&gt;
</code></pre>

<h3>Penjelasan Parameter</h3>

<table>
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Fungsi</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>localhost</td>
            <td>Host database</td>
        </tr>
        <tr>
            <td>root</td>
            <td>Username database</td>
        </tr>
        <tr>
            <td>""</td>
            <td>Password database</td>
        </tr>
        <tr>
            <td>db_sekolah</td>
            <td>Nama database</td>
        </tr>
    </tbody>
</table>

      `,
    },
    {
      id: 40,
      levelId: level.id,
      title: "Authentication",
      order: 14,
      content: `
        <h3>Pengertian Authentication</h3>

<p>
Authentication adalah proses validasi pengguna untuk masuk ke sistem.
</p>

<h3>Komponen Authentication</h3>

<ul>
    <li>Login</li>
    <li>Logout</li>
    <li>Session</li>
    <li>Password</li>
</ul>

<h3>Contoh Form Login</h3>

<pre><code>&lt;form method="POST"&gt;

    &lt;input 
        type="text"
        name="username"
        placeholder="Username"
    &gt;

    &lt;input 
        type="password"
        name="password"
        placeholder="Password"
    &gt;

    &lt;button type="submit"&gt;
        Login
    &lt;/button&gt;

&lt;/form&gt;
</code></pre>

<h3>Contoh Login Sederhana</h3>

<pre><code>&lt;?php

session_start();

$username = $_POST["username"];
$password = $_POST["password"];

if (
    $username == "admin" &amp;&amp;
    $password == "123"
) {

    $_SESSION["login"] = true;

    echo "Login berhasil";

} else {

    echo "Username atau password salah";
}

?&gt;
</code></pre>

<h3>Contoh Cek Login</h3>

<pre><code>&lt;?php

session_start();

if (!isset($_SESSION["login"])) {

    header("Location: login.php");
    exit;
}

?&gt;
</code></pre>

<h3>Contoh Logout</h3>

<pre><code>&lt;?php

session_start();

session_destroy();

header("Location: login.php");

?&gt;
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

  console.log("✅ Material Level 4 PHP seeding completed!");
}
