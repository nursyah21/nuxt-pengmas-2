import { useValidatedBody, z } from "h3-zod";
import { schemaHabisPakai } from "~/schema/schemaHabisPakai";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const { nama, keterangan, kuantitas, satuan, harga, id } = await readBody(
    event
  );
  await schemaHabisPakai.findByIdAndUpdate(id, {
    nama,
    keterangan,
    kuantitas,
    satuan,
    harga,
  });

  return { message: "success edit habis pakai" };
});
