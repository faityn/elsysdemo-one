"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Headphones,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Mail,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import SpecialProduct from "./SpecialProduct";

const products = [
  ["Түгшүүрийн гэрэлт хонх", "Призма-202", "29,000", "1.png", "Шинэ"],
  ["Хяналтын IP камер 3МР", "JA-PD3031-POE", "125,000", "2.png", "Хямдрал"],
  ["Хаягийн дохиоллын пульт", "Рубеж-2ОП", "980,000", "3.png", "Шинэ"],
  ["Хаягийн цэгэн утаа мэдрэгч", "ИП 212/101-64-PR", "68,500", "4.png", ""],
  ["Хаяглагддаг утаа мэдрэгч", "ДИП-34А-03", "29,000", "5.png", ""],
];
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
    <div className="py-5 px-4 flex gap-3 border-r last:border-r-0">
      <div className="w-9 h-9 shrink-0 rounded-full bg-slate-100 grid place-items-center">
        {icon}
      </div>
      <div>
        <b className="block text-[13px]">{title}</b>
        <span className="text-[11px] text-slate-400 leading-3 block mt-1">
          {text}
        </span>
      </div>
    </div>
  );
}
function Product({ p }: { p: string[] }) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="group bg-white text-[#111b22] rounded-lg p-2.5 min-h-[190px] border border-slate-100 shadow-sm hover:shadow-xl relative overflow-hidden"
    >
      <div className="absolute top-2 left-2 z-10">
        {p[4] && (
          <span className="bg-orange-500 text-white rounded-full px-2 py-1 text-[9px] font-bold">
            {p[4]}
          </span>
        )}
      </div>
      <div className="h-[100px] rounded-md overflow-hidden">
        <img
          src={"/images/" + p[3]}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="text-[12px] font-semibold leading-4 mt-2">{p[0]}</h3>
      <p className="text-[9px] text-slate-400 mt-1 uppercase">{p[1]}</p>
      <div className="flex items-center justify-between mt-2">
        <b className="text-[11px]">{p[2]}</b>
        <a
          href="#about"
          className="flex items-center gap-1 text-[10px] font-bold text-orange-500 hover:text-orange-600"
        >
          Дэлгэрэнгүй <ArrowRight size={12} />
        </a>
      </div>
    </motion.article>
  );
}
function Stat({ num, text }: { num: string; text: string }) {
  return (
    <div className="text-center border-r last:border-0">
      <b className="text-[23px] font-black">{num}</b>
      <p className="text-[10px] text-slate-400 mt-1">{text}</p>
    </div>
  );
}
export default function Site() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main>
      <header className="h-[72px] border-b bg-white sticky top-0 z-50">
        <div className="container h-full flex items-center gap-7">
          <div className="font-black text-[25px] tracking-[-1.5px] text-[#f36b21]">
            elsys<span className="text-[12px] text-[#17212a]">.eng.</span>
            <div className="text-[7px] text-slate-400 tracking-[.25em] mt-[-2px]">
              BUILDING A SAFER FUTURE
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-[11px] font-bold flex-1 justify-center">
            <a href="#home" className="text-orange-500 ">
              НҮҮР
            </a>
            <div className="group relative h-full flex items-center">
              <a href="#about" className="py-5">
                ТАНИЛЦУУЛГА
              </a>
              <div className="invisible absolute left-0 top-full z-50 w-48 translate-y-1 opacity-0 rounded-b-md border border-slate-100 bg-white py-2 text-[12px] font-normal text-slate-600 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <a
                  href="#about"
                  className="block px-4 py-2.5 hover:bg-orange-50 hover:text-orange-500"
                >
                  Компанийн тухай
                </a>
                <a
                  href="#projects"
                  className="block px-4 py-2.5 hover:bg-orange-50 hover:text-orange-500"
                >
                  Оролцсон төсөл
                </a>
                <a
                  href="#careers"
                  className="block px-4 py-2.5 hover:bg-orange-50 hover:text-orange-500"
                >
                  Ажлын байр
                </a>
              </div>
            </div>
            <a href="#products">БҮТЭЭГДЭХҮҮН</a>

            <a href="#contact">ХОЛБОО БАРИХ</a>
          </nav>
          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden sm:flex h-10 w-36 rounded-full bg-slate-50 items-center px-3 gap-2 text-[12px] text-slate-400">
              <Search size={14} /> Хайлт...
            </div>
            {/* <ShoppingCart size={18} /> */}
            <button
              type="button"
              className="md:hidden text-[#17212a]"
              aria-label="Цэс нээх"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <nav className="md:hidden absolute left-0 right-0 top-full border-t border-slate-100 bg-white px-6 py-4 shadow-lg">
            <div className="flex flex-col gap-4 text-[12px] font-semibold text-slate-700">
              <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>
                НҮҮР
              </a>
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>
                ТАНИЛЦУУЛГА
              </a>
              <a href="#products" onClick={() => setIsMobileMenuOpen(false)}>
                БҮТЭЭГДЭХҮҮН
              </a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                ХОЛБОО БАРИХ
              </a>
            </div>
          </nav>
        )}
      </header>
      <section
        id="home"
        className="hero-section relative flex min-h-[420px] items-center overflow-hidden bg-[#09141c]"
      >
        <div
          className="hero-image absolute inset-0 bg-no-repeat opacity-85"
          style={{
            backgroundImage: "url('/images/hero.png')",
            backgroundPosition: "right center",
            backgroundSize: "88% auto",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07131c] via-[#07131ce6] to-[#07131c26]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07131c] via-[#07131caa] to-transparent" />
        <div className="container relative z-10 py-12">
          <div className="max-w-[650px] text-white">
            <div className="eyebrow text-white/70">
              БАРИЛГЫН ЦАХИЛГААН ТОНОГ ТӨХӨӨРӨМЖ
            </div>
            <h1 className="mt-3 text-[40px] leading-[1.08] font-black tracking-tight">
              Найдвартай тоног төхөөрөмж
              <br />
              <span className="text-orange-500">Аюулгүй барилгын төлөө</span>
            </h1>
            <p className="mt-3 text-[14px] leading-5 text-white/70">
              Бид барилга, байгууламжийн цахилгаан угсралт, гэрэлтүүлэг,
              хамгаалалтын системийн чанартай бүтээгдэхүүнийг албан ёсны
              дистрибьютерээс хангана.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#products"
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
          <Trust
            icon={<ShieldCheck />}
            title="Албан ёсны дилер"
            text="Дэлхийн шилдэг брэндийн албан ёсны дистрибьютер"
          />
          <Trust
            icon={<Clock3 />}
            title="Хурдан хүргэлт"
            text="Улаанбаатар хот болон орон нутагт түргэн шуурхай хүргэнэ."
          />
          <Trust
            icon={<ShieldCheck />}
            title="Чанарын баталгаа"
            text="Бүх бүтээгдэхүүн баталгаат үйлчилгээтэй."
          />
          <Trust
            icon={<Headphones />}
            title="Мэргэжлийн зөвлөгөө"
            text="Техникийн зөвлөгөө, сонголтод тусална."
          />
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
              <a className="text-[11px] flex items-center gap-1" href="#">
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
              {products.map((p, i) => (
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
      <section id="about" className="section pt-10">
        <div className="container">
          <div className="grid md:grid-cols-[1.05fr_1.2fr] gap-7 items-center">
            <Fade>
              <img
                src="/images/about.jpg"
                className="w-full aspect-[1.6] object-cover rounded-lg shadow-soft"
              />
            </Fade>
            <Fade>
              <div>
                <div className="eyebrow">БИДНИЙ ТУХАЙ</div>
                <h2 className="text-[22px] leading-tight font-black mt-2">
                  Барилгын цахилгаан тоног төхөөрөмжийн найдвартай нийлүүлэгч
                </h2>
                <p className="text-[12px] text-slate-500 leading-5 mt-3">
                  Elsys Eng. ХХК нь барилга, байгууламжийн цахилгаан тоног
                  төхөөрөмж, гэрэлтүүлэг, хамгаалалтын системийн өндөр чанартай
                  бүтээгдэхүүнийг Монголын зах зээлд нийлүүлдэг.
                </p>
                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-2 border border-slate-300 rounded-full px-5 py-2.5 text-[11px] font-bold hover:border-orange-500 hover:text-orange-500"
                >
                  Дэлгэрэнгүй унших <ArrowRight size={13} />
                </a>
              </div>
            </Fade>
          </div>
          <div className="grid grid-cols-3 border-t mt-8 pt-5">
            <Stat num="12+" text="Жилийн туршлага" />
            <Stat num="500+" text="Харилцагчид" />
            <Stat num="100%" text="Баталгаат бүтээгдэхүүн" />
          </div>
        </div>
      </section>
      <section className="pb-12">
        <div className="container">
          <SpecialProduct />
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
            <div className="eyebrow">ШИНЭ БҮТЭЭГДЭХҮҮН</div>
            <div className="flex justify-between">
              <h2 className="text-[20px] font-black mt-1">
                Онцлох бүтээгдэхүүнүүд
              </h2>
              <a
                className="text-[9px] flex items-center gap-1"
                href="#products"
              >
                Бүгдийг харах <ArrowRight size={13} />
              </a>
            </div>
          </Fade>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5">
            {products.map((p, i) => (
              <Product key={i} p={p} />
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-[#111c24] text-white pt-9 pb-5">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="font-black text-[32px] text-orange-500">
                elsys<span className="text-[13px] text-white">.eng.</span>
              </div>
              <div className="text-[8px] tracking-[.2em] text-slate-500">
                BUILDING A SAFER FUTURE
              </div>
              <div className="flex gap-3 mt-7 text-slate-300">
                <Instagram size={15} />
                <Youtube size={15} />
                <Linkedin size={15} />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[12px] mb-4">Меню</h3>
              <div className="flex flex-col gap-3 text-[11px] text-slate-300">
                <a href="#home" className="hover:text-orange-500">
                  Нүүр
                </a>
                <a href="#products" className="hover:text-orange-500">
                  Бүтээгдэхүүн
                </a>
                <a href="#about" className="hover:text-orange-500">
                  Танилцуулга
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[12px] mb-4">Холбоо барих</h3>
              <div className="space-y-3 text-[11px] text-slate-300">
                <div className="flex gap-2">
                  <MapPin size={13} /> Монгол улс, Улаанбаатар хот
                </div>
                <div className="flex gap-2">
                  <Phone size={13} /> +976 0000 0000 / +976 0010 0000
                </div>
                <div className="flex gap-2">
                  <Mail size={13} /> info@elsys.mn
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-4 flex justify-between text-[11px] text-slate-500">
            <span>
              Нүүр　|　Бүтээгдэхүүн　|　Брэнд　|　Танилцуулга　|　Холбоо барих
            </span>
            <span>© 2026 Elsys Eng. Бүх эрх хуулиар хамгаалагдсан.</span>
          </div>
        </div>
      </footer>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed right-5 bottom-5 w-10 h-10 rounded-full bg-orange-500 text-white grid place-items-center shadow-lg hover:scale-110"
      >
        <ArrowUpRight size={17} />
      </button>
    </main>
  );
}
