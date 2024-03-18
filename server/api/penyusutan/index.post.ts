import { useValidatedBody, z } from "h3-zod";
import { schemaKapasitasProduksi } from "~/schema/schemaKapasitasProduksi";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const { kapasitas_produksi } = await readBody(event)

  

  await schemaKapasitasProduksi.create({ kapasitas_produksi });

  return { message: "success menambahkan habis pakai" };
});
