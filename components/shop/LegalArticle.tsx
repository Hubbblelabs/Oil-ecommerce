import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface LegalSection {
  heading: string;
  body: string[];
  list?: string[];
}

export function LegalArticle({
  eyebrow,
  title,
  titleItalic,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  titleItalic: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back home
      </Link>

      <header className="mb-12 border-b border-border pb-10">
        <p className="eyebrow mb-4 flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-primary" />
          {eyebrow}
        </p>
        <h1 className="text-display-hero text-4xl text-foreground sm:text-5xl">
          {title} <em className="text-display-italic text-primary">{titleItalic}</em>
        </h1>
        <p className="label-xs mt-5">Last updated — {updated}</p>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">{intro}</p>
      </header>

      <div className="space-y-12">
        {sections.map((section, i) => (
          <section key={section.heading}>
            <div className="mb-4 flex items-baseline gap-4">
              <span className="label-tiny text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                {section.heading}
              </h2>
            </div>
            <div className="space-y-4 pl-0 sm:pl-10">
              {section.body.map((p) => (
                <p key={p} className="text-sm leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="space-y-2.5">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-16 rounded-2xl border border-border bg-card p-8">
        <p className="eyebrow mb-3">Questions?</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Reach us any time on WhatsApp at{" "}
          <a
            href="https://wa.me/917305212759"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            +91 73052 12759
          </a>{" "}
          or through our{" "}
          <Link href="/contact" className="font-semibold text-primary hover:underline">
            contact page
          </Link>
          . We answer Monday to Saturday, 9 am – 7 pm.
        </p>
      </footer>
    </div>
  );
}
