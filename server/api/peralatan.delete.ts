import { useValidatedBody, z } from "h3-zod";
import { schemaPeralatan } from "~/schema/schemaPeralatan";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const {id} = await readBody(event)
  await schemaPeralatan.findByIdAndDelete(id)

  return { message: "success" };
});
