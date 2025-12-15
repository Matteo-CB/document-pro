export type DocumentType =
  | "devis"
  | "facture"
  | "cv"
  | "lettre_motivation"
  | "bon_commande"
  | "attestation";

export interface DocumentInfo {
  id: DocumentType;
  name: string;
  icon: string;
  fields: DocumentField[];
}

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "select"
  | "color"
  | "image"
  | "separator";

export interface DocumentField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required: boolean;
  defaultValue?: string | number | Date | null;
  section?: string;
}

export interface DocumentStyle {
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  documentBgColor: string;
  fontFamily: string;
  fontSize: number;
}

export interface FormData {
  [key: string]: any;
}

export interface DocumentState {
  type: DocumentType;
  data: FormData;
  style: DocumentStyle;
  isGenerating: boolean;
}

export const DocumentFields: Record<DocumentType, DocumentField[]> = {
  devis: [
    {
      id: "companyName",
      label: "Votre Entreprise",
      type: "text",
      required: true,
      section: "Émetteur",
    },
    {
      id: "companyAddress",
      label: "Votre Adresse",
      type: "textarea",
      required: true,
      section: "Émetteur",
    },
    {
      id: "companySiret",
      label: "Votre SIRET",
      type: "text",
      required: true,
      section: "Émetteur",
    },
    {
      id: "clientName",
      label: "Nom du Client",
      type: "text",
      required: true,
      section: "Destinataire",
    },
    {
      id: "clientAddress",
      label: "Adresse du Client",
      type: "textarea",
      required: true,
      section: "Destinataire",
    },
    {
      id: "devisNumber",
      label: "Numéro de Devis",
      type: "text",
      required: true,
      section: "Détails",
    },
    {
      id: "devisDate",
      label: "Date",
      type: "date",
      required: true,
      section: "Détails",
    },
    {
      id: "validityDays",
      label: "Validité (jours)",
      type: "number",
      required: true,
      defaultValue: 30,
      section: "Détails",
    },
    {
      id: "serviceDescription",
      label: "Description (Lignes)",
      type: "textarea",
      required: true,
      section: "Contenu",
    },
    {
      id: "totalTTC",
      label: "Montant Total TTC",
      type: "number",
      required: true,
      section: "Totaux",
    },
  ],
  facture: [
    {
      id: "companyName",
      label: "Votre Entreprise",
      type: "text",
      required: true,
      section: "Émetteur",
    },
    {
      id: "companyAddress",
      label: "Votre Adresse",
      type: "textarea",
      required: true,
      section: "Émetteur",
    },
    {
      id: "companySiret",
      label: "Votre SIRET",
      type: "text",
      required: true,
      section: "Émetteur",
    },
    {
      id: "clientName",
      label: "Nom du Client",
      type: "text",
      required: true,
      section: "Destinataire",
    },
    {
      id: "clientAddress",
      label: "Adresse du Client",
      type: "textarea",
      required: true,
      section: "Destinataire",
    },
    {
      id: "invoiceNumber",
      label: "Numéro de Facture",
      type: "text",
      required: true,
      section: "Détails",
    },
    {
      id: "invoiceDate",
      label: "Date d'Émission",
      type: "date",
      required: true,
      section: "Détails",
    },
    {
      id: "dueDate",
      label: "Date d'échéance",
      type: "date",
      required: true,
      section: "Détails",
    },
    {
      id: "paymentTerms",
      label: "Conditions",
      type: "select",
      required: true,
      options: [
        { value: "30_days", label: "30 jours" },
        { value: "immediate", label: "Immédiat" },
      ],
      section: "Détails",
    },
    {
      id: "serviceDescription",
      label: "Description (Lignes)",
      type: "textarea",
      required: true,
      section: "Contenu",
    },
    {
      id: "totalTTC",
      label: "Montant Total TTC",
      type: "number",
      required: true,
      section: "Totaux",
    },
  ],
  cv: [
    {
      id: "fullName",
      label: "Nom Prénom",
      type: "text",
      required: true,
      section: "Infos Personnelles",
    },
    {
      id: "title",
      label: "Titre du Poste",
      type: "text",
      required: true,
      section: "Infos Personnelles",
    },
    {
      id: "email",
      label: "Email",
      type: "text",
      required: true,
      section: "Infos Personnelles",
    },
    {
      id: "phone",
      label: "Téléphone",
      type: "text",
      required: false,
      section: "Infos Personnelles",
    },
    {
      id: "address",
      label: "Ville / Adresse",
      type: "text",
      required: true,
      section: "Infos Personnelles",
    },
    {
      id: "summary",
      label: "Profil / Résumé",
      type: "textarea",
      required: true,
      section: "Contenu",
    },
    {
      id: "experience",
      label: "Expériences",
      type: "textarea",
      required: true,
      section: "Contenu",
    },
    {
      id: "education",
      label: "Formation",
      type: "textarea",
      required: true,
      section: "Contenu",
    },
    {
      id: "skills",
      label: "Compétences",
      type: "textarea",
      required: false,
      section: "Contenu",
    },
  ],
  lettre_motivation: [
    {
      id: "senderName",
      label: "Votre Nom",
      type: "text",
      required: true,
      section: "Expéditeur",
    },
    {
      id: "senderAddress",
      label: "Votre Adresse",
      type: "textarea",
      required: true,
      section: "Expéditeur",
    },
    {
      id: "senderEmail",
      label: "Votre Email",
      type: "text",
      required: true,
      section: "Expéditeur",
    },
    {
      id: "senderPhone",
      label: "Votre Téléphone",
      type: "text",
      required: true,
      section: "Expéditeur",
    },
    {
      id: "senderCity",
      label: "Fait à (Ville)",
      type: "text",
      required: true,
      section: "Expéditeur",
    },
    {
      id: "date",
      label: "Date",
      type: "date",
      required: true,
      section: "Expéditeur",
    },
    {
      id: "recipientName",
      label: "Nom du Destinataire",
      type: "text",
      required: true,
      section: "Destinataire",
    },
    {
      id: "recipientTitle",
      label: "Titre du Destinataire",
      type: "text",
      required: true,
      section: "Destinataire",
    },
    {
      id: "recipientAddress",
      label: "Adresse de l'Entreprise",
      type: "textarea",
      required: true,
      section: "Destinataire",
    },
    {
      id: "jobTitle",
      label: "Objet / Poste",
      type: "text",
      required: true,
      section: "Contenu",
    },
    {
      id: "bodyContent",
      label: "Corps de la Lettre",
      type: "textarea",
      required: true,
      section: "Contenu",
    },
    {
      id: "closingFormula",
      label: "Formule de Politesse",
      type: "textarea",
      required: true,
      defaultValue:
        "Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.",
      section: "Contenu",
    },
  ],
  bon_commande: [
    {
      id: "supplierName",
      label: "Fournisseur",
      type: "text",
      required: true,
      section: "Fournisseur",
    },
    {
      id: "orderNumber",
      label: "Numéro de Commande",
      type: "text",
      required: true,
      section: "Détails",
    },
    {
      id: "orderDate",
      label: "Date",
      type: "date",
      required: true,
      section: "Détails",
    },
    {
      id: "itemsOrdered",
      label: "Articles (Tableau)",
      type: "textarea",
      required: true,
      section: "Contenu",
    },
    {
      id: "totalAmount",
      label: "Montant Total HT",
      type: "number",
      required: true,
      section: "Totaux",
    },
  ],
  attestation: [
    {
      id: "purpose",
      label: "Objet",
      type: "text",
      required: true,
      section: "Général",
    },
    {
      id: "personName",
      label: "Personne Concernée",
      type: "text",
      required: true,
      section: "Général",
    },
    {
      id: "attestationText",
      label: "Texte de l'Attestation",
      type: "textarea",
      required: true,
      section: "Contenu",
    },
    {
      id: "citySign",
      label: "Fait à",
      type: "text",
      required: true,
      section: "Signature",
    },
    {
      id: "dateSign",
      label: "Le",
      type: "date",
      required: true,
      section: "Signature",
    },
  ],
};

export const AvailableDocuments: DocumentInfo[] = [
  {
    id: "devis",
    name: "Devis Commercial",
    icon: "FileText",
    fields: DocumentFields.devis,
  },
  {
    id: "facture",
    name: "Facture Simple",
    icon: "Receipt",
    fields: DocumentFields.facture,
  },
  {
    id: "cv",
    name: "CV Professionnel",
    icon: "User",
    fields: DocumentFields.cv,
  },
  {
    id: "lettre_motivation",
    name: "Lettre de Motivation",
    icon: "Mail",
    fields: DocumentFields.lettre_motivation,
  },
  {
    id: "bon_commande",
    name: "Bon de Commande",
    icon: "ShoppingBag",
    fields: DocumentFields.bon_commande,
  },
  {
    id: "attestation",
    name: "Attestation",
    icon: "CheckCircle",
    fields: DocumentFields.attestation,
  },
];

export const FontOptions = [
  { value: "Inter", label: "Inter (Défaut)" },
  { value: "Roboto", label: "Roboto" },
  { value: "Open Sans", label: "Open Sans" },
  { value: "Montserrat", label: "Montserrat" },
  { value: "Lato", label: "Lato" },
];
