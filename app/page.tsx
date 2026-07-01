import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-sm">
          <Sparkles className="h-4 w-4" />
          v0-style starter
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Hello world from the v0 stack.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          A clean Vercel-ready starter using Next.js App Router, React, TypeScript, Tailwind CSS, and a shadcn-style component structure.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button>
            Ship it
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline">View components</Button>
        </div>
      </section>
    </main>
  );
}
