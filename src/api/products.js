export function fetchDrinks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          category: "coffee",
          name: "Макиато",
          image: "Макиато.webp",
          price: 99,
          sizes: [200, 300],
          multiplier: 1.4,
        },
        {
          id: 2,
          category: "tea",
          name: "Чай",
          image: "Чай.webp",
          price: 79,
          sizes: [200, 300, 400],
          multiplier: 1.4,
        },
        {
          id: 3,
          category: "coffee",
          name: "Эспрессо",
          image: "Эспрессо.webp",
          price: 129,
          sizes: [200, 300, 400],
          multiplier: 1.4,
        },
        {
          id: 4,
          category: "milkshake",
          name: "Латте",
          image: "Латте.webp",
          price: 109,
          sizes: [200, 300, 400],
          multiplier: 1.4,
        },
        {
          id: 5,
          category: "soda",
          name: "Американо",
          image: "Американо.webp",
          price: 89,
          sizes: [200, 300, 400],
          multiplier: 1.4,
        },
      ]);
    }, 500);
  });
}
