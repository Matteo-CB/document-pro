import { DocumentStyle, FormData } from "@/lib/types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface TemplateProps {
  data: FormData;
  style: DocumentStyle;
}

export default function LettreMotivationTemplate({
  data,
  style,
}: TemplateProps) {
  const {
    recipientName,
    recipientTitle,
    recipientAddress,
    jobTitle,
    senderName,
    senderAddress,
    senderEmail,
    senderPhone,
    senderCity,
    date,
    bodyContent,
    closingFormula,
  } = data;

  const formattedDate = date
    ? format(new Date(date), "dd MMMM yyyy", { locale: fr })
    : "JJ/MM/AAAA";

  return (
    <div
      className="p-16 text-gray-800 h-full flex flex-col min-h-[297mm]"
      style={{
        backgroundColor: style.documentBgColor || "#ffffff",
        color: style.secondaryColor,
        fontFamily: style.fontFamily,
        fontSize: `${style.fontSize}pt`,
      }}
    >
      <header className="mb-12">
        <div className="flex justify-between items-start">
          {/* Informations Expéditeur */}
          <div className="w-1/2 space-y-1">
            <p
              className="font-bold text-lg"
              style={{ color: style.secondaryColor }}
            >
              {senderName || "Votre Prénom Nom"}
            </p>
            <div className="text-sm opacity-80 whitespace-pre-line">
              <p>{senderAddress || "Votre Adresse"}</p>
              <p>{senderEmail || "email@exemple.com"}</p>
              <p>{senderPhone || "06 00 00 00 00"}</p>
            </div>
          </div>

          {/* Informations Destinataire */}
          <div className="w-1/2 text-right space-y-1">
            <p
              className="font-bold text-lg"
              style={{ color: style.primaryColor }}
            >
              {recipientName || "Nom du Destinataire"}
            </p>
            <p className="font-medium">{recipientTitle || "Titre/Poste"}</p>
            <p className="text-sm opacity-80 whitespace-pre-line">
              {recipientAddress || "Adresse de l'Entreprise"}
            </p>
          </div>
        </div>

        <div className="mt-12 text-right">
          <p className="text-sm italic">
            {senderCity || "Ville"}, le {formattedDate}
          </p>
        </div>

        <div
          className="mt-8 border-b pb-4"
          style={{ borderColor: style.primaryColor }}
        >
          <p
            className="font-bold text-lg"
            style={{ color: style.primaryColor }}
          >
            Objet : Candidature au poste de {jobTitle || "..."}
          </p>
        </div>
      </header>

      <section className="flex-grow text-justify leading-relaxed whitespace-pre-wrap">
        {bodyContent ||
          "Monsieur, Madame,\n\n[Votre lettre de motivation ici...]"}
      </section>

      <footer className="mt-12">
        <p className="mb-12 whitespace-pre-line">
          {closingFormula ||
            "Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées."}
        </p>
        <div className="flex justify-end">
          <div className="text-center min-w-[200px]">
            <p
              className="font-bold mb-8"
              style={{ color: style.secondaryColor }}
            >
              {senderName}
            </p>
            {/* Espace pour signature manuscrite */}
          </div>
        </div>
      </footer>
    </div>
  );
}
