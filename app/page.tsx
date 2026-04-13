import { Separator } from "@/components/ui/separator";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { Highlighter } from "@/components/ui/highlighter";
import { ThemeToggle } from "@/components/theme-toggle";
import { JanPronunciation } from "@/components/jan-pronunciation";
import { ProjectsExpandableList } from "@/components/projects-expandable-list";
import {
  AboutGlobeSection,
  type AboutGlobeEntry,
  type AboutGlobeItem,
} from "@/components/about-globe-section";
import { portfolioProjects } from "@/lib/projects";

const aboutItems: AboutGlobeItem[] = [
  {
    id: "upf",
    quote:
      "Barcelona is where I'm originally from. UPF gave me the systems foundation that still shapes how I approach product engineering, architecture, and performance.",
    location: [41.3874, 2.1686],
    label: "Barcelona, Spain",
  },
  {
    id: "internship",
    quote:
      "That internship was where computer vision stopped being academic and became something practical, measurable, and deployed.",
    location: [41.3851, 2.1734],
    label: "Barcelona, Spain",
  },
  {
    id: "trinity",
    quote:
      "Studying at Trinity pulled me deep into spatial computing and AR/VR, with mentors and professors connected to the top of the industry shaping how I think about interaction design.",
    location: [53.3498, -6.2603],
    label: "Dublin, Ireland",
  },
  {
    id: "dutch-bank",
    quote:
      "The Dutch bank work had me designing and building high-availability backend systems handling 1,000+ QPS across Kotlin, Java, and Azure.",
    location: [52.3676, 4.9041],
    label: "Amsterdam, Netherlands",
  },
  {
    id: "us-medtech",
    quote:
      "The Michigan medtech work centered on building AI chatbot platforms with Next.js, used by 50,000+ internal employees.",
    location: [44.3148, -85.6024],
    label: "Michigan, United States",
  },
  {
    id: "german-machinery",
    quote:
      "The German industrial work focused on developing Next.js-based agentic systems with LLMs, RAG, and enterprise integrations.",
    location: [50.1109, 8.6821],
    label: "Frankfurt, Germany",
  },
];

const aboutEntries: AboutGlobeEntry[] = [
  {
    id: "upf",
    parts: [{ text: "BSc Computer Engineering - UPF Barcelona 🇪🇸", itemId: "upf" }],
  },
  {
    id: "internship",
    parts: [
      {
        text: "AI video analytics internship: people counting systems at local startup",
        itemId: "internship",
      },
    ],
  },
  {
    id: "trinity",
    parts: [
      {
        text: "MSc Computer Science (AR/VR) - Trinity College Dublin 🇮🇪",
        itemId: "trinity",
      },
    ],
  },
  {
    id: "consulting",
    parts: [
      { text: "4+ years consulting building AI web apps at " },
      { text: "Dutch Bank 🇳🇱", itemId: "dutch-bank", className: "font-semibold" },
      { text: ", " },
      { text: "US Medtech 🇺🇸", itemId: "us-medtech", className: "font-semibold" },
      { text: ", and " },
      { text: "German Industrial Machinery 🇩🇪", itemId: "german-machinery", className: "font-semibold" },
    ],
  },
];

export default function Home() {
  const projects = portfolioProjects;

  return (
    <>
      <div className="fixed top-4 right-[calc(1rem-var(--scrollbar-compensation,0px))] z-50 sm:top-6 sm:right-[calc(1.5rem-var(--scrollbar-compensation,0px))]">
        <ThemeToggle />
      </div>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 py-10 sm:px-8 sm:py-14">
        <section className="max-w-2xl space-y-3">
          <p className="text-xl leading-tight sm:text-2xl">
            <span className="inline-flex items-center gap-2">
              <EncryptedText text="Hi, I'm Jan." revealDelayMs={120} />
              <JanPronunciation showName={false} />
            </span>
          </p>
          <p className="pr-16 text-xl leading-tight sm:pr-0 sm:text-2xl">
            Software engineer building{" "}
            <Highlighter action="underline" color="#9fc5ff">
              artificial intelligence
            </Highlighter>{" "}
            and{" "}
            <Highlighter action="underline" color="#a7f3d0">
              spacial computing
            </Highlighter>{" "}
            experiences.
          </p>
        </section>

        <Separator className="my-9" />

        <section className="space-y-3 fade-up-in fade-up-delay-2">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">About me</h2>
          <AboutGlobeSection items={aboutItems} entries={aboutEntries} />
        </section>

        <Separator className="my-9" />

        <section className="space-y-3 fade-up-in fade-up-delay-3">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Projects</h2>
          <ProjectsExpandableList projects={projects} />
        </section>
      </main>
    </>
  );
}
