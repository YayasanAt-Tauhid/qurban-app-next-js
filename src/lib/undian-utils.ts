// ─── Definisi bagian khusus sapi kolektif (sesuai form fisik) ───────────────
export const BAGIAN_KOLEKTIF: {
  id: string;
  label: string;
  kuota: number;
  bisa_multi: boolean;
}[] = [
  { id: "ekor", label: "Ekor", kuota: 1, bisa_multi: false },
  { id: "rangka_kepala", label: "Rangka Kepala", kuota: 1, bisa_multi: false },
  { id: "lidah", label: "Lidah", kuota: 1, bisa_multi: false },
  { id: "ginjal", label: "Ginjal", kuota: 1, bisa_multi: false },
  { id: "jantung", label: "Jantung", kuota: 1, bisa_multi: false },
  { id: "limpa", label: "Limpa", kuota: 1, bisa_multi: false },
  { id: "tulang_kaki_1", label: "Tulang Kaki 1", kuota: 1, bisa_multi: false },
  { id: "tulang_kaki_2", label: "Tulang Kaki 2", kuota: 1, bisa_multi: false },
  { id: "tulang_kaki_3", label: "Tulang Kaki 3", kuota: 1, bisa_multi: false },
  { id: "tulang_kaki_4", label: "Tulang Kaki 4", kuota: 1, bisa_multi: false },
  { id: "paru_1", label: "Paru 1", kuota: 1, bisa_multi: true },
  { id: "paru_2", label: "Paru 2", kuota: 1, bisa_multi: true },
  { id: "babat_1", label: "Babat 1", kuota: 1, bisa_multi: true },
  { id: "babat_2", label: "Babat 2", kuota: 1, bisa_multi: true },
  { id: "babat_3", label: "Babat 3", kuota: 1, bisa_multi: true },
  { id: "usus_1", label: "Usus 1", kuota: 1, bisa_multi: true },
  { id: "usus_2", label: "Usus 2", kuota: 1, bisa_multi: true },
  { id: "lemak_1", label: "Lemak 1", kuota: 1, bisa_multi: true },
  { id: "lemak_2", label: "Lemak 2", kuota: 1, bisa_multi: true },
  { id: "lemak_3", label: "Lemak 3", kuota: 1, bisa_multi: true },
  { id: "daging_pipi_1", label: "Daging Pipi 1", kuota: 1, bisa_multi: true },
  { id: "daging_pipi_2", label: "Daging Pipi 2", kuota: 1, bisa_multi: true },
  { id: "kulit_1", label: "Kulit 1", kuota: 1, bisa_multi: true },
  { id: "kulit_2", label: "Kulit 2", kuota: 1, bisa_multi: true },
  { id: "kulit_3", label: "Kulit 3", kuota: 1, bisa_multi: true },
];

// ─── Kategori bagian (untuk survei awal & undian) ────────────────────────────
export const KATEGORI_BAGIAN: {
  id: string;
  label: string;
  icon: string;
  slots: string[];
}[] = [
  { id: "ekor", label: "Ekor", icon: "🦴", slots: ["ekor"] },
  {
    id: "rangka_kepala",
    label: "Rangka Kepala",
    icon: "🐄",
    slots: ["rangka_kepala"],
  },
  { id: "lidah", label: "Lidah", icon: "👅", slots: ["lidah"] },
  { id: "ginjal", label: "Ginjal", icon: "🫘", slots: ["ginjal"] },
  { id: "jantung", label: "Jantung", icon: "🫀", slots: ["jantung"] },
  { id: "limpa", label: "Limpa", icon: "🟣", slots: ["limpa"] },
  {
    id: "tulang_kaki",
    label: "Tulang Kaki",
    icon: "🦿",
    slots: [
      "tulang_kaki_1",
      "tulang_kaki_2",
      "tulang_kaki_3",
      "tulang_kaki_4",
    ],
  },
  { id: "paru", label: "Paru", icon: "🫁", slots: ["paru_1", "paru_2"] },
  {
    id: "babat",
    label: "Babat",
    icon: "🟤",
    slots: ["babat_1", "babat_2", "babat_3"],
  },
  { id: "usus", label: "Usus", icon: "🌀", slots: ["usus_1", "usus_2"] },
  {
    id: "lemak",
    label: "Lemak",
    icon: "🟡",
    slots: ["lemak_1", "lemak_2", "lemak_3"],
  },
  {
    id: "daging_pipi",
    label: "Daging Pipi",
    icon: "🥩",
    slots: ["daging_pipi_1", "daging_pipi_2"],
  },
  {
    id: "kulit",
    label: "Kulit",
    icon: "🟫",
    slots: ["kulit_1", "kulit_2", "kulit_3"],
  },
];

export function getKuotaKategori(kategoriId: string): number {
  return KATEGORI_BAGIAN.find((k) => k.id === kategoriId)?.slots.length ?? 1;
}

export function getKategoriDariSlot(slotId: string): string {
  return KATEGORI_BAGIAN.find((k) => k.slots.includes(slotId))?.id ?? slotId;
}

// Seeded shuffle - deterministic & verifiable
export function seededShuffle<T>(arr: T[], seed: string): T[] {
  const copy = [...arr];
  let h = 0;
  for (let i = 0; i < seed.length; i++)
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  for (let i = copy.length - 1; i > 0; i--) {
    h ^= h << 13;
    h ^= h >> 7;
    h ^= h << 17;
    const j = Math.abs(h) % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
