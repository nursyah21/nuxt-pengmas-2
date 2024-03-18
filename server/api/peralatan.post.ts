import { useValidatedBody, z } from "h3-zod";
import { schemaPeralatan } from "~/schema/schemaPeralatan";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const { nama, keterangan, kuantitas, satuan, harga } = await readBody(event)

 await schemaPeralatan.create({ nama, keterangan, kuantitas, satuan, harga, penyusutan: 3, residu: 5000 })
 
 return {message: "success menambahkan peralatan"}
});