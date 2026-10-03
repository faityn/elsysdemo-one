export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  image: string;
  description: string;
  isNew: boolean;
  featured: boolean;
};

export type TrustItem = { id: string; title: string; description: string };
export type AboutProject = {
  id: string;
  title: string;
  description: string;
  image: string;
};
export type AboutCompanySection = {
  id: string;
  title: string;
  description: string;
  image: string;
};
export type CareerOpening = {
  id: string;
  title: string;
  duties: string;
  requirements: string;
  headcount: number;
  applicationDeadline: string;
  description?: string;
  type?: string;
  location?: string;
};
export type SpecialProductFeature = {
  id: string;
  icon:
    | "lightbulb"
    | "shield"
    | "clock"
    | "bolt"
    | "check"
    | "dollar"
    | "star"
    | "gauge"
    | "wrench"
    | "globe"
    | "package";
  title: string;
  description: string;
};
export type SpecialProductSlide = {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  linkLabel: string;
  linkHref: string;
  features: SpecialProductFeature[];
};

export type SiteContent = {
  brand: { name: string; suffix: string; tagline: string };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
    image: string;
  };
  menu: {
    id: string;
    label: string;
    href: string;
    enabled: boolean;
    children?: { id: string; label: string; href: string; enabled: boolean }[];
  }[];
  categories: string[];
  categoryParents: Record<string, string>;
  aboutPages: {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
    image?: string;
    sections?: AboutCompanySection[];
    projects?: AboutProject[];
    careers?: CareerOpening[];
  }[];
  products: Product[];
  specialProducts: SpecialProductSlide[];
  contact: { address: string; phone: string; email: string };
  trustItems: TrustItem[];
};

