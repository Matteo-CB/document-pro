"use client";

import { useEffect, useRef } from "react";

interface AdUnitProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal";
  responsive?: boolean;
  className?: string;
  label?: string; // Petit texte "Publicité" pour la transparence
}

export default function AdUnit({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  label = "Sponsor",
}: AdUnitProps) {
  const adRef = useRef<boolean>(false);

  useEffect(() => {
    // Évite de charger la pub deux fois en mode React Strict Mode
    if (adRef.current) return;

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      adRef.current = true;
    } catch (err) {
      console.error("AdSense Error:", err);
    }
  }, []);

  // Définition des tailles réservées pour éviter le Layout Shift (CLS)
  const minHeightClass =
    format === "horizontal"
      ? "min-h-[90px] md:min-h-[280px]" // Bannière large
      : format === "rectangle"
      ? "min-h-[250px]" // Carré standard
      : "min-h-[100px]"; // Défaut

  return (
    <div
      className={`w-full flex flex-col items-center justify-center my-8 ${className}`}
    >
      {/* Label discret pour respecter l'UX */}
      <span className="text-[10px] uppercase tracking-widest text-gray-300 mb-2">
        {label}
      </span>

      {/* Conteneur Gris (Placeholder) + Pub */}
      <div
        className={`w-full bg-gray-50/50 rounded-xl overflow-hidden flex items-center justify-center border border-gray-100/50 ${minHeightClass}`}
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", textAlign: "center" }}
          data-ad-client="ca-pub-9989627034003305" // REMPLACEZ ICI AUSSI
          data-ad-slot={slot}
          data-ad-format={format === "rectangle" ? "rectangle" : format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </div>
  );
}
