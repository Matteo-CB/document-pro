import { DocumentType, DocumentStyle, FormData } from "@/lib/types";
import { AlertTriangle } from "lucide-react";
import DevisTemplate from "./DevisTemplate";
import CvTemplate from "./CvTemplate";
import FactureTemplate from "./FactureTemplate";
import LettreMotivationTemplate from "./LettreMotivationTemplate";
import BonCommandeTemplate from "./BonCommandeTemplate";
import AttestationTemplate from "./AttestationTemplate";

interface DocumentTemplateProps {
  documentType: DocumentType;
  data: FormData;
  style: DocumentStyle;
}

export default function DocumentTemplate({
  documentType,
  data,
  style,
}: DocumentTemplateProps) {
  switch (documentType) {
    case "devis":
      return <DevisTemplate data={data} style={style} />;
    case "cv":
      return <CvTemplate data={data} style={style} />;
    case "facture":
      return <FactureTemplate data={data} style={style} />;
    case "lettre_motivation":
      return <LettreMotivationTemplate data={data} style={style} />;
    case "bon_commande":
      return <BonCommandeTemplate data={data} style={style} />;
    case "attestation":
      return <AttestationTemplate data={data} style={style} />;
    default:
      return (
        <div className="flex items-center justify-center h-full text-center bg-gray-50 p-8 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-gray-600">
            <AlertTriangle className="w-8 h-8 mx-auto text-red-500 mb-2" />
            <p className="font-semibold">Type de document inconnu.</p>
          </div>
        </div>
      );
  }
}
