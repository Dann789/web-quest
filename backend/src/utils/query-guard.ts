export type GuardResult = { safe: true } | { safe: false; reason: string };

/**
 * Validasi query SQL sebelum dieksekusi di sandbox.
 * Return { safe: true } jika aman, { safe: false, reason } jika berbahaya.
 */
export function guardQuery(sql: string): GuardResult {
  const trimmed = sql.trim();

  if (!trimmed) {
    return { safe: false, reason: "Query tidak boleh kosong." };
  }

  // Blokir multiple statements
  const statements = trimmed
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (statements.length > 1) {
    return {
      safe: false,
      reason: "Hanya satu statement yang diizinkan per eksekusi.",
    };
  }

  const upper = trimmed.toUpperCase();

  const blockedPatterns: [string | RegExp, string][] = [
    ["ATTACH DATABASE", "ATTACH DATABASE tidak diizinkan."],
    ["DETACH DATABASE", "DETACH DATABASE tidak diizinkan."],
    ["CREATE TRIGGER", "CREATE TRIGGER tidak diizinkan."],
    ["LOAD_EXTENSION", "LOAD_EXTENSION tidak diizinkan."],
    [".IMPORT", "Perintah .import tidak diizinkan."],
    [".READ", "Perintah .read tidak diizinkan."],
  ];

  for (const [pattern, reason] of blockedPatterns) {
    if (typeof pattern === "string" && upper.includes(pattern)) {
      return { safe: false, reason };
    }
    if (pattern instanceof RegExp && pattern.test(upper)) {
      return { safe: false, reason };
    }
  }

  // Blokir PRAGMA kecuali PRAGMA table_info
  if (upper.includes("PRAGMA") && !upper.includes("PRAGMA TABLE_INFO")) {
    return { safe: false, reason: "PRAGMA tidak diizinkan (kecuali PRAGMA table_info)." };
  }

  return { safe: true };
}
