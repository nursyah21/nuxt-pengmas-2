import { useValidatedBody, z } from "h3-zod";
import { schemaOperasional } from "~/schema/schemaOperasional";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const data = await readBody(event)
  // console.log(data)
  await schemaOperasional.create(data);

  return { message: "success menambahkan habis pakai" };
});
