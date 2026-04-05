export type AboutMethodPhase = {
  id: string;
  title: string;
  summary: string;
  what: string;
  goal: string;
};

export type AboutStrengthItem = {
  title: string;
  detail: string;
};

export const aboutPage = {
  hero: {
    eyebrow: "About",
    name: "Yuumi He",
    role: "Product Manager",
    intro:
      "I focus on 0-to-1 product building — turning ambiguous ideas into launch-ready products through clear thinking, efficient execution, and cross-functional collaboration.",
    markLabel: "Product, from 0 to 1",
  },
  method: {
    eyebrow: "How I Work",
    phases: [
      {
        id: "01",
        title: "Clarify",
        summary: "Turn vague intent into a clear problem worth solving.",
        what: "I identify the real problem behind scattered requests and constraints so a clear direction can become visible.",
        goal: "Turn vague intentions into a clear product problem.",
      },
      {
        id: "02",
        title: "Structure",
        summary: "Translate ideas into logic, workflows, and priorities.",
        what: "I translate early ideas into product logic, workflows, and priorities that teams can actually align around.",
        goal: "Create a foundation that is buildable and ready to move.",
      },
      {
        id: "03",
        title: "Deliver",
        summary: "Ship outcomes that are real, useful, and ready for users.",
        what: "I turn product thinking into outcomes that launch, land with users, and hold up under real conditions.",
        goal: "Ship something real, useful, and ready for users.",
      },
    ] satisfies AboutMethodPhase[],
  },
  strengths: {
    eyebrow: "What I Bring",
    items: [
      {
        title: "5+ Years in Product",
        detail: "Experience across requirement analysis, workflow design, and feature delivery.",
      },
      {
        title: "0 to 1 Product Building",
        detail: "Shaping early ideas into launch-ready systems with structure and speed.",
      },
      {
        title: "Cross-functional Execution",
        detail: "Working across design, engineering, and operations to move products forward.",
      },
    ] satisfies AboutStrengthItem[],
  },
};
