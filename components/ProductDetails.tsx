"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Mail,
  PackageSearch,
  Phone,
} from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import RichTextContent from "@/components/RichTextContent";
import {
  defaultSiteContent,
  loadSiteContent,
  type Product,
  type SiteContent,
} from "@/lib/site-content";

export default function ProductDetails({ productId }: { productId: string }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadSiteContent()
      .then((loadedContent) => {
        setContent(loadedContent);
        const selectedProduct = loadedContent.products.find(
          (item) => item.id === productId,
        );
        setProduct(selectedProduct ?? null);
        if (selectedProduct) {
          const sameCategory = loadedContent.products.filter(
            (item) =>
              item.id !== selectedProduct.id &&
              item.category === selectedProduct.category,
          );
          const recommendations = sameCategory.length
            ? sameCategory
            : loadedContent.products.filter(
                (item) => item.id !== selectedProduct.id && item.featured,
              );
          setRelatedProducts(recommendations.slice(0, 4));
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setReady(true));
  }, [productId]);

  return (
    <main className="min-h-screen bg-[#f7f8f6]">
      <SiteHeader content={content} />
      {!ready ? (
        <div
          aria-busy="true"
          className="container grid min-h-[55vh] place-items-center text-[13px] text-[#77837c]"
        >
          Бүтээгдэхүүний мэдээлэл ачаалж байна...
        </div>
      ) : product ? (
        <>
          <div className="container pt-6 md:pt-8">
            <nav
              aria-label="Талхны үйрмэг"
              className="flex flex-wrap items-center gap-2 text-[11px] text-[#849087]"
            >
              <a href="/products" className="hover:text-[#d45d2d]">
                Бүтээгдэхүүн
              </a>
              <span>/</span>
              {content.categoryParents[product.category] && (
                <>
                  <span>{content.categoryParents[product.category]}</span>
                  <span>/</span>
                </>
              )}
              <span className="font-semibold text-[#344139]">
                {product.category}
              </span>
            </nav>
          </div>

          <section className="container grid gap-7 py-6 md:grid-cols-[1.05fr_0.95fr] md:gap-10 md:py-9">
            <div className="relative grid min-h-[330px] place-items-center border border-[#e5e9e3] bg-white p-6 sm:min-h-[430px] md:min-h-[500px] md:p-10">
              {(product.isNew || product.featured) && (
                <div className="absolute left-4 top-4 flex gap-2">
                  {product.isNew && (
                    <span className="bg-[#e76b35] px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white">
                      Шинэ
                    </span>
                  )}
                  {product.featured && (
                    <span className="bg-[#20352c] px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white">
                      Онцлох
                    </span>
                  )}
                </div>
              )}
              <img
                src={product.image || "/images/1.png"}
                alt={product.name}
                className="max-h-[430px] w-full object-contain"
              />
            </div>

            <div className="flex flex-col justify-center py-1 md:py-5">
              <a
                href="/products"
                className="mb-7 inline-flex w-fit items-center gap-2 text-[11px] font-semibold text-[#78847c] transition-colors hover:text-[#d45d2d]"
              >
                <ArrowLeft size={14} /> Каталог руу буцах
              </a>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#e76b35]">
                {product.category}
              </p>
              <h1 className="mt-2 text-[28px] font-black leading-[1.2] text-[#17212a] md:text-[36px]">
                {product.name}
              </h1>
              <p className="mt-3 text-[12px] text-[#87928c]">
                Бүтээгдэхүүний код:{" "}
                <span className="font-semibold text-[#526058]">
                  {product.sku}
                </span>
              </p>

              <div className="mt-6 border-y border-[#e2e7e1] py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#87928c]">
                  Үнэ
                </p>
                <p className="mt-1 text-[26px] font-black text-[#17212a]">
                  {formatPrice(product.price)}{" "}
                  <span className="text-[15px] font-bold text-[#718078]">
                    ₮
                  </span>
                </p>
              </div>

              <p className="mt-5 max-w-[480px] text-[13px] leading-6 text-[#66736a]">
                Энэ бүтээгдэхүүний үнэ, нийлүүлэлт болон сонголтын талаар манай
                багтай холбогдож зөвлөгөө аваарай.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${content.contact.email}?subject=${encodeURIComponent(product.name)}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#e76b35] px-5 text-[12px] font-bold text-white transition-colors hover:bg-[#d45d2d]"
                >
                  <Mail size={16} /> Үнийн санал авах
                  <ArrowUpRight size={14} />
                </a>
                <a
                  href={`tel:${content.contact.phone.replace(/[^\d+]/g, "")}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#dce2dc] bg-white px-5 text-[12px] font-bold text-[#344139] transition-colors hover:border-[#bfc9bf]"
                >
                  <Phone size={15} /> {content.contact.phone}
                </a>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-[#e2e7e1] pt-5">
                <div>
                  <dt className="text-[10px] text-[#8a958d]">Ангилал</dt>
                  <dd className="mt-1 text-[12px] font-semibold text-[#344139]">
                    {product.category}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] text-[#8a958d]">Барааны код</dt>
                  <dd className="mt-1 text-[12px] font-semibold text-[#344139]">
                    {product.sku}
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          {product.description?.trim() && (
            <section className="border-t border-[#e5e9e3] bg-white">
              <div className="container py-8 md:py-11">
                <div className="max-w-[820px]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#e76b35]">
                    БҮТЭЭГДЭХҮҮНИЙ МЭДЭЭЛЭЛ
                  </p>
                  <h2 className="mt-1 text-[21px] font-black text-[#17212a]">
                    Дэлгэрэнгүй тайлбар
                  </h2>
                  <RichTextContent
                    content={product.description}
                    className="mt-4 text-[13px] leading-7 text-[#66736a]"
                  />
                </div>
              </div>
            </section>
          )}

          {relatedProducts.length > 0 && (
            <section className="border-t border-[#e5e9e3] bg-white py-9 md:py-12">
              <div className="container">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#e76b35]">
                      ТӨСТЭЙ БҮТЭЭГДЭХҮҮН
                    </p>
                    <h2 className="mt-1 text-[20px] font-black text-[#17212a]">
                      {product.category} ангилалд
                    </h2>
                  </div>
                  <a
                    href="/products"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#66736a] hover:text-[#d45d2d]"
                  >
                    Бүгдийг үзэх <ArrowUpRight size={13} />
                  </a>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                  {relatedProducts.map((relatedProduct) => (
                    <a
                      key={relatedProduct.id}
                      href={`/products/${encodeURIComponent(relatedProduct.id)}`}
                      className="group border border-[#e8ebe6] bg-white transition-shadow hover:shadow-[0_10px_24px_rgba(25,42,32,0.08)]"
                    >
                      <div className="grid aspect-square place-items-center bg-[#f4f6f3] p-4">
                        <img
                          src={relatedProduct.image || "/images/1.png"}
                          alt={relatedProduct.name}
                          loading="lazy"
                          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="min-h-10 text-[12px] font-bold leading-5 text-[#25332d]">
                          {relatedProduct.name}
                        </h3>
                        <p className="mt-2 text-[13px] font-extrabold text-[#17212a]">
                          {formatPrice(relatedProduct.price)} ₮
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="container grid min-h-[55vh] place-items-center py-12 text-center">
          <div>
            <PackageSearch
              className="mx-auto text-[#aeb8b0]"
              size={38}
              strokeWidth={1.5}
            />
            <h1 className="mt-4 text-[22px] font-black text-[#25332d]">
              Бүтээгдэхүүн олдсонгүй
            </h1>
            <p className="mt-2 text-[12px] text-[#87928c]">
              Энэ бүтээгдэхүүн устсан эсвэл холбоос буруу байна.
            </p>
            <a
              href="/products"
              className="mt-5 inline-flex min-h-11 items-center justify-center bg-[#e76b35] px-5 text-[12px] font-bold text-white hover:bg-[#d45d2d]"
            >
              Каталог руу буцах
            </a>
          </div>
        </section>
      )}
      <SiteFooter content={content} />
    </main>
  );
}

function formatPrice(price: string) {
  const value = Number(price.replace(/[^\d.-]/g, ""));
  return value ? new Intl.NumberFormat("mn-MN").format(value) : price;
}
