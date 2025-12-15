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
      className="p-8 text-gray-800 h-full flex flex-col justify-between min-h-[297mm]"
      style={{
        backgroundColor: style.documentBgColor || "#ffffff",
        color: style.secondaryColor,
        fontFamily: style.fontFamily,
        fontSize: `${style.fontSize}pt`,
      }}
    >
      <header>
        <div
          className="flex justify-between items-start border-b pb-4 mb-6"
          style={{ borderBottom: `4px solid ${style.primaryColor}` }}
        >
          <div className="w-1/2">
            {style.logoUrl && (
              <Image
                src={style.logoUrl}
                alt="Logo de l'entreprise"
                width={150}
                height={50}
                className="max-h-20 w-auto object-contain mb-2"
                unoptimized
              />
            )}
            <p
              className="font-bold text-base"
              style={{ color: style.secondaryColor }}
            >
              {companyName || "NOM DE L'ENTREPRISE"}
            </p>
            <p className="text-xs">
              {companyAddress || "Adresse complète de l'entreprise"}
            </p>
            <p className="text-xs">
              SIRET: {companySiret || "000 000 000 00000"}
            </p>
          </div>
          <div className="text-right">
            <h1
              className="text-3xl font-extrabold mb-1"
              style={{ color: style.primaryColor }}
            >
              FACTURE
            </h1>
            <p className="font-bold text-sm">
              N°:{" "}
              <span style={{ color: style.primaryColor }}>
                {invoiceNumber || "FAC-XXXX"}
              </span>
            </p>
            <p className="text-sm">Date d'Émission: {formattedInvoiceDate}</p>
            <p className="text-sm font-semibold">
              Échéance: {formattedDueDate}
            </p>
          </div>
        </div>
        <div className="flex justify-end mb-8">
          <div
            className="w-1/2 p-4 rounded-lg border-l-4"
            style={{
              borderLeftColor: style.primaryColor,
              backgroundColor: style.accentColor + "20",
            }}
          >
            <p
              className="font-semibold text-sm mb-1"
              style={{ color: style.primaryColor }}
            >
              Client:
            </p>
            <p className="font-bold">{clientName || "Nom du Client"}</p>
            <p className="text-sm whitespace-pre-line">
              {data.clientAddress || "Adresse du client"}
            </p>
          </div>
        </div>
      </header>

      <section className="flex-grow">
        <h2
          className="text-lg font-bold mb-3"
          style={{ color: style.primaryColor }}
        >
          Détails
        </h2>
        <div className="border border-gray-300 rounded-lg overflow-hidden mb-8">
          <div
            className="flex font-bold text-white text-sm"
            style={{ backgroundColor: style.secondaryColor }}
          >
            <div className="p-2 w-3/5">Désignation</div>
            <div className="p-2 w-1/5 text-right">Prix HT</div>
            <div className="p-2 w-1/5 text-right">Prix TTC</div>
          </div>
          {descriptionLines.map((line: string, index: number) => (
            <div
              key={index}
              className="flex text-sm border-b border-gray-200"
              style={{
                backgroundColor:
                  index % 2 === 0
                    ? style.documentBgColor
                    : style.accentColor + "10",
              }}
            >
              <div className="p-2 w-3/5 whitespace-pre-line">{line}</div>
              <div className="p-2 w-1/5 text-right">
                {(totalTTCFloat / descriptionLines.length / 1.2).toFixed(2)} €
              </div>
              <div className="p-2 w-1/5 text-right">
                {(totalTTCFloat / descriptionLines.length).toFixed(2)} €
              </div>
            </div>
          ))}
          {descriptionLines.length === 0 && (
            <div className="flex text-sm border-b border-gray-200">
              <div className="p-2 w-3/5 text-gray-400">
                Aucun article facturé
              </div>
              <div className="p-2 w-1/5 text-right">0.00 €</div>
              <div className="p-2 w-1/5 text-right">0.00 €</div>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <div className="w-1/2">
            <div className="flex justify-between py-1 text-sm">
              <span>Total HT:</span>
              <span className="font-semibold">{totalHTFloat} €</span>
            </div>
            <div className="flex justify-between py-1 text-sm border-b">
              <span>TVA (20%):</span>
              <span className="font-semibold">{tvaFloat} €</span>
            </div>
            <div
              className="flex justify-between py-2 mt-2 font-bold text-lg text-white p-2 rounded-md"
              style={{ backgroundColor: style.primaryColor }}
            >
              <span>TOTAL À PAYER TTC:</span>
              <span>{totalTTCFloat.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-8 pt-4 border-t text-xs opacity-70">
        <p className="font-semibold" style={{ color: style.primaryColor }}>
          Conditions de Paiement: {paymentTermsLabel}
        </p>
        <p>
          En cas de retard de paiement, une indemnité forfaitaire pour frais de
          recouvrement de 40€ sera due.
        </p>
        <p className="mt-2 text-center font-medium">
          {companyName} - SIRET {companySiret}
        </p>
      </footer>
    </div>
  );
}
