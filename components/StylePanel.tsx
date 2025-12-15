"use client";

import { useDocument } from "@/context/DocumentContext";
import { FontOptions } from "@/lib/types";
import {
  Upload,
  X,
  Palette,
  Type,
  ScanText,
  PaintBucket,
  Square,
} from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { cn } from "@/lib/utils"; // Assurez-vous que cn est importé pour un meilleur style

export default function StylePanel() {
  const { state, dispatch } = useDocument();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleStyleChange = (key: keyof typeof state.style, value: any) => {
    dispatch({ type: "UPDATE_STYLE", payload: { [key]: value } });
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        handleStyleChange("logoUrl", data.url);
      } else {
        alert("Échec de l'upload de l'image.");
      }
    } catch (error) {
      alert("Erreur réseau lors de l'upload.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeLogo = () => {
    handleStyleChange("logoUrl", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const ColorInput = ({
    id,
    label,
    value,
  }: {
    id: keyof typeof state.style;
    label: string;
    value: string;
  }) => (
    <div>
      <label htmlFor={id} className="font-semibold text-sm block mb-1">
        <PaintBucket className="w-4 h-4 inline mr-1 text-primary" /> {label}
      </label>
      <div className="flex items-center space-x-3">
        <input
          type="color"
          id={id}
          value={value}
          onChange={(e) => handleStyleChange(id, e.target.value)}
          className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer p-0"
          style={{ padding: 0 }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => handleStyleChange(id, e.target.value)}
          className="flex-grow p-2 border rounded-lg text-sm uppercase"
          maxLength={7}
        />
      </div>
    </div>
  );

  return (
    <div className="sticky top-0 h-full">
      <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center">
        <Palette className="w-6 h-6 mr-2 text-primary" />
        Style & Personnalisation
      </h2>

      <div className="space-y-6">
        {/* Logo Upload */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="font-semibold text-sm mb-2 text-secondary flex items-center">
            <ScanText className="w-4 h-4 mr-2" /> Logo du Document
          </p>
          {state.style.logoUrl ? (
            <div className="relative border-2 border-dashed border-primary/50 p-2 rounded-lg">
              <Image
                src={state.style.logoUrl}
                alt="Logo Aperçu"
                width={150}
                height={50}
                className="max-h-20 w-auto object-contain mx-auto"
                unoptimized
              />
              <button
                onClick={removeLogo}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                aria-label="Supprimer le logo"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
                disabled={isUploading}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-50 shadow-md"
                disabled={isUploading}
              >
                {isUploading ? (
                  "Téléchargement..."
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" /> Uploader Logo
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Couleur Primaire */}
        <ColorInput
          id="primaryColor"
          label="Couleur Primaire (Accent)"
          value={state.style.primaryColor}
        />

        {/* Couleur Secondaire */}
        <ColorInput
          id="secondaryColor"
          label="Couleur Secondaire (Texte/Fond foncé)"
          value={state.style.secondaryColor}
        />

        {/* Couleur Accent */}
        <ColorInput
          id="accentColor"
          label="Couleur Accent (Fond de Tableau)"
          value={state.style.accentColor || "#f0f0f0"}
        />

        {/* Couleur de Fond du Document */}
        <ColorInput
          id="documentBgColor"
          label="Couleur de Fond de Page"
          value={state.style.documentBgColor || "#ffffff"}
        />

        {/* Font Family */}
        <div>
          <label
            htmlFor="fontFamily"
            className="font-semibold text-sm block mb-1"
          >
            <Type className="w-4 h-4 inline mr-1 text-primary" /> Police de
            Caractères
          </label>
          <select
            id="fontFamily"
            value={state.style.fontFamily}
            onChange={(e) => handleStyleChange("fontFamily", e.target.value)}
            className="w-full p-2 border rounded-lg appearance-none bg-white text-sm focus:ring-primary focus:border-primary"
          >
            {FontOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                style={{ fontFamily: option.value }}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size */}
        <div>
          <label
            htmlFor="fontSize"
            className="font-semibold text-sm block mb-1"
          >
            <Type className="w-4 h-4 inline mr-1 text-primary" /> Taille de la
            Police (pt)
          </label>
          <input
            type="number"
            id="fontSize"
            min="8"
            max="14"
            step="0.5"
            value={state.style.fontSize}
            onChange={(e) =>
              handleStyleChange("fontSize", parseFloat(e.target.value))
            }
            className="w-full p-2 border rounded-lg text-sm focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
}
