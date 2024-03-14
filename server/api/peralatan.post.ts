import { useValidatedBody, z } from "h3-zod";
import { schemaPeralatan } from "~/schema/schemaPeralatan";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const { nama, keterangan, kuantitas, satuan, harga } = await useValidatedBody(event, {
    nama: z.string(),
    keterangan: z.string(),
    kuantitas: z.number(),
    satuan: z.string(),
    harga: z.number(),
  });

 console.log({ nama, keterangan, kuantitas, satuan, harga })

 await schemaPeralatan.create({ nama, keterangan, kuantitas, satuan, harga })
 
 return {message: 'success'}
});