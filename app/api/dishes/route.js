import { getDishes } from "../../../lib/dishes";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = (searchParams.get("search") || "").trim().toLowerCase();
  const page = Math.max(1, Number(searchParams.get("page") || "1"));
  const pageSize = 3;

  let dishes = await getDishes();

  if (search) {
    dishes = dishes.filter((dish) =>
      [dish.name, dish.category, dish.description]
        .some((value) => value.toLowerCase().includes(search))
    );
  }

  const total = dishes.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;

  return Response.json({
    dishes: dishes.slice(start, start + pageSize),
    page: safePage,
    pageSize,
    total,
    totalPages,
    search,
  });
}
