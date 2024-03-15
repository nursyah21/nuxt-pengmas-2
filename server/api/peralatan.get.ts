import { schemaPeralatan } from "~/schema/schemaPeralatan";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const data = await schemaPeralatan.find({});
  // @ts-ignore
  let newData = [];
  data.forEach((e, idx) => {
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
  return newData;
  //  return data.map((e,idx)=>({no:  idx +1, ...e[idx]}))
});
