"use client";

import { useDocument } from "@/context/DocumentContext";
import { DocumentType } from "@/lib/types";
import { Download, Loader2, FileText } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { cn } from "@/lib/utils";
import DocumentTemplate from "./templates/DocumentTemplate";
import { useRef, useState, useEffect } from "react";

interface DocumentViewerProps {
  documentType: DocumentType;
  documentName: string;
}

export default function DocumentViewer({
  documentType,
  documentName,
}: DocumentViewerProps) {
  const { state, dispatch } = useDocument();
  const documentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isReady, setIsReady] = useState(false);

  // Moteur de Scaling Intelligent
  useEffect(() => {
    const calculateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Largeur standard A4 en pixels à 96 DPI (~794px)
        const a4Width = 794;

        // Sur mobile, on veut utiliser presque toute la largeur
        // Sur PC, on garde un peu de marge
        const padding = containerWidth < 800 ? 20 : 40;

        // On calcule le ratio pour que ça rentre dans l'écran
        const newScale = Math.min((containerWidth - padding) / a4Width, 1);

        // On évite que ça devienne microscopique, mais on laisse descendre assez bas pour mobile
        setScale(newScale > 0.3 ? newScale : 0.3);
        setIsReady(true);
      }
    };

    // Recalcul initial + event listener
    calculateScale();
    const resizeObserver = new ResizeObserver(() => calculateScale());
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    // Écouteur resize fenêtre classique en backup
    window.addEventListener("resize", calculateScale);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateScale);
    };
  }, []);

  const generatePDF = async () => {
    if (!documentRef.current || state.isGenerating) return;

    dispatch({ type: "SET_GENERATING", payload: true });

    try {
      const element = documentRef.current;

      const canvas = await html2canvas(element, {
        scale: 2, // Haute qualité (Retina)
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: 794, // Force la largeur pour le rendu canvas
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${documentType}-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error("Erreur PDF:", error);
      alert("Erreur lors de la génération. Veuillez réessayer.");
    } finally {
      dispatch({ type: "SET_GENERATING", payload: false });
    }
  };

  return (
    <div className="flex flex-col h-full relative bg-gray-100/50">
      {/* Barre d'outils Flottante */}
      <div className="absolute top-4 left-4 right-4 z-30 flex justify-between items-center p-2 sm:p-3 bg-white/90 backdrop-blur-md rounded-xl border border-gray-200/50 shadow-lg transition-all hover:shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <FileText size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-secondary leading-tight hidden sm:block">
              Aperçu en direct
            </h2>
            <p className="text-[10px] text-gray-400 font-medium">
              Format A4 • {Math.round(scale * 100)}%
            </p>
          </div>
        </div>

        <button
          onClick={generatePDF}
          disabled={state.isGenerating}
          className={cn(
            "px-4 sm:px-5 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 shadow-md transform active:scale-95",
            state.isGenerating
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-primary to-primaryLight text-white hover:shadow-neon"
          )}
        >
          {state.isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>
            {state.isGenerating ? "Génération..." : "Télécharger PDF"}
          </span>
        </button>
      </div>

      {/* Zone de Contenu Scrollable */}
      {/* Utilisation de items-start pour éviter le centrage vertical forcé qui peut cacher le haut sur petit écran */}
      <div
        ref={containerRef}
        className="flex-1 w-full flex justify-center overflow-y-auto overflow-x-hidden pt-24 pb-10 px-2 scrollbar-thin"
      >
        {/* Conteneur A4 Mis à l'échelle */}
        {/* CORRECTION CRITIQUE MOBILE : 
            1. min-w-[794px] : Interdit au navigateur de compresser la largeur du div.
            2. shrink-0 : Interdit à flexbox de réduire l'élément.
            3. transformOrigin: "top center" : Zoom depuis le haut-milieu.
        */}
        <div
          className={cn(
            "relative bg-white shadow-2xl transition-opacity duration-500 ease-out shrink-0",
            isReady ? "opacity-100" : "opacity-0"
          )}
          style={{
            width: "794px", // Largeur fixe A4 stricte
            minWidth: "794px", // Empêche le rétrécissement CSS
            maxWidth: "794px", // Empêche l'agrandissement CSS
            minHeight: "1123px", // Hauteur fixe A4
            height: "1123px",
            transform: `scale(${scale})`, // Zoom CSS
            transformOrigin: "top center", // Point d'ancrage du zoom
            marginBottom: `-${(1 - scale) * 1123}px`, // Compensation marge bas
          }}
        >
          <div
            ref={documentRef}
            id="document-to-print"
            className="w-full h-full overflow-hidden"
            style={{
              fontFamily: state.style.fontFamily,
              fontSize: `${state.style.fontSize}pt`,
            }}
          >
            <DocumentTemplate
              documentType={documentType}
              data={state.data}
              style={state.style}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
