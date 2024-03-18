import { useValidatedBody, z } from "h3-zod";
import { schemaKapasitasProduksi } from "~/schema/schemaKapasitasProduksi";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const { kapasitas_produksi, id } = await readBody(
    event
  );

  await schemaKapasitasProduksi.findByIdAndUpdate(id, {
    kapasitas_produksi
  });

  return { message: "success edit kapasitas produksi" };
});
