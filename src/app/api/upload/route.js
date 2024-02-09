export async function POST(req) {
  const data = await req.formData();
  return Response.json(true);
}
