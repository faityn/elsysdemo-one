"use client";

import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Check,
  DollarSign,
  Gauge,
  Globe,
  Lightbulb,
  Package,
  Star,
  Wrench,
} from "lucide-react";
import type { SpecialProductSlide } from "@/lib/site-content";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "./SpecialProduct.css";

/* =========================
   ICON
========================= */

function FeatureIcon({ type }: { type: string }) {
  if (type === "lightbulb") {
    return <Lightbulb size={20} strokeWidth={1.6} />;
  }

  if (type === "check") {
    return <Check size={20} strokeWidth={1.6} />;
  }

  if (type === "dollar") {
    return <DollarSign size={20} strokeWidth={1.6} />;
  }

  if (type === "star") {
    return <Star size={20} strokeWidth={1.6} />;
  }

  if (type === "gauge") {
    return <Gauge size={20} strokeWidth={1.6} />;
  }

  if (type === "wrench") {
    return <Wrench size={20} strokeWidth={1.6} />;
  }

  if (type === "globe") {
    return <Globe size={20} strokeWidth={1.6} />;
  }

  if (type === "package") {
    return <Package size={20} strokeWidth={1.6} />;
  }

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

export default function SpecialProduct({
  products,
}: {
  products: SpecialProductSlide[];
}) {
  return (
    <section className="special-product">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        loop={products.length > 1}
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
        {products.map((product) => (
          <SwiperSlide key={product.id}>
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

                <a href={product.linkHref} className="special-product-button">
                  {product.linkLabel}
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
                    <div className="special-product-feature" key={feature.id}>
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