export const defaultSiteContent: SiteContent = {
  brand: { name: "elsys", suffix: ".eng.", tagline: "BUILDING A SAFER FUTURE" },
  hero: {
    eyebrow: "БАРИЛГЫН ЦАХИЛГААН ТОНОГ ТӨХӨӨРӨМЖ",
    title: "Найдвартай тоног төхөөрөмж",
    accent: "Аюулгүй барилгын төлөө",
    description:
      "Барилга, байгууламжийн цахилгаан угсралт, гэрэлтүүлэг, хамгаалалтын системийн чанартай бүтээгдэхүүн.",
    image: "/images/hero.png",
  },
  menu: [
    { id: "home", label: "НҮҮР", href: "#home", enabled: true },
    {
      id: "about",
      label: "ТАНИЛЦУУЛГА",
      href: "/about",
      enabled: true,
      children: [
        {
          id: "about-company",
          label: "Компанийн тухай",
          href: "/about#company",
          enabled: true,
        },
        {
          id: "about-projects",
          label: "Оролцсон төсөл",
          href: "/about#projects",
          enabled: true,
        },
        {
          id: "about-careers",
          label: "Ажлын байр",
          href: "/about#careers",
          enabled: true,
        },
      ],
    },
    { id: "products", label: "БҮТЭЭГДЭХҮҮН", href: "#products", enabled: true },
    { id: "contact", label: "ХОЛБОО БАРИХ", href: "#contact", enabled: true },
  ],
  categories: ["Галын дохиолол", "Камер ба хамгаалалт", "Гэрэлтүүлэг"],
  categoryParents: {},
  aboutPages: [
    {
      id: "about-company",
      title: "Компанийн тухай",
      description:
        "Elsys Eng. ХХК нь барилгын цахилгаан тоног төхөөрөмжийн найдвартай нийлүүлэгч.",
      enabled: true,
      image: "/images/about.jpg",
    },
    {
      id: "about-projects",
      title: "Оролцсон төсөл",
      description: "Бидний хэрэгжүүлсэн төсөл, хамтын ажиллагааны мэдээлэл.",
      enabled: true,
      projects: [],
    },
    {
      id: "about-careers",
      title: "Ажлын байр",
      description: "Манай багт нэгдэх боломжуудын мэдээлэл.",
      enabled: true,
      careers: [],
    },
  ],
  products: [
    {
      id: "product-1",
      name: "Түгшүүрийн гэрэлт хонх",
      sku: "Призма-202",
      category: "Галын дохиолол",
      price: "29,000",
      image: "/images/1.png",
      description: "",
      isNew: true,
      featured: true,
    },
    {
      id: "product-2",
      name: "Хяналтын IP камер 3МР",
      sku: "JA-PD3031-POE",
      category: "Камер ба хамгаалалт",
      price: "125,000",
      image: "/images/2.png",
      description: "",
      isNew: false,
      featured: true,
    },
    {
      id: "product-3",
      name: "Хаягийн дохиоллын пульт",
      sku: "Рубеж-2ОП",
      category: "Галын дохиолол",
      price: "980,000",
      image: "/images/3.png",
      description: "",
      isNew: true,
      featured: false,
    },
  ],
  specialProducts: [
    {
      id: "special-lighting-1",
      category: "ЧАНАРТАЙ БҮТЭЭГДЭХҮҮН",
      title: "Их талбайн гэрэлтүүлэг",
      description:
        "Барилга, талбай, үйлдвэрийн зориулалттай өндөр хүчин чадалтай LED гэрэлтүүлэг.",
      image: "/images/s2.png",
      linkLabel: "Дэлгэрэнгүй",
      linkHref: "#products",
      features: [
        {
          id: "special-lighting-1-feature-1",
          icon: "lightbulb",
          title: "IP67",
          description: "Усны хамгаалалт",
        },
        {
          id: "special-lighting-1-feature-2",
          icon: "clock",
          title: "50,000+ цаг",
          description: "Ашиглалтын хугацаа",
        },
        {
          id: "special-lighting-1-feature-3",
          icon: "bolt",
          title: "Өндөр үр ашиг",
          description: "Эрчим хүчний хэмнэлт",
        },
      ],
    },
    {
      id: "special-lighting-2",
      category: "МЭРГЭЖЛИЙН ГЭРЭЛТҮҮЛЭГ",
      title: "Үйлдвэрийн LED гэрэл",
      description:
        "Үйлдвэр, агуулах болон томоохон талбайд ашиглах зориулалттай хүчирхэг LED гэрэл.",
      image: "/images/s1.png",
      linkLabel: "Дэлгэрэнгүй",
      linkHref: "#products",
      features: [
        {
          id: "special-lighting-2-feature-1",
          icon: "shield",
          title: "IP65",
          description: "Тоос, усны хамгаалалт",
        },
        {
          id: "special-lighting-2-feature-2",
          icon: "clock",
          title: "60,000+ цаг",
          description: "Удаан ашиглалт",
        },
        {
          id: "special-lighting-2-feature-3",
          icon: "bolt",
          title: "150W",
          description: "Өндөр хүчин чадал",
        },
      ],
    },
    {
      id: "special-lighting-3",
      category: "ГАДНА ТАЛБАЙН",
      title: "Гудамжны LED гэрэлтүүлэг",
      description:
        "Зам талбай, гудамж болон гадна орчинд зориулсан эрчим хүчний хэмнэлттэй шийдэл.",
      image: "/images/s3.png",
      linkLabel: "Дэлгэрэнгүй",
      linkHref: "#products",
      features: [
        {
          id: "special-lighting-3-feature-1",
          icon: "shield",
          title: "IP66",
          description: "Бат бөх хийц",
        },
        {
          id: "special-lighting-3-feature-2",
          icon: "clock",
          title: "50,000+ цаг",
          description: "Ашиглалтын хугацаа",
        },
        {
          id: "special-lighting-3-feature-3",
          icon: "bolt",
          title: "120W",
          description: "Эрчим хүчний хэмнэлт",
        },
      ],
    },
  ],
  contact: {
    address: "Монгол улс, Улаанбаатар хот",
    phone: "+976 0000 0000",
    email: "info@elsys.mn",
  },
  trustItems: [
    {
      id: "trust-dealer",
      title: "Албан ёсны дилер",
      description: "Дэлхийн шилдэг брэндийн албан ёсны дистрибьютер",
    },
    {
      id: "trust-delivery",
      title: "Хурдан хүргэлт",
      description: "Улаанбаатар хот болон орон нутагт түргэн шуурхай хүргэнэ.",
    },
    {
      id: "trust-quality",
      title: "Чанарын баталгаа",
      description: "Бүх бүтээгдэхүүн баталгаат үйлчилгээтэй.",
    },
    {
      id: "trust-support",
      title: "Мэргэжлийн зөвлөгөө",
      description: "Техникийн зөвлөгөө, сонголтод тусална.",
    },
  ],
};

