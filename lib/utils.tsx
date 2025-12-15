import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DocumentType } from "./types";
import React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTitle(documentType: DocumentType | null): string {
  if (!documentType) {
    return "Générateur de Documents Pro Gratuit - Devis, Factures, CV PDF";
  }

  const map: Record<DocumentType, string> = {
    devis: "Générateur de Devis Gratuit en Ligne - Modèle PDF",
    facture: "Créer une Facture Gratuite - Logiciel de Facturation PDF",
    cv: "Créer un CV Professionnel Gratuit - Modèle Design",
    lettre_motivation:
      "Générateur de Lettre de Motivation PDF - Modèle Gratuit",
    bon_commande: "Modèle de Bon de Commande Gratuit à Remplir",
    attestation: "Générateur d'Attestation sur l'Honneur PDF",
  };

  return map[documentType];
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export function parseRichText(
  text: string | null | undefined,
  style: { color: string; fontSize?: string }
): React.ReactNode {
  if (!text) return null;

  const lines = text.split("\n").filter((line) => line.trim() !== "");

  return lines.map((line, index) => {
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      const content = line.trim().substring(2);
      return (
        <div key={index} className="flex items-start mb-1 pl-2">
          <span className="mr-2 opacity-70" style={{ color: style.color }}>
            •
          </span>
          <span className="flex-1 text-justify">{parseBold(content)}</span>
        </div>
      );
    }
    return (
      <p key={index} className="mb-2 last:mb-0 leading-relaxed text-justify">
        {parseBold(line)}
      </p>
    );
  });
}

function parseBold(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
