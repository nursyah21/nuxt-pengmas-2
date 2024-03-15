import { useValidatedBody, z } from "h3-zod";
import { schemaPeralatan } from "~/schema/schemaPeralatan";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const { nama, keterangan, kuantitas, satuan, harga, id } = await readBody(
    event
  );
  await schemaPeralatan.findByIdAndUpdate(id, {
    nama,
    keterangan,
    kuantitas,
    satuan,
    harga,
  });

  return { message: "success edit peralatan" };
});
