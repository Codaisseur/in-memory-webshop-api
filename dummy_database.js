//
// This is not an actual database of course, because
//  it doesn't *save* or "persist" the data anywhere.
//
// But for now, it's good enough to hack on the frontend! :)
//

const products = [
  {
    id: 1,
    title: "React",
    description:
      "The UI library that took the world by storm, by far the most popular JavaScript library used for building scalably web apps. For just €24, you can claim this otherwise already open source project and start becoming a UI wizard!",
    tags: ["useEffect", "library", "complex", "awesome", "facebook"],
    repo: "https://github.com/facebook/react",
    githubStars: 150497,
    price: 24,
  },
  {
    id: 2,
    title: "Angular",
    description:
      "The fully packed web framework, coming from Google. For just €36, you can get your hands on this otherwise already open source project :D",
    tags: ["google", "batteries-included", "performant", "oop", "framework"],
    repo: "https://github.com/angular/angular",
    githubStars: 62149,
    price: 36,
  },
  {
    id: 3,
    title: "Preact",
    description:
      "The powerful and lean little sister of React: get all the fun, but almost none of the weight! Discounted according to reduced filesize.",
    tags: ["alternative", "react", "library", "minimalist", "small"],
    repo: "https://github.com/preactjs/preact",
    githubStars: 26459,
    price: 3,
  },
  {
    id: 4,
    title: "Vue",
    description:
      "For all the hipsters out there, this minimalist and incredibly well-designed alternative to React will blow your minds. But elegance has a price, so this baby goes for €50. Show the world how fashionable you are!",
    tags: ["hip", "efficient", "proxies", "framework"],
    repo: "https://github.com/vuejs/vue",
    githubStars: 166015,
    price: 50,
  },
];

const users = [
  {
    id: 1,
    firstName: "Danny",
    email: "danny@codaisseur.com",
    githubHandle: "DannyvanderJagt",
    // Psst! This is md5("supersecret"), but don't tell!
    passwordHash: "9a618248b64db62d15b300a07b00580b",
  },
  {
    id: 2,
    firstName: "Matias",
    email: "matias@codaisseur.com",
    githubHandle: "matiasgarcia91",
    // Psst! This is md5("alsoverysecret"), but don't tell!
    passwordHash: "3ff0e0e2f1cc3f2755cb4aebf68507aa",
  },
];

const cartItems = [
  {
    userId: 1,
    productId: 3,
    quantity: 2,
  },
];

module.exports = {
  products,
  users,
  cartItems,
};
