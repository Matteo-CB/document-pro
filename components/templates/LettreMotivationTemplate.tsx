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
    jobTitle,
    senderName,
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
      className="p-12 text-gray-800 h-full flex flex-col justify-between min-h-[297mm]"
      style={{
        backgroundColor: style.documentBgColor || "#ffffff",
        color: style.secondaryColor,
        fontFamily: style.fontFamily,
        fontSize: `${style.fontSize}pt`,
      }}
    >
      <header className="mb-10">
        <div className="flex justify-between items-start">
          {/* Informations Expéditeur */}
          <div className="w-1/2 text-sm space-y-1">
            <p className="font-bold" style={{ color: style.secondaryColor }}>
              {senderName || "Votre Prénom Nom"}
            </p>
            {/* Ajout fictif pour la structure si nécessaire */}
            <p>Adresse de l'expéditeur</p>
            <p>Email / Téléphone</p>
          </div>

          {/* Informations Destinataire */}
          <div className="w-1/2 text-sm text-right space-y-1">
            <p className="font-semibold" style={{ color: style.primaryColor }}>
              {recipientName || "Nom du Recruteur"}
            </p>
            <p>{recipientTitle || "Titre/Poste"}</p>
            <p>Adresse de l'Entreprise</p>
          </div>
        </div>

        <div className="text-sm mt-12 text-left">
          <p className="mb-2 text-right">
            {senderCity || "Ville"}, le {formattedDate}
          </p>
          <div className="mt-8">
            <p className="font-bold mb-4" style={{ color: style.primaryColor }}>
              Objet: Candidature au poste de {jobTitle || "Intitulé du Poste"}
            </p>
            <p>Madame, Monsieur,</p>
          </div>
        </div>
      </header>

      <section className="flex-grow text-sm whitespace-pre-line leading-relaxed mb-8 text-justify">
        {bodyContent ||
          "Rédigez ici le corps de votre lettre de motivation, en structurant vos idées en paragraphes pour une lecture facile. Mettez en avant vos compétences et votre intérêt pour l'entreprise."}
      </section>

      <footer>
        <p className="text-sm mb-12 whitespace-pre-line">
          {closingFormula ||
            "Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées."}
        </p>
        <div className="flex justify-end">
          <div className="text-center min-w-[150px]">
            <p
              className="text-sm font-bold mb-8"
              style={{ color: style.secondaryColor }}
            >
              {senderName || "Votre Signature"}
            </p>
            {/* Espace pour signature manuscrite */}
          </div>
        </div>
      </footer>
    </div>
  );
}
