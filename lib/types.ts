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
      id: "clientName",
      label: "Nom du Client",
      type: "text",
      required: true,
      section: "Informations Client",
    },
    {
      id: "clientAddress",
      label: "Adresse du Client",
      type: "textarea",
      required: true,
      section: "Informations Client",
    },
    {
      id: "clientSiret",
      label: "SIRET/TVA du Client",
      type: "text",
      required: false,
      section: "Informations Client",
    },
    { id: "separator1", label: "", type: "separator", required: false },
    {
      id: "devisNumber",
      label: "Numéro de Devis",
      type: "text",
      required: true,
      section: "Détails du Document",
    },
    {
      id: "devisDate",
      label: "Date du Devis",
      type: "date",
      required: true,
      section: "Détails du Document",
    },
    {
      id: "validityDays",
      label: "Validité de l'Offre (jours)",
      type: "number",
      required: true,
      defaultValue: 30,
      section: "Détails du Document",
    },
    { id: "separator2", label: "", type: "separator", required: false },
    {
      id: "companyName",
      label: "Nom de l'Entreprise",
      type: "text",
      required: true,
      section: "Informations Entreprise",
    },
    {
      id: "companySiret",
      label: "SIRET/TVA de l'Entreprise",
      type: "text",
      required: true,
      section: "Informations Entreprise",
    },
    {
      id: "companyAddress",
      label: "Adresse de l'Entreprise",
      type: "textarea",
      required: true,
      section: "Informations Entreprise",
    },
    {
      id: "serviceDescription",
      label: "Description des services (tableau)",
      type: "textarea",
      required: true,
      section: "Description",
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
      id: "clientName",
      label: "Nom du Client",
      type: "text",
      required: true,
      section: "Informations Client",
    },
    {
      id: "invoiceNumber",
      label: "Numéro de Facture",
      type: "text",
      required: true,
      section: "Détails du Document",
    },
    {
      id: "invoiceDate",
      label: "Date d'Émission",
      type: "date",
      required: true,
      section: "Détails du Document",
    },
    {
      id: "dueDate",
      label: "Date d'échéance",
      type: "date",
      required: true,
      section: "Détails du Document",
    },
    {
      id: "paymentTerms",
      label: "Conditions de Paiement",
      type: "select",
      required: true,
      options: [
        { value: "30_days", label: "30 jours" },
        { value: "immediate", label: "Immédiat" },
      ],
      section: "Détails du Document",
    },
    {
      id: "serviceDescription",
      label: "Description des produits/services",
      type: "textarea",
      required: true,
      section: "Description",
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
      section: "Informations Personnelles",
    },
    {
      id: "title",
      label: "Titre (Ex: Développeur Senior)",
      type: "text",
      required: true,
      section: "Informations Personnelles",
    },
    {
      id: "email",
      label: "Email",
      type: "text",
      required: true,
      section: "Informations Personnelles",
    },
    {
      id: "phone",
      label: "Téléphone",
      type: "text",
      required: false,
      section: "Informations Personnelles",
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
      label: "Expérience Professionnelle",
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
      label: "Compétences (Mots-clés)",
      type: "textarea",
      required: false,
      section: "Contenu",
    },
  ],
  lettre_motivation: [
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
      id: "jobTitle",
      label: "Intitulé du Poste",
      type: "text",
      required: true,
      section: "Objet",
    },
    {
      id: "senderName",
      label: "Votre Nom",
      type: "text",
      required: true,
      section: "Expéditeur",
    },
    {
      id: "senderCity",
      label: "Ville",
      type: "text",
      required: true,
      section: "Expéditeur",
    },
    {
      id: "date",
      label: "Date de la Lettre",
      type: "date",
      required: true,
      section: "Expéditeur",
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
      label: "Nom du Fournisseur",
      type: "text",
      required: true,
      section: "Informations Fournisseur",
    },
    {
      id: "orderNumber",
      label: "Numéro de Bon de Commande",
      type: "text",
      required: true,
      section: "Détails du Document",
    },
    {
      id: "orderDate",
      label: "Date de Commande",
      type: "date",
      required: true,
      section: "Détails du Document",
    },
    {
      id: "deliveryDate",
      label: "Date de Livraison Souhaitée",
      type: "date",
      required: false,
      section: "Détails du Document",
    },
    {
      id: "itemsOrdered",
      label: "Articles Commandés (tableau)",
      type: "textarea",
      required: true,
      section: "Description",
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
      label: "Objet de l'Attestation",
      type: "text",
      required: true,
      section: "Objet",
    },
    {
      id: "personName",
      label: "Nom de la Personne Concernée",
      type: "text",
      required: true,
      section: "Informations",
    },
    {
      id: "personDate",
      label: "Date de Naissance/Début",
      type: "date",
      required: true,
      section: "Informations",
    },
    {
      id: "personRole",
      label: "Rôle/Qualité",
      type: "text",
      required: true,
      section: "Informations",
    },
    {
      id: "attestationText",
      label: "Texte Libre de l'Attestation",
      type: "textarea",
      required: true,
      section: "Contenu",
    },
    {
      id: "citySign",
      label: "Fait à (Ville)",
      type: "text",
      required: true,
      section: "Signature",
    },
    {
      id: "dateSign",
      label: "Le (Date de Signature)",
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
    icon: "FileText" as const,
    fields: DocumentFields.devis,
  },
  {
    id: "facture",
    name: "Facture Simple",
    icon: "Receipt" as const,
    fields: DocumentFields.facture,
  },
  {
    id: "cv",
    name: "Curriculum Vitae",
    icon: "User" as const,
    fields: DocumentFields.cv,
  },
  {
    id: "lettre_motivation",
    name: "Lettre de Motivation",
    icon: "Mail" as const,
    fields: DocumentFields.lettre_motivation,
  },
  {
    id: "bon_commande",
    name: "Bon de Commande",
    icon: "ShoppingBag" as const,
    fields: DocumentFields.bon_commande,
  },
  {
    id: "attestation",
    name: "Attestation Générique",
    icon: "CheckCircle" as const,
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
