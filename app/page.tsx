import { Separator } from "@/components/ui/separator";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { Highlighter } from "@/components/ui/highlighter";
import { ThemeToggle } from "@/components/theme-toggle";
import { JanPronunciation } from "@/components/jan-pronunciation";
import { ProjectsExpandableList } from "@/components/projects-expandable-list";
import { portfolioProjects } from "@/lib/projects";
import type { ReactNode } from "react";

type AboutItem = {
  id: string;
  content: ReactNode;
};

const resumeItems: AboutItem[] = [
  {
    id: "upf",
    content: (
      <>
        BSc Computer Engineering - UPF Barcelona <span aria-hidden="true">🇪🇸</span>
      </>
    ),
  },
  {
    id: "internship",
    content: "AI video analytics internship: people counting systems at local startup",
  },
  {
    id: "trinity",
    content: (
      <>
        MSc Computer Science (AR/VR) - Trinity College Dublin <span aria-hidden="true">🇮🇪</span>
      </>
    ),
  },
  {
    id: "consulting",
    content: (
      <>
        4+ years consulting building AI web apps at Dutch Bank <span aria-hidden="true">🇳🇱</span>, US Medtech{" "}
        <span aria-hidden="true">🇺🇸</span>, and German Industrial Machinery <span aria-hidden="true">🇩🇪</span>
      </>
    ),
  },
];

const highlights = [
  "Built AI chatbot platforms used by 50,000+ users",
  "Developed agentic systems with LLMs, RAG, and enterprise integrations",
  "Worked with Next.js, Kotlin, Python, Azure, AWS",
  "Built scalable backend systems (>1000 QPS, high availability)",
];

export default function Home() {
  const projects = portfolioProjects;

  return (
    <>
      <div className="fixed top-4 right-[calc(1rem-var(--scrollbar-compensation,0px))] z-50 sm:top-6 sm:right-[calc(1.5rem-var(--scrollbar-compensation,0px))]">
        <ThemeToggle />
      </div>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-10 sm:px-8 sm:py-14">
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
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <div className="space-y-2.5">
              {resumeItems.map((item) => (
                <p key={item.id} className="text-sm leading-snug">
                  {item.content}
                </p>
              ))}
            </div>

            <div className="space-y-2.5">
              {highlights.map((item) => (
                <p key={item} className="text-sm leading-snug text-muted-foreground">
                  {item}
                </p>
              ))}
            </div>
          </div>
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