import { getSupabaseBrowserClient } from "./supabase";

function categoryId(name: string) {
  const encoded = encodeURIComponent(name.trim()).replace(/%/g, "");
  return `category-${encoded || "untitled"}`.slice(0, 180);
}

function mergeContent(
  parsed: Partial<SiteContent> | null | undefined,
): SiteContent {
  if (!parsed) return defaultSiteContent;
  const savedAboutPages = Array.isArray(parsed.aboutPages)
    ? parsed.aboutPages
    : [];
  const defaultAboutPageIds = new Set(
    defaultSiteContent.aboutPages.map((page) => page.id),
  );
  const aboutPages = [
    ...defaultSiteContent.aboutPages.map((defaultPage) => ({
      ...defaultPage,
      ...savedAboutPages.find((page) => page.id === defaultPage.id),
    })),
    ...savedAboutPages.filter((page) => !defaultAboutPageIds.has(page.id)),
  ];
  return {
    ...defaultSiteContent,
    ...parsed,
    brand: { ...defaultSiteContent.brand, ...parsed.brand },
    hero: { ...defaultSiteContent.hero, ...parsed.hero },
    contact: { ...defaultSiteContent.contact, ...parsed.contact },
    categoryParents:
      parsed.categoryParents && typeof parsed.categoryParents === "object"
        ? parsed.categoryParents
        : defaultSiteContent.categoryParents,
    trustItems:
      Array.isArray(parsed.trustItems) && parsed.trustItems.length
        ? parsed.trustItems
        : defaultSiteContent.trustItems,
    menu: Array.isArray(parsed.menu) ? parsed.menu : defaultSiteContent.menu,
    categories: Array.isArray(parsed.categories)
      ? parsed.categories
      : defaultSiteContent.categories,
    aboutPages,
    products: Array.isArray(parsed.products)
      ? parsed.products
      : defaultSiteContent.products,
    specialProducts:
      Array.isArray(parsed.specialProducts) && parsed.specialProducts.length
        ? parsed.specialProducts
        : defaultSiteContent.specialProducts,
  };
}

