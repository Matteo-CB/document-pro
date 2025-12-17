import { notFound } from "next/navigation";
import { AvailableDocuments, DocumentType, DocumentInfo } from "@/lib/types";
import { slugify, formatTitle } from "@/lib/utils";
import { DocumentProvider } from "@/context/DocumentContext";
import StylePanel from "@/components/StylePanel";
import { Metadata } from "next";
import DocumentForm from "@/components/DocumentForm";
import DocumentViewer from "@/components/DocumentViewer";
import Link from "next/link";
import { ArrowLeft, Code2, Sparkles } from "lucide-react";
import AdUnit from "@/components/ui/AdUnit"; // IMPORT

const extractDocumentType = (slug: string): DocumentType | undefined => {
  const parts = slug.split("-");
  const id = parts[parts.length - 1];
  return AvailableDocuments.find((doc) => doc.id === id)?.id;
};

interface GeneratePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return AvailableDocuments.map((doc) => ({
    slug: `${slugify(doc.name)}-${doc.id}`,
  }));
}

export async function generateMetadata({
  params,
}: GeneratePageProps): Promise<Metadata> {
  const documentType = extractDocumentType(params.slug);
  const title = formatTitle(documentType || null);

  return {
    title: title,
    description: `Personnalisez et générez votre ${
      documentType || "document professionnel"
    } en temps réel. Outil rapide, efficace et 100% gratuit par HiddenLab.`,
  };
}

export default function GeneratePage({ params }: GeneratePageProps) {
  const documentType = extractDocumentType(params.slug);

  if (!documentType) {
    notFound();
  }

  const documentInfo: DocumentInfo = AvailableDocuments.find(
    (doc) => doc.id === documentType
  )!;

  return (
    <DocumentProvider>
      <div className="flex flex-col lg:flex-row min-h-screen bg-background relative overflow-hidden">
        {/* Background subtil */}
        <div className="absolute inset-0 z-0 bg-grid-pattern opacity-40 pointer-events-none" />

        {/* SIDEBAR (Style) */}
        <aside className="w-full lg:w-80 border-r border-gray-200 bg-white/80 backdrop-blur-xl shadow-2xl z-20 flex flex-col h-auto lg:h-screen lg:sticky lg:top-0 order-3 lg:order-1">
          <div className="p-5 border-b border-gray-100 bg-white/50 flex justify-between items-center">
            <Link
              href="/"
              className="group flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Retour Accueil</span>
              <span className="sm:hidden">Retour</span>
            </Link>
            <div className="lg:hidden bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold">
              {documentInfo.name}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-gray-200">
            <StylePanel />

            {/* PUB DANS LA SIDEBAR (Bas) - Ne gêne pas la navigation */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <AdUnit slot="0000000000" format="rectangle" label="Partenaire" />
            </div>
          </div>
        </aside>

        {/* CONTENU PRINCIPAL */}
        <div className="flex-grow flex flex-col xl:flex-row z-10 relative order-1 lg:order-2">
          {/* ZONE APERÇU */}
          <section className="w-full xl:w-1/2 h-[50vh] xl:h-screen overflow-hidden bg-gray-100/80 backdrop-blur-sm flex flex-col border-b xl:border-b-0 border-r-0 xl:border-r border-gray-200 order-1 xl:order-2">
            <div className="w-full h-full p-0 md:p-6 lg:p-8">
              <DocumentViewer
                documentType={documentType}
                documentName={documentInfo.name}
              />
            </div>

            <div className="hidden xl:flex mt-auto pt-4 pb-4 justify-center absolute bottom-0 w-full pointer-events-none">
              <div className="flex items-center gap-2 text-xs text-gray-400 px-4 py-2 rounded-full border border-gray-200 bg-white/50 shadow-sm pointer-events-auto">
                <Code2 size={12} />
                <span>Architecture & Performance par</span>
                <Link
                  href="https://hiddenlab.fr"
                  target="_blank"
                  className="font-bold text-gray-600 hover:text-primary transition-colors"
                >
                  HiddenLab
                </Link>
              </div>
            </div>
          </section>

          {/* ZONE FORMULAIRE */}
          <main className="w-full xl:w-1/2 h-auto xl:h-screen overflow-y-auto bg-white/40 p-4 md:p-8 lg:p-12 order-2 xl:order-1 border-t xl:border-t-0">
            <div className="max-w-3xl mx-auto pb-16 xl:pb-0">
              <header className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Sparkles size={20} />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-secondary">
                    {documentInfo.name}
                  </h1>
                </div>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                  Personnalisez votre document en temps réel. Le formatage est
                  automatique.
                </p>
              </header>

              <DocumentForm documentType={documentType} />

              {/* PUB EN BAS DE FORMULAIRE - Placement non intrusif */}
              {/* <div className="mt-12">
                <AdUnit slot="9876543210" format="horizontal" />
              </div> */}
            </div>
          </main>
        </div>
      </div>
    </DocumentProvider>
  );
}
