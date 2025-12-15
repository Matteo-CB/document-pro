import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description:
    "Informations légales et conditions d'utilisation de Document Pro.",
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-8 transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="mr-2 group-hover:-translate-x-1 transition-transform"
          />
          Retour à l'accueil
        </Link>

        <h1 className="text-3xl md:text-4xl font-extrabold text-secondary mb-10">
          Mentions Légales
        </h1>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
              1. Éditeur du site
            </h2>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <p className="mb-2">
                Le site <strong>document-pro.fr</strong> est édité par l'agence{" "}
                <strong>HiddenLab</strong>.
              </p>
              <ul className="space-y-2 mt-4 text-sm">
                <li>
                  <strong>Statut :</strong> Agence Digitale
                </li>
                <li>
                  <strong>SIRET :</strong> 980 715 809 00011
                </li>
                <li>
                  <strong>Siège social :</strong> France
                </li>
                <li>
                  <strong>Contact :</strong> contact@hiddenlab.fr
                </li>
                <li>
                  <strong>Directeur de la publication :</strong> HiddenLab
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mb-4">
              2. Hébergement
            </h2>
            <p>
              Ce site est hébergé par <strong>Vercel Inc.</strong>
              <br />
              340 S Lemon Ave #4133 Walnut, CA 91789, USA.
              <br />
              Infrastructure cloud sécurisée et performante.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mb-4">
              3. Propriété intellectuelle & Données
            </h2>
            <p className="mb-4">
              L&apos;ensemble de ce site relève de la législation française et
              internationale sur le droit d&apos;auteur et la propriété
              intellectuelle. Tous les droits de reproduction sont réservés.
            </p>
            <p className="p-4 bg-primary/5 border border-primary/10 rounded-lg text-sm text-primary/80">
              <strong>Protection de la vie privée :</strong> Document Pro
              fonctionne selon une architecture <em>"Client-Side Only"</em>.
              Aucune donnée personnelle saisie dans vos documents (Devis,
              Factures, CV) n'est envoyée ou stockée sur nos serveurs. Tout le
              traitement se fait localement dans votre navigateur pour une
              confidentialité totale.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