export async function loadSiteContent(): Promise<SiteContent> {
  const supabase = getSupabaseBrowserClient();
  const [
    settings,
    hero,
    contact,
    menu,
    categories,
    aboutPages,
    aboutProjects,
    companySections,
    careerOpenings,
    trustItems,
    specialSlides,
    specialFeatures,
    products,
  ] = await Promise.all([
    supabase
      .from("site_settings")
      .select("brand_name, brand_suffix, tagline")
      .eq("id", "main")
      .maybeSingle(),
    supabase
      .from("site_hero")
      .select("eyebrow, title, accent, description, image")
      .eq("id", "main")
      .maybeSingle(),
    supabase
      .from("site_contact")
      .select("address, phone, email")
      .eq("id", "main")
      .maybeSingle(),
    supabase
      .from("site_menu")
      .select("id, parent_id, label, href, enabled")
      .order("sort_order"),
    supabase
      .from("categories")
      .select("id, name, parent_id")
      .order("sort_order"),
    supabase
      .from("about_pages")
      .select("id, title, description, enabled, image")
      .order("sort_order"),
    supabase
      .from("about_projects")
      .select("id, page_id, title, description, image")
      .order("sort_order"),
    supabase
      .from("about_company_sections")
      .select("id, title, description, image")
      .eq("page_id", "about-company")
      .order("sort_order"),
    supabase
      .from("career_openings")
      .select(
        "id, page_id, title, duties, requirements, headcount, application_deadline",
      )
      .order("sort_order"),
    supabase
      .from("site_trust_items")
      .select("id, title, description")
      .order("sort_order"),
    supabase
      .from("special_product_slides")
      .select("id, category, title, description, image, link_label, link_href")
      .order("sort_order"),
    supabase
      .from("special_product_features")
      .select("id, slide_id, icon, title, description")
      .order("sort_order"),
    supabase
      .from("products")
      .select(
        "id, name, sku, category_id, price, image, description, is_new, featured",
      )
      .order("sort_order"),
  ]);
  const queryError = [
    settings,
    hero,
    contact,
    menu,
    categories,
    aboutPages,
    aboutProjects,
    companySections,
    careerOpenings,
    trustItems,
    specialSlides,
    specialFeatures,
    products,
  ].find((result) => result.error)?.error;
  if (queryError) throw queryError;
  {
    const categoryNames = new Map(
      (categories.data ?? []).map((category) => [category.id, category.name]),
    );
    const categoryParents = Object.fromEntries(
      (categories.data ?? []).flatMap((category) => {
        const parentName = categoryNames.get(category.parent_id ?? "");
        return parentName ? [[category.name, parentName]] : [];
      }),
    );
    const menuRows = menu.data ?? [];
    const menuItems = menuRows
      .filter((item) => !item.parent_id)
      .map((item) => ({
        id: item.id,
        label: item.label,
        href: item.href,
        enabled: item.enabled,
        children: menuRows
          .filter((child) => child.parent_id === item.id)
          .map((child) => ({
            id: child.id,
            label: child.label,
            href: child.href,
            enabled: child.enabled,
          })),
      }));
    const projectsByPage = new Map<string, AboutProject[]>();
    for (const project of aboutProjects.data ?? []) {
      const pageProjects = projectsByPage.get(project.page_id) ?? [];
      pageProjects.push({
        id: project.id,
        title: project.title,
        description: project.description,
        image: project.image,
      });
      projectsByPage.set(project.page_id, pageProjects);
    }
    const careersByPage = new Map<string, CareerOpening[]>();
    for (const opening of careerOpenings.data ?? []) {
      const pageCareers = careersByPage.get(opening.page_id) ?? [];
      pageCareers.push({
        id: opening.id,
        title: opening.title,
        duties: opening.duties,
        requirements: opening.requirements,
        headcount: opening.headcount,
        applicationDeadline: opening.application_deadline,
      });
      careersByPage.set(opening.page_id, pageCareers);
    }
    const featuresBySlide = new Map<string, SpecialProductFeature[]>();
    for (const feature of specialFeatures.data ?? []) {
      const slideFeatures = featuresBySlide.get(feature.slide_id) ?? [];
      const icon = [
        "lightbulb",
        "shield",
        "clock",
        "bolt",
        "check",
        "dollar",
        "star",
        "gauge",
        "wrench",
        "globe",
        "package",
      ].includes(feature.icon)
        ? (feature.icon as SpecialProductFeature["icon"])
        : "bolt";
      slideFeatures.push({
        id: feature.id,
        icon,
        title: feature.title,
        description: feature.description,
      });
      featuresBySlide.set(feature.slide_id, slideFeatures);
    }
    const normalizedContent = {
      brand: {
        name: settings.data?.brand_name ?? defaultSiteContent.brand.name,
        suffix: settings.data?.brand_suffix ?? defaultSiteContent.brand.suffix,
        tagline: settings.data?.tagline ?? defaultSiteContent.brand.tagline,
      },
      hero: hero.data ?? defaultSiteContent.hero,
      contact: contact.data ?? defaultSiteContent.contact,
      categoryParents,
      trustItems:
        (trustItems.data ?? []).length > 0
          ? trustItems.data!.map((item) => ({
              id: item.id,
              title: item.title,
              description: item.description,
            }))
          : defaultSiteContent.trustItems,
      specialProducts:
        (specialSlides.data ?? []).length > 0
          ? specialSlides.data!.map((slide) => ({
              id: slide.id,
              category: slide.category,
              title: slide.title,
              description: slide.description,
              image: slide.image,
              linkLabel: slide.link_label,
              linkHref: slide.link_href,
              features: featuresBySlide.get(slide.id) ?? [],
            }))
          : defaultSiteContent.specialProducts,
      menu: menuItems.length ? menuItems : defaultSiteContent.menu,
      categories: (categories.data ?? []).map((category) => category.name),
      aboutPages: (aboutPages.data ?? []).map((page) => ({
        id: page.id,
        title: page.title,
        description: page.description,
        enabled: page.enabled,
        image: page.image,
        sections:
          page.id === "about-company"
            ? (companySections.data ?? []).map((section) => ({
                id: section.id,
                title: section.title,
                description: section.description,
                image: section.image,
              }))
            : undefined,
        projects: projectsByPage.get(page.id) ?? [],
        careers: careersByPage.get(page.id) ?? [],
      })),
      products: (products.data ?? []).map((product) => ({
        id: product.id,
        name: product.name,
        sku: product.sku,
        category: categoryNames.get(product.category_id ?? "") ?? "",
        price: product.price,
        image: product.image,
        description: product.description ?? "",
        isNew: product.is_new,
        featured: product.featured,
      })),
    };
    return mergeContent(normalizedContent);
  }
}

