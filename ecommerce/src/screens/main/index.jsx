import React from "react";
import { Carousel, Header } from "../../components/shared";
import ProductList from "../product-list";

function Main() {
  const slides = [
    {
      url: "https://acdn.mitiendanube.com/stores/969/644/themes/rio/1-slide-1693338550384-4838186764-82ff8fbb102cbdb0c9b8472f3e0977ec1693338718-1024-1024.png?1808517332",
    },
    {
      url: "https://acdn.mitiendanube.com/stores/969/644/themes/rio/1-slide-1693338801164-6854836896-a76b7e09b56f14a77949cd011219e4b81693339027-1024-1024.png?1808517332",
    },
    {
      url: "https://acdn.mitiendanube.com/stores/969/644/themes/rio/1-slide-1693338801164-2990332114-d443be747afa05bce3cf181b5ad3c82a1693339028-1024-1024.png?1808517332",
    },
  ];

  return (
    <main className="lg:pl-28 mb-10 bg-zinc-50">
      <div className="">
        <Header />
        <Carousel auto={true} slides={slides} />
        <ProductList />
      </div>
    </main>
  );
}

export default Main;
