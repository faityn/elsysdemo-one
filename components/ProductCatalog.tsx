"use client";

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, PackageSearch } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SubpageHero from "@/components/SubpageHero";
import {
  defaultSiteContent,
  loadSiteContent,
  type Product,
  type SiteContent,
} from "@/lib/site-content";

const ALL_CATEGORIES = "Бүх бүтээгдэхүүн";

export default function ProductCatalog() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    const initialSearch = new URLSearchParams(window.location.search).get(
      "search",
    );
    if (initialSearch) setSearch(initialSearch);
    loadSiteContent()
      .then(setContent)
      .catch(() => undefined);
  }, []);

  const categoryProducts = (category: string) =>
    content.products.filter(
      (product) =>
        product.category === category ||
        content.categoryParents[product.category] === category,
    );

  const filteredProducts = content.products
    .filter((product) => {
      const matchesCategory =
        activeCategory === ALL_CATEGORIES ||
        product.category === activeCategory ||
        content.categoryParents[product.category] === activeCategory;
      const query = search.trim().toLocaleLowerCase();
      const matchesSearch =
        !query ||
        `${product.name} ${product.sku} ${product.category}`
          .toLocaleLowerCase()
          .includes(query);
      return matchesCategory && matchesSearch;
    })
    .sort((first, second) => {
      if (sortOrder === "name") return first.name.localeCompare(second.name);
      if (sortOrder === "price-asc")
        return priceValue(first.price) - priceValue(second.price);
      if (sortOrder === "price-desc")
        return priceValue(second.price) - priceValue(first.price);
      return 0;
    });

  const parentCategories = content.categories.filter(
    (category) => !content.categoryParents[category],
  );
  const childCategories = content.categories.filter(
    (category) => content.categoryParents[category],
  );

  return (
    <main className="min-h-screen bg-[#f7f8f6]">
      <SiteHeader content={content} />
      <SubpageHero
        eyebrow="ELSYS ENG. / БҮТЭЭГДЭХҮҮН"
        title="Бүтээгдэхүүний каталог"
        description="Барилгын цахилгаан тоног төхөөрөмж, инженерийн шийдлүүд"
        image={content.hero.image}
        aside={
          <div className="hidden shrink-0 border-l border-white/25 pl-5 text-right sm:block">
            <span className="block text-[23px] font-black text-white">
              {content.products.length}
            </span>
            <span className="text-[10px] font-semibold text-white/65">
              бүтээгдэхүүн
            </span>
          </div>
        }
      />

      <div className="container py-7 md:py-9">
        <div className="grid gap-7 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
          <aside aria-label="Бүтээгдэхүүний ангилал" className="min-w-0">
            <div className="mb-3 flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#25332d]">
              <SlidersHorizontal size={15} /> Ангилал
            </div>
            <nav className="flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
              <CategoryButton
                active={activeCategory === ALL_CATEGORIES}
                label={ALL_CATEGORIES}
                count={content.products.length}
                onClick={() => setActiveCategory(ALL_CATEGORIES)}
              />
              {parentCategories.map((category) => (
                <div key={category} className="shrink-0 lg:shrink">
                  <CategoryButton
                    active={activeCategory === category}
                    label={category}
                    count={categoryProducts(category).length}
                    onClick={() => setActiveCategory(category)}
                  />
                  {childCategories
                    .filter(
                      (child) => content.categoryParents[child] === category,
                    )
                    .map((child) => (
                      <CategoryButton
                        key={child}
                        active={activeCategory === child}
                        label={child}
                        count={
                          content.products.filter(
                            (product) => product.category === child,
                          ).length
                        }
                        onClick={() => setActiveCategory(child)}
                        nested
                      />
                    ))}
                </div>
              ))}
            </nav>
          </aside>

          <section aria-label="Бүтээгдэхүүний жагсаалт" className="min-w-0">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex h-11 min-w-0 flex-1 items-center gap-2 border border-[#e1e5e0] bg-white px-3 text-[#87928c] sm:max-w-[380px]">
                <Search size={17} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Нэр, кодоор хайх"
                  aria-label="Бүтээгдэхүүн хайх"
                  className="h-full w-full bg-transparent text-[13px] text-[#17212a] outline-none placeholder:text-[#a0aaa4]"
                />
              </label>
              <div className="flex items-center justify-between gap-3">
                <p className="text-[12px] text-[#77837c]">
                  {filteredProducts.length} бараа
                </p>
                <select
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value)}
                  aria-label="Эрэмбэлэх"
                  className="h-11 border border-[#e1e5e0] bg-white px-3 text-[12px] font-semibold text-[#334139] outline-none"
                >
                  <option value="default">Анхдагч эрэмбэ</option>
                  <option value="name">Нэрээр</option>
                  <option value="price-asc">Үнэ: багаас их</option>
                  <option value="price-desc">Үнэ: ихээс бага</option>
                </select>
              </div>
            </div>

            {filteredProducts.length ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4 xl:gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="grid min-h-[280px] place-items-center border border-dashed border-[#d7ddd7] bg-white px-5 text-center">
                <div>
                  <PackageSearch
                    className="mx-auto text-[#aeb8b0]"
                    size={34}
                    strokeWidth={1.5}
                  />
                  <h2 className="mt-3 text-[16px] font-bold text-[#25332d]">
                    Бүтээгдэхүүн олдсонгүй
                  </h2>
                  <p className="mt-1 text-[12px] text-[#87928c]">
                    Хайлт эсвэл ангиллаа өөрчлөөд үзнэ үү.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
      <SiteFooter content={content} />
    </main>
  );
}

