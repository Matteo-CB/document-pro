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

  // Ref pour l'aperçu visible (zoomé)
  const previewRef = useRef<HTMLDivElement>(null);
  // Ref pour le rendu PDF invisible (échelle 100% parfaite)
  const printRef = useRef<HTMLDivElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isReady, setIsReady] = useState(false);

  // Moteur de Scaling Intelligent pour l'aperçu
  useEffect(() => {
    const calculateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const a4Width = 794; // Largeur A4 px @ 96 DPI
        const padding = containerWidth < 800 ? 20 : 40;
        const newScale = Math.min((containerWidth - padding) / a4Width, 1);
        setScale(newScale > 0.3 ? newScale : 0.3);
        setIsReady(true);
      }
    };

    calculateScale();
    const resizeObserver = new ResizeObserver(() => calculateScale());
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener("resize", calculateScale);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateScale);
    };
  }, []);

  const generatePDF = async () => {
    // On cible l'élément caché "printRef" qui est toujours parfait (pas de zoom)
    if (!printRef.current || state.isGenerating) return;

    dispatch({ type: "SET_GENERATING", payload: true });

    try {
      // 1. Capture haute fidélité
      const canvas = await html2canvas(printRef.current, {
        scale: 3, // Échelle x3 pour une netteté impeccable
        useCORS: true, // Pour charger les images externes/locales
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: 794, // Force les dimensions exactes A4
        height: 1123,
        windowWidth: 794,
        windowHeight: 1123,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
      });

      // 2. Conversion en Image (PNG pour éviter les artefacts JPEG)
      const imgData = canvas.toDataURL("image/png");

      // 3. Génération PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Nom du fichier propre
      const cleanName = documentName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      pdf.save(
        `${documentType}_${cleanName}_${new Date()
          .toISOString()
          .slice(0, 10)}.pdf`
      );
    } catch (error) {
      console.error("Erreur PDF:", error);
      alert("Erreur lors de la génération du PDF. Veuillez réessayer.");
    } finally {
      dispatch({ type: "SET_GENERATING", payload: false });
    }
  };

  return (
    <div className="flex flex-col h-full relative bg-gray-100/50">
      {/* --- ZONE CACHÉE : RENDU PARFAIT POUR LE PDF --- */}
      {/* Positionné hors écran mais présent dans le DOM pour html2canvas */}
      <div
        className="fixed top-0 left-0 overflow-hidden pointer-events-none opacity-0 z-[-1]"
        style={{ left: "-9999px" }} // Hors champ
      >
        <div
          ref={printRef}
          style={{
            width: "794px",
            height: "1123px",
            backgroundColor: "white",
            fontFamily: state.style.fontFamily,
            fontSize: `${state.style.fontSize}pt`,
          }}
        >
          {/* Version clonée pour l'impression uniquement */}
          <DocumentTemplate
            documentType={documentType}
            data={state.data}
            style={state.style}
          />
        </div>
      </div>
      {/* ------------------------------------------------ */}

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

      {/* Zone de Contenu Scrollable (Aperçu Utilisateur) */}
      <div
        ref={containerRef}
        className="flex-1 w-full flex justify-center overflow-y-auto overflow-x-hidden pt-24 pb-10 px-2 scrollbar-thin"
      >
        <div
          className={cn(
            "relative bg-white shadow-2xl transition-opacity duration-500 ease-out shrink-0",
            isReady ? "opacity-100" : "opacity-0"
          )}
          style={{
            width: "794px",
            minWidth: "794px",
            maxWidth: "794px",
            minHeight: "1123px",
            height: "1123px",
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            marginBottom: `-${(1 - scale) * 1123}px`,
          }}
        >
          <div
            ref={previewRef}
            id="document-preview"
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
