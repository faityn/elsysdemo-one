import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import type { SiteContent } from "@/lib/site-content";

export default function SiteFooter({ content }: { content: SiteContent }) {
  return (
    <footer id="contact" className="bg-[#111c24] pt-9 pb-5 text-white">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <a href="/" className="font-black text-[32px] text-orange-500">
              {content.brand.name}
              <span className="text-[13px] text-white">
                {content.brand.suffix}
              </span>
            </a>
            <div className="text-[8px] tracking-[.2em] text-slate-500">
              {content.brand.tagline}
            </div>
            <div className="mt-7 flex gap-3 text-slate-300">
              <Instagram size={15} />
              <Youtube size={15} />
              <Linkedin size={15} />
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-[12px] font-bold">Меню</h3>
            <div className="flex flex-col gap-3 text-[11px] text-slate-300">
              <a href="/" className="hover:text-orange-500">
                Нүүр
              </a>
              <a href="/products" className="hover:text-orange-500">
                Бүтээгдэхүүн
              </a>
              <a href="/about" className="hover:text-orange-500">
                Танилцуулга
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-[12px] font-bold">Холбоо барих</h3>
            <div className="space-y-3 text-[11px] text-slate-300">
              <div className="flex gap-2">
                <MapPin size={13} /> {content.contact.address}
              </div>
              <div className="flex gap-2">
                <Phone size={13} /> {content.contact.phone}
              </div>
              <div className="flex gap-2">
                <Mail size={13} /> {content.contact.email}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center border-t border-white/10 pt-4 text-[11px] text-slate-500">
          {/* <span>Нүүр　|　Бүтээгдэхүүн　|　Танилцуулга　|　Холбоо барих</span> */}
          <span>© 2026 Elsys Eng. Бүх эрх хуулиар хамгаалагдсан.</span>
        </div>
      </div>
    </footer>
  );
}
