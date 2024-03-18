import { useValidatedBody, z } from "h3-zod";
import { schemaOperasional } from "~/schema/schemaOperasional";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const data = await schemaOperasional.find({});

  // @ts-ignore
  let total_jalan = 0;
  let total_lain = 0;

  data.forEach((item) => {
    if (item.kuantitas_perjalanan && item.harga_perjalanan) {
      total_jalan += item.kuantitas_perjalanan * item.harga_perjalanan;
    }
    if (item.kuantitas_lain_lain && item.harga_lain_lain) {
      total_lain += item.kuantitas_lain_lain * item.harga_lain_lain;
    }
  });

  

  const lain_lain = data.filter((e) => e.nama_lain_lain);
  const _lain_lain = lain_lain.map((item, idx)=>({
    no: idx+1,
    id: item.id,
    nama_lain_lain: item.nama_lain_lain,
    keterangan_lain_lain: item.keterangan_lain_lain,
    kuantitas_lain_lain: item.kuantitas_lain_lain,
    satuan_lain_lain: item.satuan_lain_lain,
    harga_lain_lain: item.harga_lain_lain
  }))

  const perjalanan = data.filter((e) => e.nama_perjalanan);
  const _perjalanan = perjalanan.map((item, idx)=>({
    no: idx+1,
    id: item.id,
    nama_perjalanan: item.nama_perjalanan,
    keterangan_perjalanan: item.keterangan_perjalanan,
    kuantitas_perjalanan: item.kuantitas_perjalanan,
    satuan_perjalanan: item.satuan_perjalanan,
    harga_perjalanan: item.harga_perjalanan
  }))

  return {
    perjalanan: _perjalanan,
    lain_lain: _lain_lain,
    total_lain,
    total_jalan,
  };
  // @ts-ignore
  // return { data: newData, penyusutan_tahun, penyusutan_bulan, penyusutan_hari, penyusutan_unit };
});
