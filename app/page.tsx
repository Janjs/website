import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { JanPronunciation } from "@/components/jan-pronunciation";
import { ExternalLink, Star } from "lucide-react";

type Project = {
  name: string;
  description: string;
  languages: string[];
  stars: number;
  site: string | null;
  github: string;
};

const portfolioProjects: Project[] = [
  {
    name: "scandrop-mcp",
    description: "An MCP for LLMs to understand 3D spaces",
    languages: ["TypeScript", "Python", "CSS", "JavaScript"],
    stars: 39,
    site: null,
    github: "scandrop-mcp",
  },
  {
    name: "chordwise",
    description: "Genarate Chord Progressions with AI",
    languages: ["TypeScript", "JavaScript", "CSS", "Dockerfile"],
    stars: 0,
    site: "chordwise.chat",
    github: "chordwise",
  },
  {
    name: "stroop",
    description: "Generate strudel.cc code with AI",
    languages: ["TypeScript", "CSS", "Other"],
    stars: 0,
    site: "stroop.janjs.dev",
    github: "stroop",
  },
  {
    name: "sunnyspots",
    description:
      "A map to discover when cafes, parks, restaurants and bars get sunlight throughout the day",
    languages: ["TypeScript", "HTML", "CSS", "JavaScript"],
    stars: 0,
    site: "sunnyspots.vercel.app",
    github: "sunnyspots",
  },
  {
    name: "highlights-ai",
    description:
      "Basketball highlight reel maker that uses Roboflow for basketball and made-basket detection, with scene-based editing so you can pick your best moments and export a clip",
    languages: ["TypeScript", "Python", "CSS", "Other"],
    stars: 0,
    site: "highlightsai.janjs.dev",
    github: "highlights-ai",
  },
  {
    name: "todays-harvest",
    description:
      "Today’s Harvest shows which fruits and vegetables are in season where you live, so you can eat fresher and shop smarter every month",
    languages: ["TypeScript", "Swift", "Ruby", "Other"],
    stars: 0,
    site: null,
    github: "todays-harvest",
  },
];

const resumeItems = [
  "BSc Computer Engineering - UPF Barcelona",
  "Internship at local startup",
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

  const renderProjects = (projectList: Project[]) => (
    <div className="space-y-2.5">
      {projectList.map((project) => (
        <Card key={project.github}>
          <CardHeader className="space-y-1.5">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-sm font-medium sm:text-base">{project.name}</CardTitle>
              {project.stars > 0 ? (
                <Badge className="bg-amber-500 text-amber-950 hover:bg-amber-400">
                  <Star className="size-3 fill-current" />
                  {project.stars}
                </Badge>
              ) : null}
            </div>
            <p className="text-xs leading-snug text-muted-foreground sm:text-sm">
              {project.description}
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {project.languages.map((language) => (
                  <Badge key={`${project.github}-${language}`} variant="outline" className="text-xs">
                    {language}
                  </Badge>
                ))}
              </div>
              <div className="flex shrink-0 items-center gap-2 self-center">
                <a
                  href={`https://github.com/Janjs/${project.github}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.name} on GitHub`}
                  className="inline-flex size-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <svg
                    viewBox="0 -0.5 25 25"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005zm-7.64 17.666q.048-.112-.112-.192-.16-.048-.208.032-.048.112.112.192.144.096.208-.032zm.497.545q.112-.08-.032-.256-.16-.144-.256-.048-.112.08.032.256.159.157.256.047zm.48.72q.144-.112 0-.304-.128-.208-.272-.096-.144.08 0 .288t.272.112zm.672.673q.128-.128-.064-.304-.192-.192-.32-.048-.144.128.064.304.192.192.32.044zm.913.4q.048-.176-.208-.256-.24-.064-.304.112t.208.24q.24.097.304-.096zm1.009.08q0-.208-.272-.176-.256 0-.256.176 0 .208.272.176.256.001.256-.175zm.929-.16q-.032-.176-.288-.144-.256.048-.224.24t.288.128.225-.224z" />
                  </svg>
                </a>
                {project.site ? (
                  <a
                    href={`https://${project.site}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-7 items-center gap-1 rounded-md border border-border px-2 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    Open
                    <ExternalLink className="size-3.5" />
                  </a>
                ) : null}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
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
            Hi, I&apos;m <JanPronunciation />.
          </p>
          <p className="text-xl leading-tight sm:text-2xl">
            Software engineer building artificial intelligence and spatial computing
            experiences.
          </p>
        </section>

        <Separator className="my-9" />

        <section className="grid gap-6 md:grid-cols-2 md:gap-8">
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
        </section>

        <Separator className="my-9" />

        <section>{renderProjects(projects)}</section>
      </main>
    </>
  );
}