function CategoryButton({
  active,
  label,
  count,
  onClick,
  nested = false,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
  nested?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex h-10 w-full items-center justify-between gap-3 whitespace-nowrap border px-3 text-left text-[12px] transition-colors lg:border-0 ${
        nested ? "lg:pl-6" : ""
      } ${
        active
          ? "border-[#e76b35] bg-[#e76b35] font-bold text-white lg:bg-[#fff0e9] lg:text-[#d45d2d]"
          : "border-[#e4e8e3] bg-white text-[#526058] hover:bg-[#fff7f2] hover:text-[#d45d2d] lg:bg-transparent"
      }`}
    >
      <span>{label}</span>
      <span className={active ? "text-current opacity-70" : "text-[#9ba69e]"}>
        {count}
      </span>
    </button>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex min-w-0 flex-col border border-[#e8ebe6] bg-white transition-shadow hover:shadow-[0_12px_30px_rgba(25,42,32,0.08)]">
      <a
        href={`/products/${encodeURIComponent(product.id)}`}
        aria-label={`${product.name} дэлгэрэнгүй`}
        className="flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#e76b35]"
      >
        <div className="relative grid aspect-square place-items-center overflow-hidden bg-[#f4f6f3] p-4 sm:p-5">
          {product.isNew && (
            <span className="absolute left-2.5 top-2.5 z-10 bg-[#e76b35] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.07em] text-white">
              Шинэ
            </span>
          )}
          <img
            src={product.image || "/images/1.png"}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex flex-1 flex-col p-3 sm:p-4">
          <p className="truncate text-[9px] font-bold uppercase tracking-[0.08em] text-[#e76b35]">
            {product.category}
          </p>
          <h2 className="mt-1 min-h-[40px] text-[12px] font-bold leading-5 text-[#223029] sm:text-[13px]">
            {product.name}
          </h2>
          <p className="mt-1 truncate text-[10px] text-[#89938d]">
            Код: {product.sku}
          </p>
          <div className="mt-3 border-t border-[#edf0ec] pt-3">
            <p className="text-[14px] font-extrabold text-[#17212a]">
              {formatPrice(product.price)}{" "}
              <span className="text-[10px] font-semibold text-[#758078]">
                ₮
              </span>
            </p>
          </div>
        </div>
      </a>
    </article>
  );
}

function priceValue(price: string) {
  return Number(price.replace(/[^\d.-]/g, "")) || 0;
}

function formatPrice(price: string) {
  const value = priceValue(price);
  return value ? new Intl.NumberFormat("mn-MN").format(value) : price;
}
