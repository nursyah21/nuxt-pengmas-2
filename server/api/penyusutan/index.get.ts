import { useValidatedBody, z } from "h3-zod";
import { schemaPeralatan } from "~/schema/schemaPeralatan";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const data = await schemaPeralatan.find({});

  // @ts-ignore
  let newData = [];
  let penyusutan_tahun = 0
  let penyusutan_bulan = 0
  let penyusutan_hari = 0
  let penyusutan_unit = 0
  data.forEach((e, idx) => {
    let nilai = Number(e.harga) * Number(e.kuantitas);
    let tahun = (nilai - e.residu) / e.penyusutan;
    if (isNaN(tahun)) tahun = 0
    newData.push({
      no: idx + 1,
      id: e.id,
      nama: e.nama,
      nilai: nilai,
      residu: e.residu,
      umur: e.penyusutan,
      penyusutan_tahun: tahun,
      penyusutan_bulan: tahun / 12,
      penyusutan_hari: tahun / 365,
      penyusutan_hari_unit: tahun / 365 / e.kuantitas,
    });
    penyusutan_tahun += tahun
    penyusutan_bulan += tahun / 12
    penyusutan_hari += tahun / 365
    penyusutan_unit += tahun / 365 / e.kuantitas
  });

  // @ts-ignore
  return { data: newData, penyusutan_tahun, penyusutan_bulan, penyusutan_hari, penyusutan_unit };
});
