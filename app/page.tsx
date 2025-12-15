import { AvailableDocuments } from "@/lib/types";
import Link from "next/link";
import {
  FileText,
  Receipt,
  User,
  Mail,
  ShoppingBag,
  CheckCircle,
  Zap,
  Star,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { formatTitle, slugify } from "@/lib/utils";
import { Metadata } from "next";

const iconMap: Record<string, any> = {
  FileText,
  Receipt,
  User,
  Mail,
  ShoppingBag,
  CheckCircle,
};

export const metadata: Metadata = {
  title: formatTitle(null),
  description:
    "Plateforme gratuite de création de documents : Devis, Factures, CV, Lettres. Technologie HiddenLab pour un rendu vectoriel parfait.",
};

export default function HomePage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-background overflow-hidden selection:bg-primary/20">
      <div className="absolute inset-0 z-0 bg-grid-pattern bg-[length:40px_40px] opacity-40 [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none will-change-transform" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background z-0 pointer-events-none" />

      <div className="z-10 w-full max-w-7xl px-6 pt-16 pb-24 flex flex-col items-center">
        <Link
          href="https://hiddenlab.fr"
          target="_blank"
          className="animate-fade-in-up mb-8 group cursor-pointer relative overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transform-gpu will-change-transform"
        >
          <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#059669_50%,#E2E8F0_100%)] will-change-transform" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-4 py-1.5 text-sm font-medium text-slate-900 backdrop-blur-3xl">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            Propulsé par la technologie{" "}
            <span className="font-bold ml-1 text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600">
              HiddenLab™
            </span>
          </span>
        </Link>

        <h1 className="animate-fade-in-up [animation-delay:100ms] text-5xl md:text-7xl font-extrabold text-center tracking-tight text-secondary mb-6 leading-tight transform-gpu will-change-transform">
          Vos Documents Pro <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">
            Générés à la Perfection.
          </span>
        </h1>

        <p className="animate-fade-in-up [animation-delay:200ms] text-lg md:text-xl text-gray-500 text-center max-w-2xl mb-12 leading-relaxed transform-gpu will-change-transform">
          La solution ultime pour vos Devis, Factures et CV.{" "}
          <br className="hidden md:block" />
          Zéro inscription. Zéro coût.{" "}
          <span className="font-semibold text-secondary">
            Performance maximale.
          </span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl z-20">
          {AvailableDocuments.map((doc, idx) => {
            const IconComponent = iconMap[doc.icon] || FileText;
            const href = `/generate/${slugify(doc.name)}-${doc.id}`;
            const delay = 300 + idx * 100;

            return (
              <Link
                key={doc.id}
                href={href}
                className="animate-fade-in-up group relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 shadow-card hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden transform-gpu will-change-transform"
                style={{
                  animationDelay: `${delay}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 rounded-2xl bg-gray-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                      <IconComponent size={28} strokeWidth={1.5} />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <div className="flex items-center text-primary text-sm font-bold">
                        Créer <ArrowRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                    {doc.name}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Générez un {doc.name.toLowerCase()} conforme et esthétique
                    instantanément.
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="animate-fade-in-up [animation-delay:800ms] mt-24 flex flex-wrap justify-center gap-8 md:gap-16 text-gray-400 border-t border-gray-100 pt-12 w-full max-w-4xl transform-gpu will-change-transform">
          <div className="flex items-center gap-3">
            <ShieldCheck size={24} className="text-primary" />
            <div className="flex flex-col">
              <span className="font-bold text-secondary text-sm">
                100% Privé
              </span>
              <span className="text-xs">Traitement local (Client-side)</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Zap size={24} className="text-primary" />
            <div className="flex flex-col">
              <span className="font-bold text-secondary text-sm">
                Ultra Rapide
              </span>
              <span className="text-xs">Moteur Next.js optimisé</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Star size={24} className="text-primary" />
            <div className="flex flex-col">
              <span className="font-bold text-secondary text-sm">
                Qualité Premium
              </span>
              <span className="text-xs">Rendu vectoriel HD</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full border-t border-gray-200 bg-white/80 backdrop-blur-md py-10 mt-auto z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-gray-900">
              © {currentYear} Document Pro.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
              <p className="text-xs text-gray-500">Tous droits réservés.</p>
              <span className="text-gray-300">•</span>
              <Link
                href="/mentions-legales"
                className="text-xs text-gray-500 hover:text-primary transition-colors"
              >
                Mentions Légales
              </Link>
            </div>
          </div>

          <Link
            href="https://hiddenlab.fr"
            target="_blank"
            className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span className="text-sm font-medium">
              Designed by{" "}
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-white">
                HiddenLab
              </span>
            </span>
          </Link>
        </div>
      </footer>
    </main>
  );
}
