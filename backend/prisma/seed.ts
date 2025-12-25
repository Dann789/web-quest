import { PrismaClient, UserRole, Difficulty, ChallengeMethod, Rarity } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting extended database seeding...');

    // ============================================
    // 1. CREATE ADMIN USER
    // ============================================
    console.log('\n📋 Creating admin user...');

    const hashedAdminPassword = await Bun.password.hash('Admin123!');

    const admin = await prisma.user.upsert({
        where: { email: 'admin@webquest.com' },
        update: {},
        create: {
            username: 'admin',
            email: 'admin@webquest.com',
            password: hashedAdminPassword,
            role: UserRole.ADMIN,
            totalXp: 0,
        },
    });

    console.log('✅ Admin user created:', admin.username);

    // ============================================
    // 2. CREATE 5 LEVELS
    // ============================================
    console.log('\n📋 Creating levels...');

    const levelsData = [
        {
            name: 'HTML',
            order: 1,
            xpRequired: 0,
            description: 'Belajar dasar HTML dan struktur web',
            iconUrl: '/icons/html.svg'
        },
        {
            name: 'CSS',
            order: 2,
            xpRequired: 250,
            description: 'Styling dan layout dengan CSS',
            iconUrl: '/icons/css.svg'
        },
        {
            name: 'JavaScript',
            order: 3,
            xpRequired: 500,
            description: 'Interaktivitas dengan JavaScript',
            iconUrl: '/icons/javascript.svg'
        },
        {
            name: 'PHP',
            order: 4,
            xpRequired: 1000,
            description: 'Server-side programming dengan PHP',
            iconUrl: '/icons/php.svg'
        },
        {
            name: 'Database',
            order: 5,
            xpRequired: 2000,
            description: 'Manajemen database dengan MySQL',
            iconUrl: '/icons/database.svg'
        },
    ];

    const levels = [];
    for (const levelData of levelsData) {
        const level = await prisma.level.upsert({
            where: { order: levelData.order },
            update: {},
            create: levelData,
        });
        levels.push(level);
    }

    console.log(`✅ ${levels.length} Levels created`);

    // ============================================
    // 3. CREATE 7 BADGES
    // ============================================
    console.log('\n📋 Creating badges...');

    const badgesData = [
        {
            name: 'Web Beginner',
            description: 'Menyelesaikan Level 1',
            conditionType: 'level_complete',
            conditionValue: { levelOrder: 1 },
            iconUrl: '/badges/web-beginner.png',
            rarity: Rarity.COMMON,
        },
        {
            name: 'Web Explorer',
            description: 'Membuka 3 level',
            conditionType: 'levels_unlocked',
            conditionValue: { count: 3 },
            iconUrl: '/badges/web-explorer.png',
            rarity: Rarity.COMMON,
        },
        {
            name: 'Web Adventurer',
            description: 'Membuka seluruh level',
            conditionType: 'levels_unlocked',
            conditionValue: { count: 5 },
            iconUrl: '/badges/web-adventurer.png',
            rarity: Rarity.RARE,
        },
        {
            name: 'Brave Coder',
            description: 'Menyelesaikan 1 challenge hard',
            conditionType: 'hard_challenges',
            conditionValue: { count: 1 },
            iconUrl: '/badges/brave-coder.png',
            rarity: Rarity.COMMON,
        },
        {
            name: 'Hard Challenger',
            description: 'Menyelesaikan 3 challenge hard',
            conditionType: 'hard_challenges',
            conditionValue: { count: 3 },
            iconUrl: '/badges/hard-challenger.png',
            rarity: Rarity.RARE,
        },
        {
            name: 'Dedicated Learner',
            description: 'Menyelesaikan seluruh materi pada 1 level',
            conditionType: 'level_materials_complete',
            conditionValue: { count: 1 },
            iconUrl: '/badges/dedicated-learner.png',
            rarity: Rarity.RARE,
        },
        {
            name: 'Top Performer',
            description: 'Masuk Top 3 leaderboard pada salah satu level',
            conditionType: 'top_leaderboard',
            conditionValue: { rank: 3 },
            iconUrl: '/badges/top-performer.png',
            rarity: Rarity.EPIC,
        },
    ];

    for (const badgeData of badgesData) {
        await prisma.badge.upsert({
            where: { name: badgeData.name },
            update: {},
            create: badgeData,
        });
    }

    console.log(`✅ ${badgesData.length} Badges created`);

    // ============================================
    // 4. CREATE SAMPLE MATERIALS (1 per level)
    // ============================================
    console.log('\n📋 Creating sample materials...');

    const materialsData = [
        {
            levelId: levels[0].id, // HTML
            title: 'Pengenalan HTML',
            content: `
        <h2>Apa itu HTML?</h2>
        <p>HTML (HyperText Markup Language) adalah bahasa markup standar untuk membuat halaman web.</p>
        
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

        <h3>Tag HTML Penting</h3>
        <ul>
          <li><code>&lt;h1&gt;</code> sampai <code>&lt;h6&gt;</code> - Heading</li>
          <li><code>&lt;p&gt;</code> - Paragraf</li>
          <li><code>&lt;a&gt;</code> - Link</li>
          <li><code>&lt;img&gt;</code> - Gambar</li>
          <li><code>&lt;div&gt;</code> - Container</li>
        </ul>
      `,
            xpReward: 15,
            order: 1,
            estimatedTime: 10,
        },
        {
            levelId: levels[1].id, // CSS
            title: 'Pengenalan CSS',
            content: `
        <h2>Apa itu CSS?</h2>
        <p>CSS (Cascading Style Sheets) digunakan untuk mengatur tampilan dan layout halaman web.</p>
        
        <h3>Cara Menambahkan CSS</h3>
        <p>Ada 3 cara menambahkan CSS:</p>
        <ol>
          <li><strong>Inline CSS</strong> - Langsung di tag HTML</li>
          <li><strong>Internal CSS</strong> - Di dalam tag &lt;style&gt;</li>
          <li><strong>External CSS</strong> - File .css terpisah</li>
        </ol>

        <h3>Selector Dasar CSS</h3>
        <pre><code>/* Element Selector */
h1 {
  color: blue;
  font-size: 24px;
}

/* Class Selector */
.container {
  width: 100%;
  padding: 20px;
}

/* ID Selector */
#header {
  background-color: #333;
}</code></pre>
      `,
            xpReward: 15,
            order: 1,
            estimatedTime: 12,
        },
        {
            levelId: levels[2].id, // JavaScript
            title: 'Pengenalan JavaScript',
            content: `
        <h2>Apa itu JavaScript?</h2>
        <p>JavaScript adalah bahasa pemrograman yang membuat halaman web menjadi interaktif.</p>
        
        <h3>Variabel dan Tipe Data</h3>
        <pre><code>// Deklarasi variabel
let nama = "John";
const umur = 25;
var isStudent = true;

// Tipe data
let angka = 10;          // Number
let teks = "Hello";      // String
let benar = true;        // Boolean
let kosong = null;       // Null
let tidakTerdefinisi;    // Undefined</code></pre>

        <h3>Function</h3>
        <pre><code>// Function Declaration
function sapa(nama) {
  return "Hello, " + nama;
}

// Arrow Function
const tambah = (a, b) => a + b;

console.log(sapa("John"));  // Output: Hello, John
console.log(tambah(5, 3));  // Output: 8</code></pre>
      `,
            xpReward: 15,
            order: 1,
            estimatedTime: 15,
        },
        {
            levelId: levels[3].id, // PHP
            title: 'Pengenalan PHP',
            content: `
        <h2>Apa itu PHP?</h2>
        <p>PHP (Hypertext Preprocessor) adalah bahasa pemrograman server-side untuk membuat website dinamis.</p>
        
        <h3>Syntax Dasar PHP</h3>
        <pre><code>&lt;?php
// Ini adalah komentar
echo "Hello World!";

// Variabel
$nama = "John";
$umur = 25;

echo "Nama: " . $nama . ", Umur: " . $umur;
?&gt;</code></pre>

        <h3>Array dan Loop</h3>
        <pre><code>&lt;?php
// Array
$buah = array("Apel", "Mangga", "Jeruk");

// Loop
foreach ($buah as $item) {
  echo $item . "&lt;br&gt;";
}

// For loop
for ($i = 0; $i < 5; $i++) {
  echo "Angka: " . $i . "&lt;br&gt;";
}
?&gt;</code></pre>
      `,
            xpReward: 15,
            order: 1,
            estimatedTime: 15,
        },
        {
            levelId: levels[4].id, // Database
            title: 'Pengenalan Database MySQL',
            content: `
        <h2>Apa itu Database?</h2>
        <p>Database adalah sistem penyimpanan data terstruktur yang dapat diakses dan dikelola.</p>
        
        <h3>Perintah SQL Dasar</h3>
        <pre><code>-- Membuat Database
CREATE DATABASE webquest;

-- Membuat Tabel
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Data
INSERT INTO users (username, email) 
VALUES ('john', 'john@example.com');

-- Select Data
SELECT * FROM users;
SELECT username, email FROM users WHERE id = 1;</code></pre>

        <h3>Operasi CRUD</h3>
        <ul>
          <li><strong>CREATE</strong> - INSERT INTO</li>
          <li><strong>READ</strong> - SELECT</li>
          <li><strong>UPDATE</strong> - UPDATE SET WHERE</li>
          <li><strong>DELETE</strong> - DELETE FROM WHERE</li>
        </ul>
      `,
            xpReward: 15,
            order: 1,
            estimatedTime: 15,
        },
    ];

    const materials = [];
    for (const materialData of materialsData) {
        const material = await prisma.material.create({
            data: materialData,
        });
        materials.push(material);
    }

    console.log(`✅ ${materials.length} Sample Materials created`);

    // ============================================
    // 5. CREATE SAMPLE CHALLENGES (2 per level)
    // ============================================
    console.log('\n📋 Creating sample challenges...');

    const challengesData = [
        // HTML Level - Challenge 1 (Easy)
        {
            levelId: levels[0].id,
            title: 'Membuat Heading HTML',
            description: 'Buatlah sebuah heading level 1 dengan teks "Belajar HTML"',
            difficulty: Difficulty.EASY,
            method: ChallengeMethod.CODING_MANUAL,
            idealTime: 120, // 2 minutes
            xpBase: 10,
            validationRules: {
                type: 'html',
                rules: [
                    { check: 'tag_exists', tag: 'h1' },
                    { check: 'text_contains', text: 'Belajar HTML' }
                ]
            },
            isActive: true,
        },
        // HTML Level - Challenge 2 (Medium)
        {
            levelId: levels[0].id,
            title: 'Membuat List HTML',
            description: 'Buatlah unordered list dengan 3 item: HTML, CSS, dan JavaScript',
            difficulty: Difficulty.MEDIUM,
            method: ChallengeMethod.CODING_MANUAL,
            idealTime: 180, // 3 minutes
            xpBase: 20,
            validationRules: {
                type: 'html',
                rules: [
                    { check: 'tag_exists', tag: 'ul' },
                    { check: 'tag_count', tag: 'li', count: 3 }
                ]
            },
            isActive: true,
        },
        // CSS Level - Challenge 1 (Easy)
        {
            levelId: levels[1].id,
            title: 'Mengubah Warna Teks',
            description: 'Buatlah CSS untuk mengubah warna teks paragraf menjadi biru',
            difficulty: Difficulty.EASY,
            method: ChallengeMethod.CODING_MANUAL,
            idealTime: 120,
            xpBase: 10,
            validationRules: {
                type: 'css',
                rules: [
                    { check: 'property_exists', selector: 'p', property: 'color' },
                    { check: 'property_value', selector: 'p', property: 'color', value: 'blue' }
                ]
            },
            isActive: true,
        },
        // CSS Level - Challenge 2 (Medium)
        {
            levelId: levels[1].id,
            title: 'Membuat Box dengan Padding',
            description: 'Buatlah CSS untuk class .box dengan padding 20px dan background color #f0f0f0',
            difficulty: Difficulty.MEDIUM,
            method: ChallengeMethod.CODING_MANUAL,
            idealTime: 180,
            xpBase: 20,
            validationRules: {
                type: 'css',
                rules: [
                    { check: 'class_exists', class: 'box' },
                    { check: 'property_exists', selector: '.box', property: 'padding' },
                    { check: 'property_exists', selector: '.box', property: 'background-color' }
                ]
            },
            isActive: true,
        },
        // JavaScript Level - Challenge 1 (Easy)
        {
            levelId: levels[2].id,
            title: 'Deklarasi Variabel',
            description: 'Buatlah variabel dengan nama "nama" yang berisi string "John Doe"',
            difficulty: Difficulty.EASY,
            method: ChallengeMethod.CODING_MANUAL,
            idealTime: 120,
            xpBase: 10,
            validationRules: {
                type: 'javascript',
                rules: [
                    { check: 'variable_declared', name: 'nama' },
                    { check: 'variable_value', name: 'nama', value: 'John Doe' }
                ]
            },
            isActive: true,
        },
        // JavaScript Level - Challenge 2 (Medium)
        {
            levelId: levels[2].id,
            title: 'Membuat Function Penjumlahan',
            description: 'Buatlah function bernama "tambah" yang menerima 2 parameter dan mengembalikan hasil penjumlahannya',
            difficulty: Difficulty.MEDIUM,
            method: ChallengeMethod.FIX_THE_BUG,
            idealTime: 240,
            xpBase: 20,
            validationRules: {
                type: 'javascript',
                rules: [
                    { check: 'function_exists', name: 'tambah' },
                    { check: 'function_returns', name: 'tambah', params: [5, 3], expected: 8 }
                ]
            },
            isActive: true,
        },
        // PHP Level - Challenge 1 (Easy)
        {
            levelId: levels[3].id,
            title: 'Echo Statement PHP',
            description: 'Gunakan echo untuk menampilkan teks "Hello PHP"',
            difficulty: Difficulty.EASY,
            method: ChallengeMethod.CODING_MANUAL,
            idealTime: 120,
            xpBase: 10,
            validationRules: {
                type: 'php',
                rules: [
                    { check: 'contains', value: 'echo' },
                    { check: 'output', expected: 'Hello PHP' }
                ]
            },
            isActive: true,
        },
        // PHP Level - Challenge 2 (Medium)
        {
            levelId: levels[3].id,
            title: 'PHP Array dan Loop',
            description: 'Buatlah array dengan 3 nama buah, lalu tampilkan menggunakan foreach loop',
            difficulty: Difficulty.MEDIUM,
            method: ChallengeMethod.DRAG_AND_DROP,
            idealTime: 240,
            xpBase: 20,
            validationRules: {
                type: 'php',
                rules: [
                    { check: 'array_declared' },
                    { check: 'loop_used', type: 'foreach' }
                ]
            },
            isActive: true,
        },
        // Database Level - Challenge 1 (Easy)
        {
            levelId: levels[4].id,
            title: 'SELECT Query Dasar',
            description: 'Buatlah query untuk menampilkan semua data dari tabel "users"',
            difficulty: Difficulty.EASY,
            method: ChallengeMethod.CODING_MANUAL,
            idealTime: 120,
            xpBase: 10,
            validationRules: {
                type: 'sql',
                rules: [
                    { check: 'contains', value: 'SELECT' },
                    { check: 'contains', value: 'FROM users' }
                ]
            },
            isActive: true,
        },
        // Database Level - Challenge 2 (Medium)
        {
            levelId: levels[4].id,
            title: 'INSERT Query dengan Values',
            description: 'Buatlah query untuk insert data baru ke tabel "users" dengan kolom username dan email',
            difficulty: Difficulty.MEDIUM,
            method: ChallengeMethod.SCENARIO_BASED,
            idealTime: 240,
            xpBase: 20,
            validationRules: {
                type: 'sql',
                rules: [
                    { check: 'contains', value: 'INSERT INTO' },
                    { check: 'contains', value: 'VALUES' }
                ]
            },
            isActive: true,
        },
    ];

    const challenges = [];
    for (const challengeData of challengesData) {
        const challenge = await prisma.challenge.create({
            data: challengeData,
        });
        challenges.push(challenge);
    }

    console.log(`✅ ${challenges.length} Sample Challenges created`);

    // ============================================
    // 6. CREATE CHALLENGE VARIANTS (3 per challenge)
    // ============================================
    console.log('\n📋 Creating challenge variants...');

    let variantCount = 0;

    for (let i = 0; i < challenges.length; i++) {
        const challenge = challenges[i];

        // Variant 1
        await prisma.challengeVariant.create({
            data: {
                challengeId: challenge.id,
                questionContent: `${challenge.description} (Variasi 1)`,
                starterCode: challenge.method === ChallengeMethod.FIX_THE_BUG
                    ? 'function tambah(a, b) {\n  return a - b; // Bug: harusnya a + b\n}'
                    : null,
                correctAnswer: getCorrectAnswer(challenge, 1),
                testCases: getTestCases(challenge, 1),
                difficultyWeight: 1.0,
            },
        });
        variantCount++;

        // Variant 2
        await prisma.challengeVariant.create({
            data: {
                challengeId: challenge.id,
                questionContent: `${challenge.description} (Variasi 2)`,
                starterCode: challenge.method === ChallengeMethod.FIX_THE_BUG
                    ? 'function tambah(a, b) {\n  return a * b; // Bug: harusnya a + b\n}'
                    : null,
                correctAnswer: getCorrectAnswer(challenge, 2),
                testCases: getTestCases(challenge, 2),
                difficultyWeight: 1.0,
            },
        });
        variantCount++;

        // Variant 3
        await prisma.challengeVariant.create({
            data: {
                challengeId: challenge.id,
                questionContent: `${challenge.description} (Variasi 3)`,
                starterCode: challenge.method === ChallengeMethod.FIX_THE_BUG
                    ? 'function tambah(a, b) {\n  return a / b; // Bug: harusnya a + b\n}'
                    : null,
                correctAnswer: getCorrectAnswer(challenge, 3),
                testCases: getTestCases(challenge, 3),
                difficultyWeight: 1.1,
            },
        });
        variantCount++;
    }

    console.log(`✅ ${variantCount} Challenge Variants created (3 per challenge)`);

    // ============================================
    // 7. CREATE SAMPLE USERS (5 mahasiswa dummy)
    // ============================================
    console.log('\n📋 Creating sample users...');

    const sampleUsers = [];
    for (let i = 1; i <= 5; i++) {
        const hashedPassword = await Bun.password.hash(`User${i}123!`);

        const user = await prisma.user.create({
            data: {
                username: `user${i}`,
                email: `user${i}@student.polinema.ac.id`,
                password: hashedPassword,
                role: UserRole.USER,
                totalXp: 0,
            },
        });

        sampleUsers.push(user);

        // Unlock Level 1 untuk semua sample users
        await prisma.userProgress.create({
            data: {
                userId: user.id,
                levelId: levels[0].id,
                isUnlocked: true,
                materialsCompleted: 0,
                challengesCompleted: 0,
                totalXpEarned: 0,
                progressPercentage: 0,
                unlockedAt: new Date(),
            },
        });
    }

    console.log(`✅ ${sampleUsers.length} Sample Users created (user1 - user5)`);
    console.log('   Password for all users: User[1-5]123!');

    // ============================================
    // 8. CREATE INITIAL GLOBAL LEADERBOARD
    // ============================================
    console.log('\n📋 Creating initial leaderboard...');

    const now = new Date();
    const weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    await prisma.leaderboard.create({
        data: {
            levelId: null, // Global leaderboard
            periodStart: now,
            periodEnd: weekLater,
            isLocked: false,
            rewardsDistributed: false,
        },
    });

    console.log('✅ Global Leaderboard created (7 days period)');

    // ============================================
    // SEEDING SUMMARY
    // ============================================
    console.log('\n🎉 ========================================');
    console.log('🎉 EXTENDED SEEDING COMPLETED SUCCESSFULLY!');
    console.log('🎉 ========================================\n');

    console.log('📊 Summary:');
    console.log(`   - Admin Users: 1`);
    console.log(`   - Student Users: 5 (user1-user5)`);
    console.log(`   - Levels: 5 (HTML, CSS, JS, PHP, DB)`);
    console.log(`   - Badges: 7`);
    console.log(`   - Materials: 5 (1 per level)`);
    console.log(`   - Challenges: 10 (2 per level)`);
    console.log(`   - Challenge Variants: 30 (3 per challenge)`);
    console.log(`   - Leaderboards: 1 (global)\n`);

    console.log('🔐 Login Credentials:');
    console.log('   Admin:');
    console.log('   - Username: admin');
    console.log('   - Password: Admin123!\n');
    console.log('   Sample Users:');
    console.log('   - Username: user1, user2, user3, user4, user5');
    console.log('   - Password: User[1-5]123! (contoh: User1123!)\n');

    console.log('🚀 Next Steps:');
    console.log('   1. Run: npx prisma studio (to view data)');
    console.log('   2. Start developing admin panel CRUD');
    console.log('   3. Test user flow dengan sample users');
    console.log('   4. Add more materials & challenges via admin panel\n');
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function getCorrectAnswer(challenge: any, variant: number): string {
    // Generate correct answer based on challenge type
    if (challenge.title.includes('Heading HTML')) {
        return '<h1>Belajar HTML</h1>';
    }
    if (challenge.title.includes('List HTML')) {
        return '<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>';
    }
    if (challenge.title.includes('Warna Teks')) {
        return 'p {\n  color: blue;\n}';
    }
    if (challenge.title.includes('Box dengan Padding')) {
        return '.box {\n  padding: 20px;\n  background-color: #f0f0f0;\n}';
    }
    if (challenge.title.includes('Deklarasi Variabel')) {
        return 'let nama = "John Doe";';
    }
    if (challenge.title.includes('Function Penjumlahan')) {
        return 'function tambah(a, b) {\n  return a + b;\n}';
    }
    if (challenge.title.includes('Echo Statement')) {
        return '<?php\necho "Hello PHP";\n?>';
    }
    if (challenge.title.includes('PHP Array')) {
        return '<?php\n$buah = ["Apel", "Mangga", "Jeruk"];\nforeach ($buah as $item) {\n  echo $item;\n}\n?>';
    }
    if (challenge.title.includes('SELECT Query')) {
        return 'SELECT * FROM users;';
    }
    if (challenge.title.includes('INSERT Query')) {
        return 'INSERT INTO users (username, email) VALUES ("john", "john@example.com");';
    }

    return 'Sample correct answer for variant ' + variant;
}

function getTestCases(challenge: any, variant: number): any {
    // Generate test cases based on challenge type
    if (challenge.title.includes('Function Penjumlahan')) {
        return {
            tests: [
                { input: [2, 3], expected: 5 },
                { input: [10, 5], expected: 15 },
                { input: [0, 0], expected: 0 },
                { input: [-5, 5], expected: 0 },
            ]
        };
    }

    if (challenge.title.includes('SELECT Query')) {
        return {
            expectedColumns: ['id', 'username', 'email'],
            expectedTable: 'users'
        };
    }

    return {
        variant: variant,
        testType: 'basic_validation'
    };
}

// ============================================
// RUN SEEDER
// ============================================

main()
    .catch((e) => {
        console.error('\n❌ ========================================');
        console.error('❌ SEEDING ERROR!');
        console.error('❌ ========================================\n');
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
