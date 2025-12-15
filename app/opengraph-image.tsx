import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Document Pro - Générateur de Documents Professionnels";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  // CORRECTION : URL directe en string pour éviter que Webpack ne tente de la bundler
  const interBold = await fetch(
    "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          fontFamily: "Inter",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Abstract Glow Background */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "20%",
            width: "600px",
            height: "600px",
            backgroundColor: "#059669",
            filter: "blur(120px)",
            opacity: 0.2,
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            right: "10%",
            width: "500px",
            height: "500px",
            backgroundColor: "#34d399",
            filter: "blur(120px)",
            opacity: 0.15,
            borderRadius: "50%",
          }}
        />

        {/* Glass Card Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.1)",
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            borderRadius: "32px",
            padding: "60px 80px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            gap: "20px",
          }}
        >
          {/* Logo / Icon Area */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(5, 150, 105, 0.1)",
              border: "1px solid rgba(52, 211, 153, 0.2)",
              borderRadius: "24px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 0 40px rgba(5, 150, 105, 0.2)",
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#34d399"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                fontSize: "72px",
                fontWeight: 900,
                color: "white",
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                textAlign: "center",
              }}
            >
              Document Pro
            </h1>
            <p
              style={{
                fontSize: "28px",
                color: "#94a3b8",
                marginTop: "10px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              Générateur 100% Gratuit
            </p>
          </div>

          {/* Badges */}
          <div
            style={{
              display: "flex",
              gap: "24px",
              marginTop: "30px",
            }}
          >
            {["Devis", "Factures", "CV", "Lettres"].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 24px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "100px",
                  color: "#e2e8f0",
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Text */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "18px",
            color: "#64748b",
            fontWeight: 500,
          }}
        >
          <span>Sécurisé</span>
          <span style={{ color: "#34d399" }}>•</span>
          <span>Privé</span>
          <span style={{ color: "#34d399" }}>•</span>
          <span>Illimité</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: interBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
