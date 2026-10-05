import { getDishes } from "../../lib/dishes";
import MenuSearch from "./MenuSearch";

export const revalidate = 60;

const PAGE_SIZE = 3;

export default async function MenuPage({ searchParams }) {
  const params = await searchParams;
  const initialQuery = typeof params?.search === "string" ? params.search.trim() : "";
  const requestedPage = Math.max(1, Number(params?.page || "1"));
  const allDishes = await getDishes();

  const filtered = initialQuery
    ? allDishes.filter((dish) =>
        [dish.name, dish.category, dish.description]
          .some((value) => value.toLowerCase().includes(initialQuery.toLowerCase()))
      )
    : allDishes;

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const start = (page - 1) * PAGE_SIZE;

  const fallbackData = {
    dishes: filtered.slice(start, start + PAGE_SIZE),
    page,
    pageSize: PAGE_SIZE,
    total,
    totalPages,
    search: initialQuery,
  };

  return (
    <main>
      <h2>Menu</h2>
      <p>Search is debounced; paging is stored in the URL so links are shareable.</p>
      <MenuSearch
        fallbackData={fallbackData}
        initialQuery={initialQuery}
        initialPage={page}
      />
    </main>
  );
}
