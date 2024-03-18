import { useValidatedBody, z } from "h3-zod";
import { schemaHabisPakai } from "~/schema/schemaHabisPakai";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const { nama, keterangan, kuantitas, satuan, harga } = await useValidatedBody(
    event,
    {
      nama: z.string(),
      keterangan: z.string(),
      kuantitas: z.number(),
      satuan: z.string(),
      harga: z.number(),
    },
  );

  

  await schemaHabisPakai.create({ nama, keterangan, kuantitas, satuan, harga });

  return { message: "success menambahkan habis pakai" };
});
