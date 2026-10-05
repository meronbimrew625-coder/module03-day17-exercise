const dishes = [
  {
    id: "1",
    name: "Doro Wot",
    category: "Main Dishes",
    description: "Spicy Ethiopian chicken stew.",
  },
  {
    id: "2",
    name: "Tibs",
    category: "Main Dishes",
    description: "Sauteed meat with vegetables and spices.",
  },
  {
    id: "3",
    name: "Buna",
    category: "Drinks",
    description: "Traditional Ethiopian coffee.",
  },
  {
    id: "4",
    name: "Shiro Wot",
    category: "Main Dishes",
    description: "Smooth chickpea stew seasoned with Ethiopian spices.",
  },
  {
    id: "5",
    name: "Firfir",
    category: "Breakfast",
    description: "Torn injera mixed with berbere and a rich sauce.",
  },
  {
    id: "6",
    name: "Chechebsa",
    category: "Breakfast",
    description: "Flaky torn flatbread mixed with spiced butter and honey.",
  },
];

export async function getDishes() {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return dishes;
}

export async function getDishById(id) {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return dishes.find((dish) => dish.id === id) ?? null;
}
