import { createServerClient } from "@/integrations/supabase/server";

export interface HewanOption {
  id: string;
  nomor_urut: string;
  jenis_hewan: string;
  tipe_kepemilikan: string;
  harga: number;
  biaya_operasional: number;
  sumber_hewan: string | null;
  iuran_per_orang: number;
  kuota: number;
  sisa_kuota: number;
}

export async function getHewanList(): Promise<HewanOption[]> {
  const supabase = createServerClient();

  const [hewanRes, shohibulRes] = await Promise.all([
    supabase.from("hewan_qurban").select("*").in("status", ["booking", "lunas"]).order("nomor_urut"),
    supabase.from("shohibul_qurban").select("hewan_id"),
  ]);

  if (hewanRes.error || !hewanRes.data) return [];

  const countMap: Record<string, number> = {};
  (shohibulRes.data ?? []).forEach((s: any) => {
    if (s.hewan_id) countMap[s.hewan_id] = (countMap[s.hewan_id] || 0) + 1;
  });

  return hewanRes.data.map((h: any) => ({
    id: h.id,
    nomor_urut: h.nomor_urut,
    jenis_hewan: h.jenis_hewan,
    tipe_kepemilikan: h.tipe_kepemilikan,
    harga: Number(h.harga),
    biaya_operasional: Number(h.biaya_operasional),
    sumber_hewan: h.sumber_hewan,
    iuran_per_orang: Number(h.iuran_per_orang),
    kuota: h.kuota,
    sisa_kuota: h.kuota - (countMap[h.id] || 0),
  }));
}
