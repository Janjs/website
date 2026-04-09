import { Separator } from "@/components/ui/separator";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { LiveProjectButton } from "@/components/live-project-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { JanPronunciation } from "@/components/jan-pronunciation";
import { Laptop, Smartphone, Star } from "lucide-react";
import Image from "next/image";

type ProjectKind = "web" | "mobile" | "mcp";

type Project = {
  name: string;
  tag: string;
  liveUrl: string | null;
  iconSrc?: string;
  iconText?: string;
  darkIconText?: string;
  github: string;
  kind: ProjectKind;
  iconWrapperClass?: string;
  stars?: number;
};

const portfolioProjects: Project[] = [
  {
    name: "Chordwise",
    tag: "Chord progressions",
    liveUrl: "https://chordwise.chat",
    iconSrc: "/project-icons/chordwise.svg",
    github: "chordwise",
    kind: "web",
    iconWrapperClass:
      "bg-linear-to-br from-white via-[#f8f8f8] to-[#ededed] p-0.5 dark:from-[#1d1d1d] dark:via-[#252525] dark:to-[#2c2c2c]",
  },
  {
    name: "Stroop",
    tag: "Generative Audio",
    liveUrl: "https://stroop.janjs.dev",
    iconSrc: "/project-icons/stroop.svg",
    github: "stroop",
    kind: "web",
    iconWrapperClass:
      "bg-linear-to-br from-white via-[#f4fbfb] to-[#2d8b8f]/10 p-0.5 dark:from-[#173d3f] dark:via-[#1d4c4f] dark:to-[#2d8b8f]/35",
  },
  {
    name: "Scandrop MCP",
    tag: "Spatial AI",
    liveUrl: null,
    iconSrc: "/project-icons/scandrop.svg",
    github: "scandrop-mcp",
    kind: "mcp",
    iconWrapperClass:
      "bg-linear-to-br from-white via-[#f4fdf9] to-[#2ea892]/10 p-0.5 dark:from-[#113b34] dark:via-[#154842] dark:to-[#2ea892]/30",
    stars: 39,
  },
  {
    name: "Sunny Spots",
    tag: "Find sun in your city",
    liveUrl: "https://sunnyspots.vercel.app",
    iconText: "☀️",
    darkIconText: "🌙",
    iconWrapperClass:
      "bg-linear-to-br from-white via-[#fffaf0] to-[#ffb63a]/12 dark:from-[#0f1f3d] dark:via-[#162a4f] dark:to-[#264a87]/45",
    github: "sunnyspots",
    kind: "web",
  },
  {
    name: "Highlights AI",
    tag: "Sports Vision",
    liveUrl: "https://highlightsai.janjs.dev",
    iconSrc: "/project-icons/highlights-ai.svg",
    github: "highlights-ai",
    kind: "web",
    iconWrapperClass:
      "bg-linear-to-br from-white via-[#fff8ef] to-[#ffb267]/12 p-0.5 dark:from-[#4d2c17] dark:via-[#63381d] dark:to-[#ffb267]/35",
  },
  {
    name: "Today's Harvest",
    tag: "Seasonal Food",
    liveUrl: null,
    iconSrc: "/project-icons/todays-harvest.png",
    github: "todays-harvest",
    kind: "mobile",
  },
];

const resumeItems = [
  "BSc Computer Engineering - UPF Barcelona",
  "AI video analytics internship: people counting systems at local startup",
  "MSc Computer Science (AR/VR) - Trinity College Dublin",
  "4 years consulting building AI web apps at Dutch Bank, US Medtech, and German Industrial Machinery",
];

const highlights = [
  "Built AI chatbot platforms used by 50,000+ users",
  "Developed agentic systems with LLMs, RAG, and enterprise integrations",
  "Worked with Next.js, Kotlin, Python, Azure, AWS",
  "Built scalable backend systems (>1000 QPS, high availability)",
];

