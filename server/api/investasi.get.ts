import { useValidatedBody, z } from "h3-zod";
import { schemaHabisPakai } from "~/schema/schemaHabisPakai";
import { schemaOperasional } from "~/schema/schemaOperasional";
import { schemaPeralatan } from "~/schema/schemaPeralatan";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const data = await schemaOperasional.find({});
  const peralatandata = await schemaPeralatan.find({})
  const habis_pakaidata = await schemaHabisPakai.find({})
  const operasionaldata = await schemaOperasional.find({})

  // @ts-ignore
  const perlengkapan = peralatandata.length > 1 ? peralatandata.reduce((a,b)=> (a.kuantitas * a.harga + b.kuantitas * b.harga))
  : peralatandata[0].harga + peralatandata[0].kuantitas

  // @ts-ignore
  const habis_pakai = habis_pakaidata.length > 1 ? habis_pakaidata.reduce((a,b)=> (a.kuantitas * a.harga + b.kuantitas * b.harga))
  : habis_pakaidata[0].harga + habis_pakaidata[0].kuantitas
  
  let perjalanan = 0
  let lainlain = 0
  operasionaldata.forEach((item) => {
    if (item.kuantitas_perjalanan && item.harga_perjalanan) {
      perjalanan += item.kuantitas_perjalanan * item.harga_perjalanan;
    }
    if (item.kuantitas_lain_lain && item.harga_lain_lain) {
      lainlain += item.kuantitas_lain_lain * item.harga_lain_lain;
    }
  })

  // @ts-ignore
  let total = perlengkapan + habis_pakai + perjalanan + lainlain

  return [{perlengkapan, habis_pakai, perjalanan, lainlain, total}];
  
});
