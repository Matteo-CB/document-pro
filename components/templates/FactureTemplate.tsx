import { DocumentStyle, FormData } from "@/lib/types";
import Image from "next/image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface TemplateProps {
  data: FormData;
  style: DocumentStyle;
}

export default function FactureTemplate({ data, style }: TemplateProps) {
  const {
    clientName,
    clientAddress,
    invoiceNumber,
    invoiceDate,
    dueDate,
    paymentTerms,
    serviceDescription,
    totalTTC,
    companyName,
    companyAddress,
    companySiret,
  } = data;

  const formattedInvoiceDate = invoiceDate
    ? format(new Date(invoiceDate), "dd MMMM yyyy", { locale: fr })
    : "JJ/MM/AAAA";
  const formattedDueDate = dueDate
    ? format(new Date(dueDate), "dd MMMM yyyy", { locale: fr })
    : "JJ/MM/AAAA";
  const totalTTCFloat = parseFloat(totalTTC || "0");
  const totalHTFloat =
    totalTTCFloat > 0 ? (totalTTCFloat / 1.2).toFixed(2) : "0.00";
  const tvaFloat =
    totalTTCFloat > 0
      ? (totalTTCFloat - parseFloat(totalHTFloat)).toFixed(2)
      : "0.00";
  const descriptionLines = (
    serviceDescription || "Description des produits/services..."
  )
    .split("\n")
    .filter((line: string) => line.trim() !== "");

  const paymentTermsLabel =
    paymentTerms === "immediate"
      ? "Paiement Immédiat"
      : paymentTerms === "30_days"
      ? "30 jours"
      : "Non spécifié";

  return (
    <div
      className="p-12 text-gray-800 h-full flex flex-col justify-between min-h-[297mm]"
      style={{
        backgroundColor: style.documentBgColor || "#ffffff",
        color: style.secondaryColor,
        fontFamily: style.fontFamily,
        fontSize: `${style.fontSize}pt`,
      }}
    >
      <header>
        <div
          className="flex justify-between items-start border-b pb-6 mb-8"
          style={{ borderBottom: `4px solid ${style.primaryColor}` }}
        >
          <div className="w-1/2">
            {style.logoUrl && (
              <Image
                src={style.logoUrl}
                alt="Logo de l'entreprise"
                width={150}
                height={60}
                className="max-h-24 w-auto object-contain mb-4"
                unoptimized
              />
            )}
            <p
              className="font-bold text-lg"
              style={{ color: style.secondaryColor }}
            >
              {companyName || "VOTRE ENTREPRISE"}
            </p>
            <p className="text-sm whitespace-pre-line opacity-80">
              {companyAddress || "Adresse complète..."}
            </p>
            <p className="text-xs mt-2 font-mono text-gray-500">
              SIRET: {companySiret || "000 000 000 00000"}
            </p>
          </div>
          <div className="text-right">
            <h1
              className="text-4xl font-extrabold mb-2 tracking-tight"
              style={{ color: style.primaryColor }}
            >
              FACTURE
            </h1>
            <p className="font-bold text-base">
              N°{" "}
              <span style={{ color: style.primaryColor }}>
                {invoiceNumber || "FAC-2024-001"}
              </span>
            </p>
            <div className="mt-2 text-sm opacity-80">
              <p>Date : {formattedInvoiceDate}</p>
              <p>Échéance : {formattedDueDate}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-12">
          <div
            className="w-1/2 p-6 rounded-r-lg border-l-4 bg-gray-50"
            style={{
              borderLeftColor: style.primaryColor,
            }}
          >
            <p
              className="font-bold text-xs uppercase tracking-wider mb-2"
              style={{ color: style.primaryColor }}
            >
              Facturé à :
            </p>
            <p className="font-bold text-xl mb-1">
              {clientName || "Nom du Client"}
            </p>
            <p className="text-sm whitespace-pre-line opacity-80">
              {clientAddress || "Adresse du client..."}
            </p>
          </div>
        </div>
      </header>

      <section className="flex-grow">
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-8 shadow-sm">
          <div
            className="flex font-bold text-white text-sm py-3 px-4"
            style={{ backgroundColor: style.secondaryColor }}
          >
            <div className="w-[60%]">Désignation</div>
            <div className="w-[20%] text-right">TVA</div>
            <div className="w-[20%] text-right">Total TTC</div>
          </div>
          {descriptionLines.map((line: string, index: number) => (
            <div
              key={index}
              className="flex text-sm border-b border-gray-100 py-3 px-4"
              style={{
                backgroundColor:
                  index % 2 === 0 ? style.documentBgColor : "rgba(0,0,0,0.02)",
              }}
            >
              <div className="w-[60%] whitespace-pre-line pr-4">{line}</div>
              <div className="w-[20%] text-right opacity-60">20%</div>
              <div className="w-[20%] text-right font-medium">
                {(totalTTCFloat / descriptionLines.length).toFixed(2)} €
              </div>
            </div>
          ))}
          {descriptionLines.length === 0 && (
            <div className="p-8 text-center text-gray-400 italic text-sm">
              Aucun article ajouté.
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <div className="w-1/2 space-y-3">
            <div className="flex justify-between text-sm opacity-80">
              <span>Total HT</span>
              <span>{totalHTFloat} €</span>
            </div>
            <div className="flex justify-between text-sm opacity-80 border-b pb-2">
              <span>TVA (20%)</span>
              <span>{tvaFloat} €</span>
            </div>
            <div
              className="flex justify-between font-bold text-xl py-2 px-4 rounded"
              style={{ backgroundColor: style.primaryColor, color: "white" }}
            >
              <span>Net à payer</span>
              <span>{totalTTCFloat.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-12 pt-6 border-t text-xs text-center opacity-60">
        <p className="font-semibold mb-1">Conditions : {paymentTermsLabel}</p>
        <p>
          En cas de retard de paiement, une indemnité forfaitaire pour frais de
          recouvrement de 40€ sera due.
        </p>
        <p className="mt-2">
          {companyName} • {companyAddress} • SIRET {companySiret}
        </p>
      </footer>
    </div>
  );
}