export default async function Home() {
  const projects = portfolioProjects;
  const chipBaseClass =
    "inline-flex h-8 items-center rounded-full border px-3 text-sm leading-none whitespace-nowrap";
  const neutralChipClass =
    "border-[#c6c6c6] bg-[#ececec] text-[#6f6f6f] dark:border-[#4e4e4e] dark:bg-[#2a2a2a] dark:text-[#c3c3c3]";
  const githubChipClass =
    "border border-[#c6c6c6] bg-[#ececec] text-foreground transition-colors hover:bg-[#dfdfdf] dark:border-[#4e4e4e] dark:bg-[#2a2a2a] dark:hover:bg-[#333333]";
  const starsChipClass = "border-[#d0ab2a] bg-[#f5cf49] text-[#5f4300] dark:border-[#c7a633] dark:bg-[#6b5713] dark:text-[#f3e2a5]";
  const liveChipClass =
    "border-[#a9c790] bg-[#d9e8cf] text-[#2f6a18] hover:bg-[#cfe1c2] dark:border-[#4f7a3c] dark:bg-[#1f3920] dark:text-[#9ed18f] dark:hover:bg-[#274828]";
  const platformLabel = (kind: ProjectKind) =>
    kind === "mcp" ? "Model Context Protocol Server" : kind === "mobile" ? "Mobile App" : "Web App";

  const renderProjects = (projectList: Project[]) => (
    <div className="w-full">
      {projectList.map((project, index) => (
        <div key={project.github}>
          <div className="relative py-3 transition-colors hover:bg-accent/20 sm:py-4">
            <a
              href={project.liveUrl ?? `https://github.com/Janjs/${project.github}`}
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 z-0"
              aria-label={`Open ${project.name}`}
            />
            <div className="pointer-events-none relative z-10 flex items-center gap-2.5">
              <div
                className={`h-9 w-9 shrink-0 overflow-hidden rounded-lg sm:h-10 sm:w-10 ${project.iconWrapperClass ?? ""}`}
              >
                {project.iconText ? (
                  <span
                    className="flex h-full w-full items-center justify-center text-lg sm:text-xl"
                    aria-hidden="true"
                  >
                    {project.darkIconText ? (
                      <>
                        <span className="dark:hidden">{project.iconText}</span>
                        <span className="hidden dark:inline">{project.darkIconText}</span>
                      </>
                    ) : (
                      project.iconText
                    )}
                  </span>
                ) : (
                  <Image
                    src={project.iconSrc!}
                    alt=""
                    width={40}
                    height={40}
                    className="h-full w-full object-contain"
                    aria-hidden="true"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1 truncate text-sm leading-tight font-medium sm:text-xl sm:tracking-[-0.01em]">
                {project.name}
              </div>

              <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
                <span className="group relative inline-flex pointer-events-auto">
                  <span
                    className={`${chipBaseClass} ${neutralChipClass}`}
                    aria-label={platformLabel(project.kind)}
                    title={platformLabel(project.kind)}
                  >
                    {project.kind === "mcp" ? (
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Model_Context_Protocol_logo.svg"
                        alt=""
                        width={14}
                        height={14}
                        className="mr-1.5 h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    ) : null}
                    {project.kind === "mobile" ? (
                      <Smartphone className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    ) : null}
                    {project.kind === "web" ? <Laptop className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" /> : null}
                    {project.tag}
                  </span>
                  <span className="pointer-events-none absolute top-0 left-1/2 z-50 -translate-x-1/2 -translate-y-[calc(100%+8px)] rounded-md bg-foreground px-2 py-1 text-[11px] leading-none whitespace-nowrap text-background opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                    {platformLabel(project.kind)}
                  </span>
                </span>
                <a
                  href={`https://github.com/Janjs/${project.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`pointer-events-auto relative z-20 inline-flex h-8 w-8 items-center justify-center rounded-2xl ${githubChipClass}`}
                  aria-label={`Open ${project.name} on GitHub`}
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 -0.5 25 25"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005zm-7.64 17.666q.048-.112-.112-.192-.16-.048-.208.032-.048.112.112.192.144.096.208-.032zm.497.545q.112-.08-.032-.256-.16-.144-.256-.048-.112.08.032.256.159.157.256.047zm.48.72q.144-.112 0-.304-.128-.208-.272-.096-.144.08 0 .288t.272.112zm.672.673q.128-.128-.064-.304-.192-.192-.32-.048-.144.128.064.304.192.192.32.044zm.913.4q.048-.176-.208-.256-.24-.064-.304.112t.208.24q.24.097.304-.096zm1.009.08q0-.208-.272-.176-.256 0-.256.176 0 .208.272.176.256.001.256-.175zm.929-.16q-.032-.176-.288-.144-.256.048-.224.24t.288.128.225-.224z" />
                  </svg>
                </a>
                {project.stars ? (
                  <span className={`${chipBaseClass} gap-1.5 ${starsChipClass}`}>
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {project.stars}
                  </span>
                ) : null}
                {project.liveUrl ? (
                  <LiveProjectButton
                    href={project.liveUrl}
                    className={`pointer-events-auto h-8 px-3 text-sm font-medium ${liveChipClass}`}
                  />
                ) : null}
              </div>

              <div className="flex items-center gap-1.5 sm:hidden">
                <span className="group relative inline-flex pointer-events-auto">
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-2xl ${githubChipClass}`}
                    aria-label={platformLabel(project.kind)}
                    title={platformLabel(project.kind)}
                  >
                    {project.kind === "mcp" ? (
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Model_Context_Protocol_logo.svg"
                        alt=""
                        width={14}
                        height={14}
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    ) : null}
                    {project.kind === "mobile" ? <Smartphone className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                    {project.kind === "web" ? <Laptop className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                  </span>
                  <span className="pointer-events-none absolute top-0 left-1/2 z-50 -translate-x-1/2 -translate-y-[calc(100%+8px)] rounded-md bg-foreground px-2 py-1 text-[11px] leading-none whitespace-nowrap text-background opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                    {platformLabel(project.kind)}
                  </span>
                </span>
                <a
                  href={`https://github.com/Janjs/${project.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`pointer-events-auto relative z-20 inline-flex h-7 w-7 items-center justify-center rounded-2xl ${githubChipClass}`}
                  aria-label={`Open ${project.name} on GitHub`}
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 -0.5 25 25"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path d="m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005zm-7.64 17.666q.048-.112-.112-.192-.16-.048-.208.032-.048.112.112.192.144.096.208-.032zm.497.545q.112-.08-.032-.256-.16-.144-.256-.048-.112.08.032.256.159.157.256.047zm.48.72q.144-.112 0-.304-.128-.208-.272-.096-.144.08 0 .288t.272.112zm.672.673q.128-.128-.064-.304-.192-.192-.32-.048-.144.128.064.304.192.192.32.044zm.913.4q.048-.176-.208-.256-.24-.064-.304.112t.208.24q.24.097.304-.096zm1.009.08q0-.208-.272-.176-.256 0-.256.176 0 .208.272.176.256.001.256-.175zm.929-.16q-.032-.176-.288-.144-.256.048-.224.24t.288.128.225-.224z" />
                  </svg>
                </a>
                {project.stars ? (
                  <span className={`inline-flex h-7 items-center gap-1 rounded-full border px-2.5 text-xs leading-none whitespace-nowrap ${starsChipClass}`}>
                    <Star className="h-3 w-3 fill-current" />
                    {project.stars}
                  </span>
                ) : null}
                {project.liveUrl ? (
                  <LiveProjectButton
                    href={project.liveUrl}
                    className={`pointer-events-auto h-7 px-2.5 text-xs font-medium ${liveChipClass}`}
                  />
                ) : null}
              </div>
            </div>
          </div>
          {index < projectList.length - 1 ? <Separator /> : null}
        </div>
      ))}
      <Separator />
    </div>
  );

  return (
    <>
      <div className="fixed top-4 right-4 z-50 sm:top-6 sm:right-6">
        <ThemeToggle />
      </div>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-10 sm:px-8 sm:py-14">
        <section className="max-w-2xl space-y-3">
          <p className="text-xl leading-tight sm:text-2xl">
            <span className="inline-flex items-center gap-2">
              <EncryptedText text="Hi, I'm Jan." />
              <JanPronunciation showName={false} />
            </span>
          </p>
          <p className="text-xl leading-tight sm:text-2xl">
            Software engineer building artificial intelligence and spatial computing
            experiences.
          </p>
          <p className="text-sm text-muted-foreground">
            <a
              href="https://www.linkedin.com/in/janjimenezserra/"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
            >
              connect with me
            </a>
          </p>
        </section>

        <Separator className="my-9" />

        <section className="space-y-3 fade-up-in fade-up-delay-2">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">About me</h2>
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="space-y-2.5">
            {resumeItems.map((item) => (
              <p key={item} className="text-sm leading-snug">
                {item}
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
          {renderProjects(projects)}
        </section>
      </main>
    </>
  );
}
