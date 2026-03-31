import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { JanPronunciation } from "@/components/jan-pronunciation";

type Project = {
  name: string;
  description: string;
  url: string;
};

const fallbackProjects: Project[] = [
  {
    name: "scandrop-mcp",
    description: "An MCP for LLMs to understand 3D spaces",
    url: "https://github.com/Janjs/scandrop-mcp",
  },
  {
    name: "chordwise",
    description: "Genarate Chord Progressions with AI",
    url: "https://github.com/Janjs/chordwise",
  },
  {
    name: "stroop",
    description: "Generate strudel.cc code with AI",
    url: "https://github.com/Janjs/stroop",
  },
  {
    name: "sunnyspots",
    description:
      "A map to discover when cafes, parks, restaurants and bars get sunlight throughout the day.",
    url: "https://github.com/Janjs/sunnyspots",
  },
  {
    name: "highlights-ai",
    description:
      "Basketball highlight reel maker with scene-based editing and AI-assisted detection.",
    url: "https://github.com/Janjs/highlights-ai",
  },
  {
    name: "todays-harvest",
    description:
      "Shows which fruits and vegetables are in season where you live.",
    url: "https://github.com/Janjs/todays-harvest",
  },
];

function decodeHtml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .trim();
}

async function getPinnedProjects(): Promise<Project[]> {
  try {
    const response = await fetch("https://github.com/Janjs", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return fallbackProjects;
    }

    const html = await response.text();
    const blockRegex = /<div class="pinned-item-list-item-content">([\s\S]*?)<\/li>/g;
    const projects: Project[] = [];

    for (const blockMatch of html.matchAll(blockRegex)) {
      const block = blockMatch[1];
      const repoMatch = block.match(
        /href="\/Janjs\/([^"#?]+)"[\s\S]*?<span class="repo">([^<]+)<\/span>/,
      );
      const descriptionMatch = block.match(
        /<p class="pinned-item-desc[^>]*>\s*([\s\S]*?)\s*<\/p>/,
      );

      if (!repoMatch) {
        continue;
      }

      const repoName = decodeHtml(repoMatch[2]);
      projects.push({
        name: repoName,
        description: decodeHtml(descriptionMatch?.[1] ?? "No description."),
        url: `https://github.com/Janjs/${repoMatch[1]}`,
      });
    }

    return projects.length > 0 ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

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
  const projects = await getPinnedProjects();

  const renderProjects = (projectList: Project[]) => (
    <div className="space-y-2.5">
      {projectList.map((project, index) => (
        <Card key={project.url}>
          <CardHeader className="space-y-1.5">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-sm font-medium sm:text-base">{project.name}</CardTitle>
              <div className="flex items-center gap-2">
                {index < 3 ? <Badge>Active</Badge> : null}
                <Badge variant="secondary">Link</Badge>
              </div>
            </div>
            <p className="text-xs leading-snug text-muted-foreground sm:text-sm">
              {project.description}
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted-foreground sm:text-sm"
            >
              {project.url}
            </a>
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
