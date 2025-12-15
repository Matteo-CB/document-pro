import { DocumentStyle, FormData } from "@/lib/types";
import Image from "next/image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface TemplateProps {
  data: FormData;
  style: DocumentStyle;
}

const parseItem = (line: string): { desc: string; price: number } => {
  const parts = line.split(":");
  const desc = parts[0].trim();
  const price = parseFloat(parts.length > 1 ? parts[1].trim() : "0");
  return { desc, price };
};

export default function BonCommandeTemplate({ data, style }: TemplateProps) {
  const {
    supplierName,
    orderNumber,
    orderDate,
    deliveryDate,
    itemsOrdered,
    companyName,
    companyAddress,
    companySiret,
  } = data;

  const formattedOrderDate = orderDate
    ? format(new Date(orderDate), "dd MMMM yyyy", { locale: fr })
    : "JJ/MM/AAAA";
  const formattedDeliveryDate = deliveryDate
    ? format(new Date(deliveryDate), "dd MMMM yyyy", { locale: fr })
    : "Non spécifiée";
  const itemsLines = (
    itemsOrdered || "Description des articles...\nArticle 1: 100\nArticle 2: 50"
  )
    .split("\n")
    .filter((line: string) => line.trim() !== "");

  const parsedItems = itemsLines.map(parseItem);
  const sumItems = parsedItems.reduce(
    (sum: number, item: { price: number }) => sum + item.price,
    0
  );

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
              {companyName || "Votre Entreprise"}
            </p>
            <p className="text-xs">{companyAddress || "Votre Adresse"}</p>
            <p className="text-xs">
              SIRET: {companySiret || "000 000 000 00000"}
            </p>
          </div>
          <div className="text-right">
            <h1
              className="text-3xl font-extrabold mb-1"
              style={{ color: style.primaryColor }}
            >
              BON DE COMMANDE
            </h1>
            <p className="font-bold text-sm">
              N°:{" "}
              <span style={{ color: style.primaryColor }}>
                {orderNumber || "BC-XXXX"}
              </span>
            </p>
            <p className="text-sm">Date de Commande: {formattedOrderDate}</p>
            <p className="text-sm font-semibold">
              Fournisseur: {supplierName || "Nom du Fournisseur"}
            </p>
          </div>
        </div>
      </header>

      <section className="flex-grow">
        <div className="mb-4 text-sm font-semibold bg-gray-50 p-3 rounded">
          <p>
            Date de Livraison Souhaitée:{" "}
            <span style={{ color: style.primaryColor }}>
              {formattedDeliveryDate}
            </span>
          </p>
        </div>

        <h2
          className="text-lg font-bold mb-3"
          style={{ color: style.primaryColor }}
        >
          Articles Commandés
        </h2>

        <div className="border border-gray-300 rounded-lg overflow-hidden mb-8">
          <div
            className="flex font-bold text-white text-sm"
            style={{ backgroundColor: style.secondaryColor }}
          >
            <div className="p-2 w-3/5">Article/Description</div>
            <div className="p-2 w-1/5 text-right">Quantité</div>
            <div className="p-2 w-1/5 text-right">Montant HT</div>
          </div>
          {parsedItems.map(
            (item: { desc: string; price: number }, index: number) => (
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
                <div className="p-2 w-3/5 whitespace-pre-line">{item.desc}</div>
                <div className="p-2 w-1/5 text-right">1</div>
                <div className="p-2 w-1/5 text-right">
                  {item.price.toFixed(2)} €
                </div>
              </div>
            )
          )}
          {parsedItems.length === 0 && (
            <div className="flex text-sm border-b border-gray-200">
              <div className="p-2 w-3/5 text-gray-400">
                Aucun article commandé
              </div>
              <div className="p-2 w-1/5 text-right">-</div>
              <div className="p-2 w-1/5 text-right">0.00 €</div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <div className="w-1/2">
            <div className="flex justify-between py-1 text-sm">
              <span>Total des Articles HT:</span>
              <span className="font-semibold">{sumItems.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between py-1 text-sm border-b">
              <span>Frais de port (Est.):</span>
              <span className="font-semibold">0.00 €</span>
            </div>
            <div
              className="flex justify-between py-2 mt-2 font-bold text-lg text-white p-2 rounded-md"
              style={{ backgroundColor: style.primaryColor }}
            >
              <span>MONTANT TOTAL À FACTURER HT:</span>
              <span>{sumItems.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </section>

      <footer
        className="mt-8 pt-4 border-t-2 text-xs text-gray-500 text-center"
        style={{ borderColor: style.primaryColor }}
      >
        <div className="flex justify-between items-end mt-4 px-8">
          <div className="text-center">
            <p className="font-bold mb-8">Date et Signature du Fournisseur</p>
            <div className="border-b w-32 mx-auto border-gray-300"></div>
          </div>
          <div className="text-center">
            <p className="font-bold mb-8">Cachet du Commanditaire</p>
            <div className="border-b w-32 mx-auto border-gray-300"></div>
          </div>
        </div>
        <p className="mt-6 italic">
          Ce bon de commande est sujet à nos conditions générales de vente.
        </p>
      </footer>
    </div>
  );
}