export async function saveSiteContent(content: SiteContent) {
  const supabase = getSupabaseBrowserClient();
  const timestamp = new Date().toISOString();
  const categoryIds = new Map(
    content.categories.map((name) => [name, categoryId(name)]),
  );
  const categoryRows = content.categories.map((name, index) => ({
    id: categoryId(name),
    name,
    parent_id: categoryIds.get(content.categoryParents[name] ?? "") ?? null,
    sort_order: index,
    updated_at: timestamp,
  }));
  const aboutPageRows = content.aboutPages.map((page, index) => ({
    id: page.id,
    title: page.title,
    description: page.description,
    enabled: page.enabled,
    image: page.image ?? "",
    sort_order: index,
    updated_at: timestamp,
  }));
  const projectRows = content.aboutPages.flatMap((page) =>
    (page.projects ?? []).map((project, index) => ({
      id: project.id,
      page_id: page.id,
      title: project.title,
      description: project.description,
      image: project.image,
      sort_order: index,
      updated_at: timestamp,
    })),
  );
  const companySectionRows = (
    content.aboutPages.find((page) => page.id === "about-company")?.sections ??
    []
  ).map((section, index) => ({
    id: section.id,
    page_id: "about-company",
    title: section.title,
    description: section.description,
    image: section.image,
    sort_order: index,
    updated_at: timestamp,
  }));
  const careerRows = content.aboutPages.flatMap((page) =>
    (page.careers ?? []).map((opening, index) => ({
      id: opening.id,
      page_id: page.id,
      title: opening.title,
      duties: opening.duties ?? opening.description ?? "",
      requirements: opening.requirements ?? "",
      headcount: Math.max(1, opening.headcount ?? 1),
      application_deadline: opening.applicationDeadline ?? "",
      sort_order: index,
      updated_at: timestamp,
    })),
  );
  const trustRows = content.trustItems.map((item, index) => ({
    ...item,
    sort_order: index,
    updated_at: timestamp,
  }));
  const specialSlideRows = content.specialProducts.map((slide, index) => ({
    id: slide.id,
    category: slide.category,
    title: slide.title,
    description: slide.description,
    image: slide.image,
    link_label: slide.linkLabel,
    link_href: slide.linkHref,
    sort_order: index,
    updated_at: timestamp,
  }));
  const specialFeatureRows = content.specialProducts.flatMap((slide) =>
    slide.features.map((feature, index) => ({
      id: feature.id,
      slide_id: slide.id,
      icon: feature.icon,
      title: feature.title,
      description: feature.description,
      sort_order: index,
      updated_at: timestamp,
    })),
  );
  async function syncRows<T extends { id: string }>(table: string, rows: T[]) {
    const ids = rows.map((row) => `"${row.id.replaceAll('"', '\\"')}"`);
    const supabaseClient = getSupabaseBrowserClient();
    const deleteResult = ids.length
      ? await supabaseClient
          .from(table)
          .delete()
          .not("id", "in", `(${ids.join(",")})`)
      : await supabaseClient.from(table).delete().neq("id", "");
    if (deleteResult.error) throw deleteResult.error;
    if (rows.length > 0) {
      const upsertResult = await supabaseClient.from(table).upsert(rows);
      if (upsertResult.error) throw upsertResult.error;
    }
  }
  const menuRows = content.menu.flatMap((item, index) => [
    {
      id: item.id,
      parent_id: null,
      label: item.label,
      href: item.href,
      enabled: item.enabled,
      sort_order: index,
      updated_at: timestamp,
    },
    ...(item.children ?? []).map((child, childIndex) => ({
      id: child.id,
      parent_id: item.id,
      label: child.label,
      href: child.href,
      enabled: child.enabled,
      sort_order: childIndex,
      updated_at: timestamp,
    })),
  ]);
  const baseResults = await Promise.all([
    supabase.from("site_settings").upsert({
      id: "main",
      brand_name: content.brand.name,
      brand_suffix: content.brand.suffix,
      tagline: content.brand.tagline,
      updated_at: timestamp,
    }),
    supabase
      .from("site_hero")
      .upsert({ id: "main", ...content.hero, updated_at: timestamp }),
    supabase
      .from("site_contact")
      .upsert({ id: "main", ...content.contact, updated_at: timestamp }),
    supabase.from("site_menu").upsert(menuRows),
    supabase.from("categories").upsert(categoryRows, { onConflict: "name" }),
    supabase.from("about_pages").upsert(aboutPageRows),
  ]);
  const baseError = baseResults.find((result) => result.error)?.error;
  if (baseError) throw baseError;

  await Promise.all([
    syncRows("about_projects", projectRows),
    syncRows("about_company_sections", companySectionRows),
    syncRows("career_openings", careerRows),
    syncRows("site_trust_items", trustRows),
    syncRows("special_product_slides", specialSlideRows),
  ]);
  await syncRows("special_product_features", specialFeatureRows);

  const productResult = await getSupabaseBrowserClient()
    .from("products")
    .upsert(
      content.products.map((product, index) => ({
        id: product.id,
        name: product.name,
        sku: product.sku,
        category_id: categoryIds.get(product.category) ?? null,
        price: product.price,
        image: product.image,
        description: product.description ?? "",
        is_new: product.isNew,
        featured: product.featured,
        sort_order: index,
        updated_at: timestamp,
      })),
    );
  if (productResult.error) throw productResult.error;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("admin-content-saved"));
  }
  return;
}

export async function deleteMenuItem(id: string) {
  const { error } = await getSupabaseBrowserClient()
    .from("site_menu")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

export async function deleteCategory(name: string) {
  const { data, error } = await getSupabaseBrowserClient()
    .from("categories")
    .select("id")
    .eq("name", name)
    .maybeSingle();
  if (error) throw error;
  if (data?.id) {
    const result = await getSupabaseBrowserClient()
      .from("categories")
      .delete()
      .eq("id", data.id);
    if (result.error) throw result.error;
  }
}

export async function deleteProduct(id: string) {
  const { error } = await getSupabaseBrowserClient()
    .from("products")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
