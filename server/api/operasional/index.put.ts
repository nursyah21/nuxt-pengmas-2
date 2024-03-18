import { useValidatedBody, z } from "h3-zod";
import { schemaPeralatan } from "~/schema/schemaPeralatan";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const { residu, umur, id } = await readBody(
    event
  );

  await schemaPeralatan.findByIdAndUpdate(id, {
    residu, penyusutan: umur
  });

  return { message: "success edit kapasitas produksi" };
});
