import formatNumber from "~/composables/formatNumber";
import { schemaPeralatan } from "~/schema/schemaPeralatan";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const data = await schemaPeralatan.find({});
  // @ts-ignore
  let newData = [];
  let total = 0
  data.forEach((e, idx) => {
    total += Number(e.harga) * Number(e.kuantitas)
    newData.push({
      no: idx + 1,
      id: e.id,
      nama: e.nama,
      keterangan: e.keterangan,
      kuantitas: e.kuantitas,
      satuan: e.satuan,
      harga: e.harga,
      jumlah: Number(e.harga) * Number(e.kuantitas),
    });
  });


  // @ts-ignore
  return {data: newData, total: formatNumber(total)};
  
});
