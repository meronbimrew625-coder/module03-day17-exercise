import Link from "next/link";
import { notFound } from "next/navigation";
import { getDishes, getDishById } from "../../../lib/dishes";

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({ id: dish.id }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDishById(id);

  if (!dish) {
    notFound();
  }

  return (
    <main>
      <article className="dish-detail">
        <h2>{dish.name}</h2>
        <p><strong>Category:</strong> {dish.category}</p>
        <p>{dish.description}</p>
        <Link href="/menu">Back to menu</Link>
      </article>
    </main>
  );
}
