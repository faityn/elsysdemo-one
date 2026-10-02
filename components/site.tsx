"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import SpecialProduct from "./SpecialProduct";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import RichTextContent from "./RichTextContent";
import {
  defaultSiteContent,
  loadSiteContent,
  type Product as ProductData,
  type SiteContent,
} from "@/lib/site-content";

const brands = [
  "RUBEZH",
  "ABB",
  "Schneider Electric",
  "IEK",
  "legrand",
  "CHINT",
  "PHILIPS",
  "OSRAM",
];
const trustIcons = [
  <ShieldCheck />,
  <Clock3 />,
  <ShieldCheck />,
  <Headphones />,
];
function Fade({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  );
}
function Trust({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 border-r px-4 py-5 last:border-r-0">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100">
        {icon}
      </div>
      <div>
        <b className="block text-[13px]">{title}</b>
        <span className="mt-1 block text-[11px] leading-3 text-slate-400">
          {text}
        </span>
      </div>
    </div>
  );
}
function Product({ p }: { p: ProductData }) {
  return (
    <motion.a
      href={`/products/${encodeURIComponent(p.id)}`}
      aria-label={`${p.name} дэлгэрэнгүй`}
      whileHover={{ y: -5 }}
      className="group relative block min-h-[190px] overflow-hidden rounded-lg border border-slate-100 bg-white p-2.5 text-[#111b22] shadow-sm hover:shadow-xl"
    >
      <div className="absolute left-2 top-2 z-10">
        {p.isNew && (
          <span className="rounded-full bg-orange-500 px-2 py-1 text-[9px] font-bold text-white">
            Шинэ
          </span>
        )}
      </div>
      <div className="h-[100px] overflow-hidden rounded-md">
        <img
          src={p.image}
          alt={p.name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-2 text-[12px] font-semibold leading-4">{p.name}</h3>
      <p className="mt-1 text-[9px] uppercase text-slate-400">{p.sku}</p>
      <div className="mt-2 flex items-center justify-between">
        <b className="text-[11px]">{p.price}</b>
        <span className="flex items-center gap-1 text-[10px] font-bold text-orange-500 group-hover:text-orange-600">
          Дэлгэрэнгүй <ArrowRight size={12} />
        </span>
      </div>
    </motion.a>
  );
}
function Stat({ num, text }: { num: string; text: string }) {
  return (
    <div className="border-r text-center last:border-0">
      <b className="text-[23px] font-black">{num}</b>
      <p className="mt-1 text-[10px] text-slate-400">{text}</p>
    </div>
  );
}

export default function Site() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);

  useEffect(() => {
    loadSiteContent().then(setContent);
  }, []);

  const newProducts = content.products.filter((product) => product.isNew);
  const featuredProducts = content.products.filter(
    (product) => product.featured,
  );
  const companyAbout = content.aboutPages.find(
    (page) => page.id === "about-company",
  );
  const companyAboutMenuItem = content.menu
    .flatMap((item) => item.children ?? [])
    .find((item) => item.id === "about-company");

  return (
    <main>
      <SiteHeader content={content} />
      <section
        id="home"
        className="hero-section relative flex min-h-[420px] items-center overflow-hidden bg-[#09141c]"
      >
        <div
          className="hero-image absolute inset-0 bg-no-repeat opacity-85"
          style={{
            backgroundImage: `url('${content.hero.image}')`,
            backgroundPosition: "right center",
            backgroundSize: "88% auto",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07131c] via-[#07131ce6] to-[#07131c26]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07131c] via-[#07131caa] to-transparent" />
        <div className="container relative z-10 py-12">
          <div className="max-w-[650px] text-white">
            <div className="eyebrow text-white/70">{content.hero.eyebrow}</div>
            <h1 className="mt-3 text-[40px] leading-[1.08] font-black tracking-tight">
              {content.hero.title}
              <br />
              <span className="text-orange-500">{content.hero.accent}</span>
            </h1>
            <RichTextContent
              content={content.hero.description}
              className="mt-3 text-[14px] leading-5 text-white/70"
            />
            <div className="mt-5 flex gap-3">
              <a
                href="/products"
                className="bg-orange-500 hover:bg-orange-600 rounded-full px-5 py-3 text-[12px] font-bold flex gap-2 items-center"
              >
                Бүтээгдэхүүн үзэх <ArrowRight size={14} />
              </a>
              <a
                href="#about"
                className="flex items-center gap-2 text-[12px] font-semibold"
              >
                <span className="w-9 h-9 rounded-full border border-white/30 grid place-items-center">
                  ▶
                </span>{" "}
                Компанийн тухай
              </a>
            </div>
          </div>
        </div>
        {/* <div className="absolute right-5 top-1/2 -translate-y-1/2 text-white hidden lg:block text-[9px] leading-7 text-right">
          01
          <br />
          <span className="text-orange-500">02</span>
          <br />
          03
        </div> */}
      </section>
      <section className="border-b bg-white">
        <div className="container grid grid-cols-2 md:grid-cols-4">
          {content.trustItems.map((item, index) => (
            <Trust
              key={index}
              icon={trustIcons[index % trustIcons.length]}
              title={item.title}
              text={item.description}
            />
          ))}
        </div>
      </section>
      <section
        id="products"
        className="section bg-[#0d171e] text-white relative overflow-hidden"
      >
        <div className="container relative">
          <Fade>
            <div className="eyebrow">Шинэ БҮТЭЭГДЭХҮҮН</div>
            <div className="flex justify-between items-end mt-2">
              <h2 className="text-[22px] font-black">
                Шинээр ирсэн тоног төхөөрөмж
              </h2>
              <a
                className="text-[11px] flex items-center gap-1"
                href="/products"
              >
                Бүх бүтээгдэхүүн <ArrowRight size={13} />
              </a>
            </div>
          </Fade>
          <div className="mt-5">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={10}
              slidesPerView={1.35}
              breakpoints={{
                640: { slidesPerView: 2.5 },
                900: { slidesPerView: 5 },
              }}
              autoplay={{ delay: 2800, disableOnInteraction: false }}
            >
              {newProducts.map((p, i) => (
                <SwiperSlide key={i}>
                  <Product p={p} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      {/* <section id="brands" className="py-8 bg-white">
        <div className="container">
          <Fade>
            <div className="eyebrow">БИДНИЙ ХАМТРАН АЖИЛЛАДАГ БРЭНДҮҮД</div>
            <h2 className="text-[19px] font-black mt-1">
              Албан ёсны эрхтэй брэндүүд
            </h2>
          </Fade>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={2}
            spaceBetween={8}
            breakpoints={{
              600: { slidesPerView: 4 },
              900: { slidesPerView: 8 },
            }}
            autoplay={{ delay: 1800, disableOnInteraction: false }}
            className="mt-5"
          >
            {brands.map((b) => (
              <SwiperSlide key={b}>
                <div className="h-12 rounded-md bg-slate-50 flex items-center justify-center font-black text-[14px] text-slate-500 px-2 text-center">
                  {b}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section> */}
      {companyAbout?.enabled !== false && (
        <section id="about" className="section pt-10">
          <div className="container">
            <div className="grid items-center gap-7 md:grid-cols-[1.05fr_1.2fr]">
              <Fade>
                <img
                  src={companyAbout?.image || "/images/about.jpg"}
                  alt={companyAbout?.title ?? "Компанийн тухай"}
                  className="aspect-[1.6] w-full rounded-lg object-cover shadow-soft"
                />
              </Fade>
              <Fade>
                <div>
                  <div className="eyebrow">БИДНИЙ ТУХАЙ</div>
                  <h2 className="mt-2 text-[22px] font-black leading-tight">
                    {companyAbout?.title ?? "Компанийн тухай"}
                  </h2>
                  <RichTextContent
                    content={companyAbout?.description ?? ""}
                    className="mt-3 line-clamp-3 text-[12px] leading-5 text-slate-500"
                  />
                  <a
                    href="/about#company"
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-[11px] font-bold hover:border-orange-500 hover:text-orange-500"
                  >
                    {companyAboutMenuItem?.label ?? "Дэлгэрэнгүй унших"}{" "}
                    <ArrowRight size={13} />
                  </a>
                </div>
              </Fade>
            </div>
            <div className="mt-8 grid grid-cols-3 border-t pt-5">
              <Stat num="12+" text="Жилийн туршлага" />
              <Stat num="500+" text="Харилцагчид" />
              <Stat num="100%" text="Баталгаат бүтээгдэхүүн" />
            </div>
          </div>
        </section>
      )}
      <section className="pb-12">
        <div className="container">
          <SpecialProduct products={content.specialProducts} />
          {/* <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            loop
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            navigation
            pagination={{
              clickable: true,
              renderBullet: (index, className) =>
                `<span class="${className}">${String(index + 1).padStart(2, "0")}</span>`,
            }}
            className="feature-swiper overflow-hidden rounded-lg"
          >
            {[
              [
                "Их талбайн гэрэлтүүлэг",
                "Барилга, талбай, үйлдвэрлэлийн зориулалттай өндөр хүчин чадлын LED прожектор.",
                "/images/feature.jpg",
              ],
              [
                "Гэрэлтүүлгийн ухаалаг шийдэл",
                "Чанартай, эрчим хүчний хэмнэлттэй гэрэлтүүлгийн тоног төхөөрөмж.",
                "/images/hero.png",
              ],
              [
                "Найдвартай тоног төхөөрөмж",
                "Барилгын цахилгаан системд зориулсан мэргэжлийн шийдэл.",
                "/images/about.jpg",
              ],
            ].map(([title, text, image]) => (
              <SwiperSlide key={title}>
                <div className="feature-slide grid md:grid-cols-[0.9fr_1.1fr] min-h-[260px] bg-[#0d1820] text-white">
                  <div className="relative z-10 flex flex-col items-start justify-center p-7 md:p-9">
                    <div className="eyebrow">ОНЦЛОХ БҮТЭЭГДЭХҮҮН</div>
                    <h2 className="mt-2 text-[21px] font-black leading-tight">
                      {title}
                    </h2>
                    <p className="mt-2 max-w-[300px] text-[12px] leading-5 text-white/70">
                      {text}
                    </p>
                    <button className="mt-5 flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-[11px] font-bold">
                      Дэлгэрэнгүй <ArrowRight size={13} />
                    </button>
                  </div>
                  <div className="min-h-[220px] overflow-hidden">
                    <img
                      src={image}
                      alt={title}
                      className="block h-full w-full object-cover object-right"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper> */}
        </div>
      </section>
      <section className="pb-12">
        <div className="container">
          <Fade>
            <div className="eyebrow">ОНЦЛОХ БҮТЭЭГДЭХҮҮН</div>
            <div className="flex justify-between">
              <h2 className="text-[20px] font-black mt-1">
                Онцлох бүтээгдэхүүнүүд
              </h2>
              <a
                className="text-[9px] flex items-center gap-1"
                href="/products"
              >
                Бүгдийг харах <ArrowRight size={13} />
              </a>
            </div>
          </Fade>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5">
            {featuredProducts.map((p, i) => (
              <Product key={i} p={p} />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter content={content} />
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed right-5 bottom-5 w-10 h-10 rounded-full bg-orange-500 text-white grid place-items-center shadow-lg hover:scale-110"
      >
        <ArrowUpRight size={17} />
      </button>
    </main>
  );
}
