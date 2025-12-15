import { DocumentStyle, FormData } from "@/lib/types";
import Image from "next/image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface TemplateProps {
  data: FormData;
  style: DocumentStyle;
}

export default function DevisTemplate({ data, style }: TemplateProps) {
  const {
    clientName,
    clientAddress,
    devisNumber,
    devisDate,
    validityDays,
    companyName,
    companyAddress,
    companySiret,
    serviceDescription,
    totalTTC,
  } = data;

  const { primaryColor, secondaryColor, accentColor, documentBgColor } = style;

  const formattedDate = devisDate
    ? format(new Date(devisDate), "dd MMMM yyyy", { locale: fr })
    : "JJ/MM/AAAA";
  const totalTTCFloat = parseFloat(totalTTC || "0");
  const totalHTFloat =
    totalTTCFloat > 0 ? (totalTTCFloat / 1.2).toFixed(2) : "0.00";
  const tvaFloat =
    totalTTCFloat > 0
      ? (totalTTCFloat - parseFloat(totalHTFloat)).toFixed(2)
      : "0.00";

  const descriptionLines = (serviceDescription || "Description des services...")
    .split("\n")
    .filter((line: string) => line.trim() !== "");

  return (
    <div
      className="p-8 text-gray-800 h-full flex flex-col justify-between min-h-[297mm]"
      style={{
        backgroundColor: documentBgColor || "#ffffff",
        color: secondaryColor,
      }}
    >
      <header>
        <div
          className="flex justify-between items-start border-b pb-4 mb-6"
          style={{ borderBottom: `4px solid ${primaryColor}` }}
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
              style={{ color: secondaryColor }}
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
              className="text-4xl font-extrabold mb-1 tracking-tight"
              style={{ color: primaryColor }}
            >
              DEVIS
            </h1>
            <p className="font-bold text-sm">
              N°:{" "}
              <span style={{ color: primaryColor }}>
                {devisNumber || "DEV-XXXX"}
              </span>
            </p>
            <p className="text-sm">Date: {formattedDate}</p>
          </div>
        </div>

        <div className="flex justify-end mb-8">
          <div
            className="w-1/2 p-4 rounded-lg border-l-4 shadow-sm"
            style={{
              borderLeftColor: primaryColor,
              backgroundColor: accentColor + "20",
            }}
          >
            <p
              className="font-semibold text-xs uppercase tracking-wide mb-1"
              style={{ color: primaryColor }}
            >
              Destinataire
            </p>
            <p className="font-bold text-lg">{clientName || "Nom du Client"}</p>
            <p className="text-sm whitespace-pre-line opacity-80">
              {clientAddress || "Adresse du client"}
            </p>
          </div>
        </div>
      </header>

      <section className="flex-grow">
        <h2
          className="text-lg font-bold mb-4 uppercase tracking-wider"
          style={{ color: primaryColor }}
        >
          Détails des Services
        </h2>

        <div className="border border-gray-200 rounded-lg overflow-hidden mb-8 shadow-sm">
          <div
            className="flex font-bold text-white text-sm py-2 px-4"
            style={{ backgroundColor: secondaryColor }}
          >
            <div className="w-[60%]">Description</div>
            <div className="w-[20%] text-right">TVA</div>
            <div className="w-[20%] text-right">Total HT</div>
          </div>
          {descriptionLines.map((line: string, index: number) => (
            <div
              key={index}
              className="flex text-sm border-b border-gray-100 py-3 px-4 items-center"
              style={{
                backgroundColor:
                  index % 2 === 0 ? documentBgColor : accentColor + "10",
              }}
            >
              <div className="w-[60%] whitespace-pre-line pr-4">{line}</div>
              <div className="w-[20%] text-right opacity-70">20%</div>
              <div className="w-[20%] text-right font-medium">
                {(totalTTCFloat / descriptionLines.length / 1.2).toFixed(2)} €
              </div>
            </div>
          ))}
          {descriptionLines.length === 0 && (
            <div className="flex text-sm py-8 justify-center text-gray-400 italic">
              Aucune description saisie pour le moment
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <div className="w-1/2 space-y-2">
            <div className="flex justify-between py-1 text-sm border-b border-gray-100">
              <span className="opacity-70">Total Hors Taxes (HT)</span>
              <span className="font-semibold">{totalHTFloat} €</span>
            </div>
            <div className="flex justify-between py-1 text-sm border-b border-gray-100">
              <span className="opacity-70">TVA (20%)</span>
              <span className="font-semibold">{tvaFloat} €</span>
            </div>
            <div
              className="flex justify-between items-center py-3 mt-4 px-4 rounded-lg shadow-md transform scale-105 origin-right"
              style={{ backgroundColor: primaryColor, color: "#fff" }}
            >
              <span className="font-bold text-sm uppercase">Net à Payer</span>
              <span className="font-extrabold text-xl">
                {totalTTCFloat.toFixed(2)} €
              </span>
            </div>
          </div>
        </div>
      </section>

      <footer
        className="mt-12 pt-6 border-t text-xs text-center leading-relaxed opacity-60"
        style={{ borderColor: primaryColor }}
      >
        <p>
          Devis valable {validityDays || 30} jours à compter de la date
          d'émission.
        </p>
        <p>Bon pour accord (Date, Signature et Cachet) :</p>
        <div className="mt-4 font-semibold">
          {companyName} - {companyAddress}
        </div>
      </footer>
    </div>
  );
}
