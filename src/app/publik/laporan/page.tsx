export const dynamic = 'force-dynamic';
export const revalidate = 60;

import { createServerClient } from "@/integrations/supabase/server";
import LaporanClient from "./LaporanClient";

async function getKasData() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("kas")
    .select("*")
    .order("tanggal", { ascending: false });
  if (error) return [];
  return data ?? [];
}

export default async function LaporanPublikPage() {
  const kasList = await getKasData();
  return <LaporanClient initialData={kasList} />;
}
