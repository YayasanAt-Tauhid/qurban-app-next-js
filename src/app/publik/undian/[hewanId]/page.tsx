export const dynamic = 'force-dynamic';

import { createServerClient } from "@/integrations/supabase/server";
import UndianClient from "./UndianClient";

interface Props {
  params: { hewanId: string };
}

async function getUndianData(hewanId: string) {
  const supabase = createServerClient();

  const [hewanRes, shohibulRes, statusRes, logRes] = await Promise.all([
    supabase.from("hewan_qurban").select("id, nomor_urut, jenis_hewan").eq("id", hewanId).single(),
    supabase.from("shohibul_qurban").select("id, nama").eq("hewan_id", hewanId),
    supabase.from("status_bagian").select("bagian, status, pemenang_id").eq("hewan_id", hewanId),
    supabase.from("log_undian").select("id, bagian, peserta, pemenang_id, seed, created_at").eq("hewan_id", hewanId).order("created_at", { ascending: true }),
  ]);

  return {
    hewan: hewanRes.data ?? null,
    shohibulList: shohibulRes.data ?? [],
    statusList: statusRes.data ?? [],
    logList: logRes.data ?? [],
  };
}

export default async function UndianPage({ params }: Props) {
  const { hewanId } = params;
  const initialData = await getUndianData(hewanId);
  return <UndianClient hewanId={hewanId} initialData={initialData} />;
}
