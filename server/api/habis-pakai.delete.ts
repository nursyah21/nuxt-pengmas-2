import { useValidatedBody, z } from "h3-zod";
import { schemaHabisPakai } from "~/schema/schemaHabisPakai";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const {id} = await readBody(event)
  await schemaHabisPakai.findByIdAndDelete(id)

  return { message: "success menghapus" };
});
