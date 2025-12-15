import { DocumentStyle, FormData } from "@/lib/types";
import Image from "next/image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface TemplateProps {
  data: FormData;
  style: DocumentStyle;
}

export default function AttestationTemplate({ data, style }: TemplateProps) {
  const {
    purpose,
    personName,
    personDate,
    personRole,
    attestationText,
    citySign,
    dateSign,
    companyName,
  } = data;

  const formattedPersonDate = personDate
    ? format(new Date(personDate), "dd MMMM yyyy", { locale: fr })
    : "JJ/MM/AAAA";
  const formattedDateSign = dateSign
    ? format(new Date(dateSign), "dd MMMM yyyy", { locale: fr })
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
      <header className="mb-12 text-center">
        {style.logoUrl && (
          <Image
            src={style.logoUrl}
            alt="Logo"
            width={100}
            height={100}
            className="w-24 h-24 object-contain mx-auto mb-6"
            unoptimized
          />
        )}
        <h1
          className="text-3xl font-extrabold mb-2 uppercase tracking-wide"
          style={{ color: style.secondaryColor }}
        >
          ATTESTATION DE {purpose || "OBJET"}
        </h1>
        <div
          className="w-24 h-1.5 mx-auto rounded-full"
          style={{ backgroundColor: style.primaryColor }}
        ></div>
      </header>

      <section className="flex-grow text-base leading-relaxed mb-12">
        <p className="mb-8 font-semibold text-lg">
          Je soussigné(e),{" "}
          <span
            className="font-bold uppercase"
            style={{ color: style.primaryColor }}
          >
            {companyName || "Nom de l'Organisme"},
          </span>{" "}
          certifie par la présente que :
        </p>

        <div
          className="border p-6 rounded-xl border-l-8 shadow-sm mb-8"
          style={{
            borderLeftColor: style.primaryColor,
            backgroundColor: style.accentColor + "20",
          }}
        >
          <div className="grid gap-4">
            <p>
              <span className="font-semibold w-32 inline-block">
                Nom et Prénom :
              </span>
              <span className="font-bold text-lg uppercase">
                {personName || "Nom de la Personne"}
              </span>
            </p>
            <p>
              <span className="font-semibold w-32 inline-block">
                Date Clé :
              </span>
              <span>{formattedPersonDate}</span>
            </p>
            <p>
              <span className="font-semibold w-32 inline-block">Qualité :</span>
              <span className="italic">{personRole || "Rôle/Fonction"}</span>
            </p>
          </div>
        </div>

        <p className="mt-8 whitespace-pre-line text-justify">
          {attestationText ||
            "Veuillez insérer ici le texte libre de l'attestation, expliquant le but de ce document et certifiant les faits mentionnés ci-dessus. Ce document est officiel et doit être traité comme tel."}
        </p>

        <p className="mt-12 text-sm italic opacity-80">
          La présente attestation est établie pour servir et valoir ce que de
          droit.
        </p>
      </section>

      <footer>
        <p className="text-base font-semibold mb-8 text-right">
          Fait à {citySign || "Ville"}, le {formattedDateSign}.
        </p>

        <div className="flex justify-end">
          <div className="text-center min-w-[200px]">
            <p
              className="font-bold text-base mb-2"
              style={{ color: style.secondaryColor }}
            >
              {companyName || "Nom de l'Organisme"}
            </p>
            <p className="text-xs text-gray-500 mb-8">Cachet et Signature</p>
            <div className="w-full h-px bg-gray-300 mx-auto"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
