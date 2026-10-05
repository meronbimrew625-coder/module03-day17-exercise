"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import AddToCartButton from "./AddToCartButton";

export default function MenuSearch({ fallbackData, initialQuery, initialPage }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(initialQuery);
  const [debouncedTerm, setDebouncedTerm] = useState(initialQuery);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(term.trim()), 350);
    return () => clearTimeout(timer);
  }, [term]);

  useEffect(() => {
    setTerm(initialQuery);
    setDebouncedTerm(initialQuery);
  }, [initialQuery]);

  const page = Math.max(1, Number(searchParams.get("page") || initialPage || 1));

  const key = useMemo(() => {
    if (!debouncedTerm) return null;
    return `/api/dishes?search=${encodeURIComponent(debouncedTerm)}&page=${page}`;
  }, [debouncedTerm, page]);

  const { data, error, isValidating } = useSWR(key, fetcher, {
    fallbackData,
    keepPreviousData: true,
    dedupingInterval: 2000,
  });

  useEffect(() => {
    if (debouncedTerm === initialQuery) return;

    const params = new URLSearchParams(searchParams.toString());
    if (debouncedTerm) params.set("search", debouncedTerm);
    else params.delete("search");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedTerm, initialQuery, pathname, router, searchParams]);

  const result = data || fallbackData;

  function goToPage(nextPage) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <section>
      <label htmlFor="menu-search">Search dishes</label>
      <input
        id="menu-search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Search dishes by name or category"
      />

      {error && <p>Could not refresh the menu.</p>}
      {isValidating && <p>Updating results...</p>}

      {!result?.dishes?.length ? (
        <p>No dishes found.</p>
      ) : (
        <div className="dish-list">
          {result.dishes.map((dish) => (
            <article className="dish-card" key={dish.id}>
              <h3>{dish.name}</h3>
              <p>{dish.category}</p>
              <p>{dish.description}</p>
              <div className="dish-actions">
                <Link href={`/menu/${dish.id}`}>View details</Link>
                <AddToCartButton dish={dish} />
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="dish-actions">
        <button
          type="button"
          disabled={result?.page <= 1}
          onClick={() => goToPage(result.page - 1)}
        >
          Previous
        </button>
        <span>
          Page {result?.page || 1} of {result?.totalPages || 1}
        </span>
        <button
          type="button"
          disabled={result?.page >= result?.totalPages}
          onClick={() => goToPage(result.page + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
}
