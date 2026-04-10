export const dynamic = 'force-dynamic';

import { getHewanList } from "./DaftarServerWrapper";
import DaftarShohibulClient from "./DaftarClient";

export default async function DaftarShohibulPage() {
  const initialHewanList = await getHewanList();
  return <DaftarShohibulClient initialHewanList={initialHewanList} />;
}
