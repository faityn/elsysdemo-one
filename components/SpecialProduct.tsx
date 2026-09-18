"use client";

import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "./SpecialProduct.css";

const products = [
  {
    category: "ЧАНАРТАЙ БҮТЭЭГДЭХҮҮН",
    title: "Их талбайн гэрэлтүүлэг",
    description:
      "Барилга, талбай, үйлдвэрийн зориулалттай өндөр хүчин чадалтай LED гэрэлтүүлэг.",
    image: "/images/s2.png",
    features: [
      {
        icon: "shield",
        title: "IP67",
        description: "Усны хамгаалалт",
      },
      {
        icon: "clock",
        title: "50,000+ цаг",
        description: "Ашиглалтын хугацаа",
      },
      {
        icon: "bolt",
        title: "Өндөр үр ашиг",
        description: "Эрчим хүчний хэмнэлт",
      },
    ],
  },

  {
    category: "МЭРГЭЖЛИЙН ГЭРЭЛТҮҮЛЭГ",
    title: "Үйлдвэрийн LED гэрэл",
    description:
      "Үйлдвэр, агуулах болон томоохон талбайд ашиглах зориулалттай хүчирхэг LED гэрэл.",
    image: "/images/s1.png",
    features: [
      {
        icon: "shield",
        title: "IP65",
        description: "Тоос, усны хамгаалалт",
      },
      {
        icon: "clock",
        title: "60,000+ цаг",
        description: "Удаан ашиглалт",
      },
      {
        icon: "bolt",
        title: "150W",
        description: "Өндөр хүчин чадал",
      },
    ],
  },

  {
    category: "ГАДНА ТАЛБАЙН",
    title: "Гудамжны LED гэрэлтүүлэг",
    description:
      "Зам талбай, гудамж болон гадна орчинд зориулсан эрчим хүчний хэмнэлттэй шийдэл.",
    image: "/images/s3.png",
    features: [
      {
        icon: "shield",
        title: "IP66",
        description: "Бат бөх хийц",
      },
      {
        icon: "clock",
        title: "50,000+ цаг",
        description: "Ашиглалтын хугацаа",
      },
      {
        icon: "bolt",
        title: "120W",
        description: "Эрчим хүчний хэмнэлт",
      },
    ],
  },
];

/* =========================
   ICON
========================= */

function FeatureIcon({ type }: { type: string }) {
  if (type === "shield") {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3L19 6V11.5C19 16.2 16 19.8 12 21C8 19.8 5 16.2 5 11.5V6L12 3Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        <path
          d="M9 12L11 14L15 10"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="8.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        <path
          d="M12 7V12L15 14"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M13.5 2L6.5 13H11L10.5 22L17.5 11H13L13.5 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================
   COMPONENT
========================= */

export default function SpecialProduct() {
  return (
    <section className="special-product">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        loop={true}
        speed={700}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".special-product-next",
          prevEl: ".special-product-prev",
        }}
        pagination={{
          el: ".special-product-pagination",
          clickable: true,
        }}
        className="special-product-swiper"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="special-product-slide">
              {/* =========================
                  BACKGROUND
              ========================= */}

              <div className="special-product-bg" />

              {/* =========================
                  LEFT CONTENT
              ========================= */}

              <div className="special-product-content">
                <div className="special-product-category">
                  <span />
                  {product.category}
                </div>

                <h2>{product.title}</h2>

                <p>{product.description}</p>

                <a href="#" className="special-product-button">
                  Дэлгэрэнгүй
                  <svg viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10H16M11 5L16 10L11 15"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>

              {/* =========================
                  PRODUCT IMAGE
              ========================= */}

              <div className="special-product-image">
                <img src={product.image} alt={product.title} />
              </div>

              {/* =========================
                  RIGHT INFO
              ========================= */}

              <div className="special-product-info">
                <div className="special-product-features">
                  {product.features.map((feature, featureIndex) => (
                    <div className="special-product-feature" key={featureIndex}>
                      <div className="special-product-icon">
                        <FeatureIcon type={feature.icon} />
                      </div>

                      <div className="special-product-feature-text">
                        <strong>{feature.title}</strong>

                        <span>{feature.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="special-product-controls">
        <div className="special-product-pagination" />

        <div className="special-product-arrows">
          <button
            type="button"
            className="special-product-prev"
            aria-label="Өмнөх"
          >
            <svg viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 4L6.5 10L12.5 16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            className="special-product-next"
            aria-label="Дараах"
          >
            <svg viewBox="0 0 20 20" fill="none">
              <path
                d="M7.5 4L13.5 10L7.5 16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
