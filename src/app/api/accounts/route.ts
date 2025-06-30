interface Item {
  id: number;
  name: string;
  age: number;
}

let items: Item[] = [
  { id: 1, name: "Alice", age: 24 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 28 },
];

// GET
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const sortBy = (searchParams.get("sortBy") as keyof Item) || "id";
  const order = searchParams.get("order") || "asc";

  const sorted = [...items].sort((a, b) => {
    if (order === "asc") return a[sortBy] > b[sortBy] ? 1 : -1;
    else return a[sortBy] < b[sortBy] ? 1 : -1;
  });

  const start = (page - 1) * limit;
  const paginated = sorted.slice(start, start + limit);

  return Response.json({
    data: paginated,
    total: items.length,
    page,
    limit,
  });
}

// POST
export async function POST(req: Request) {
  const body = await req.json();
  if (!body.name || !body.age) {
    return Response.json({ error: "Missing 'name' or 'age'" }, { status: 400 });
  }
  const newItem = { id: Date.now(), ...body };
  items.push(newItem);
  return Response.json(newItem, { status: 201 });
}

// PUT
export async function PUT(req: Request) {
  const body = await req.json();
  if (!body.id)
    return Response.json({ error: "Missing 'id'" }, { status: 400 });

  const idx = items.findIndex((item) => item.id === body.id);
  if (idx === -1)
    return Response.json({ error: "Item not found" }, { status: 404 });

  items[idx] = { ...items[idx], ...body };
  return Response.json(items[idx]);
}

// DELETE
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get("id") || "", 10);
  if (!id) return Response.json({ error: "Missing 'id'" }, { status: 400 });

  items = items.filter((item) => item.id !== id);
  return Response.json({ message: `Deleted item ${id}` });
}
