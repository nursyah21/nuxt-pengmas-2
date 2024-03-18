import { useValidatedBody, z } from "h3-zod";
import { schemaOperasional } from "~/schema/schemaOperasional";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const {id} = await readBody(event)
  await schemaOperasional.findByIdAndDelete(id)

  return { message: "success menghapus" };
});
