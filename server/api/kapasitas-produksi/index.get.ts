import { useValidatedBody, z } from "h3-zod";
import { schemaKapasitasProduksi } from "~/schema/schemaKapasitasProduksi";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const data = await schemaKapasitasProduksi.find({})
  
  return {id:data[0]._id, kapasitas: data[0].kapasitas_produksi};
});
