import { DocumentStyle, FormData } from "@/lib/types";
import { parseRichText } from "@/lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";

interface TemplateProps {
  data: FormData;
  style: DocumentStyle;
}

export default function CvTemplate({ data, style }: TemplateProps) {
  const {
    fullName,
    title,
    email,
    phone,
    summary,
    experience,
    education,
    skills,
  } = data;

  const {
    primaryColor,
    secondaryColor,
    documentBgColor,
    fontSize,
    fontFamily,
  } = style;

  const experienceContent = parseRichText(experience, {
    color: secondaryColor,
  });
  const educationContent = parseRichText(education, { color: secondaryColor });

  const skillsString = typeof skills === "string" ? skills : "";
  const skillsList = skillsString
    ? skillsString.split("\n").filter((s: string) => s.trim())
    : [];

  return (
    <div
      className="flex flex-row h-full w-full min-h-[297mm] shadow-2xl overflow-hidden"
      style={{
        backgroundColor: documentBgColor || "#ffffff",
        fontFamily: fontFamily,
        fontSize: `${fontSize}pt`,
        color: secondaryColor,
      }}
    >
      <aside
        className="w-[32%] p-8 text-white flex flex-col gap-8 relative overflow-hidden shrink-0"
        style={{ backgroundColor: secondaryColor }}
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary opacity-20 rounded-full -ml-16 -mb-16 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {style.logoUrl ? (
            <div className="mb-6 relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-white opacity-30 rounded-full blur-md group-hover:opacity-60 transition duration-700"></div>
              <Image
                src={style.logoUrl}
                alt="Photo"
                width={140}
                height={140}
                className="relative w-36 h-36 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                unoptimized
              />
            </div>
          ) : (
            <div className="mb-6 w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
              <User size={48} className="text-white/40" />
            </div>
          )}

          <h2 className="text-lg font-bold tracking-widest uppercase border-b border-white/20 pb-2 mb-6 w-full text-white/90">
            Contact
          </h2>

          <div className="w-full space-y-4 text-sm font-light text-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 text-primary shadow-sm shrink-0">
                <Mail size={14} />
              </div>
              <span className="break-all text-left">
                {email || "email@exemple.com"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 text-primary shadow-sm shrink-0">
                <Phone size={14} />
              </div>
              <span>{phone || "06 00 00 00 00"}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 text-primary shadow-sm shrink-0">
                <MapPin size={14} />
              </div>
              <span className="text-left">Ville, Pays</span>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-lg font-bold tracking-widest uppercase border-b border-white/20 pb-2 mb-6 text-white/90">
            Compétences
          </h2>
          <div className="flex flex-wrap gap-2">
            {skillsList.map((skill: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-white/10 rounded-md text-xs font-medium backdrop-blur-md border border-white/5 shadow-sm"
              >
                {skill.replace(/^[-*] /, "")}
              </span>
            ))}
            {skillsList.length === 0 && (
              <span className="text-white/30 italic text-sm">
                Vos compétences...
              </span>
            )}
          </div>
        </div>
      </aside>

      <main className="w-[68%] p-10 md:p-12 flex flex-col gap-10">
        <header
          className="border-b-2 pb-6"
          style={{ borderColor: `${primaryColor}20` }}
        >
          <h1
            className="text-5xl font-extrabold uppercase tracking-tight leading-none mb-3"
            style={{ color: secondaryColor }}
          >
            {fullName || "Prénom Nom"}
          </h1>
          <p
            className="text-2xl font-medium tracking-wide uppercase"
            style={{ color: primaryColor }}
          >
            {title || "Poste Visé"}
          </p>
        </header>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="p-2 rounded-md text-white shadow-md transform rotate-3"
              style={{ backgroundColor: primaryColor }}
            >
              <User size={18} strokeWidth={2.5} />
            </div>
            <h3
              className="text-lg font-bold uppercase tracking-wider"
              style={{ color: secondaryColor }}
            >
              Profil
            </h3>
          </div>
          <div className="text-gray-600 leading-relaxed text-justify opacity-90">
            {parseRichText(
              summary || "Décrivez votre profil professionnel ici...",
              {
                color: secondaryColor,
              }
            )}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-5">
            <div
              className="p-2 rounded-md text-white shadow-md transform -rotate-2"
              style={{ backgroundColor: primaryColor }}
            >
              <Briefcase size={18} strokeWidth={2.5} />
            </div>
            <h3
              className="text-lg font-bold uppercase tracking-wider"
              style={{ color: secondaryColor }}
            >
              Expériences Pro
            </h3>
          </div>
          <div
            className="pl-5 border-l-2 space-y-6"
            style={{ borderColor: `${primaryColor}30` }}
          >
            <div className="text-gray-700 leading-relaxed">
              {experienceContent || (
                <p className="italic text-gray-300">
                  Détaillez vos expériences...
                </p>
              )}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-5">
            <div
              className="p-2 rounded-md text-white shadow-md transform rotate-1"
              style={{ backgroundColor: primaryColor }}
            >
              <GraduationCap size={18} strokeWidth={2.5} />
            </div>
            <h3
              className="text-lg font-bold uppercase tracking-wider"
              style={{ color: secondaryColor }}
            >
              Formation
            </h3>
          </div>
          <div
            className="pl-5 border-l-2"
            style={{ borderColor: `${primaryColor}30` }}
          >
            <div className="text-gray-700 leading-relaxed">
              {educationContent || (
                <p className="italic text-gray-300">
                  Vos diplômes et formations...
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
