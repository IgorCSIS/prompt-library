import type { Metadata } from 'next';
import { CopyButton } from '@/components/CopyButton';

export const metadata: Metadata = {
  title: 'The MASTER Framework, a 9-Layer Prompt Engineering System',
  description:
    'A complete reference for the MASTER prompt engineering framework: Mission, Agent, Situation, Task, Examples, Rules, Think, Eval, Output. Each layer prevents a specific failure mode in LLM output. With examples and the full copy-paste template.',
  keywords: [
    'MASTER framework',
    'prompt engineering framework',
    'CO-STAR alternative',
    'chain of thought',
    'few-shot prompting',
    'system prompts',
    'self-evaluation prompts',
    'how to write prompts',
    'prompt engineering principles',
    'LLM prompt design',
  ],
  alternates: { canonical: '/framework/' },
  openGraph: {
    title: 'The MASTER Framework, a 9-Layer Prompt Engineering System',
    description: 'Mission, Agent, Situation, Task, Examples, Rules, Think, Eval, Output. The complete reference with examples.',
    url: '/framework/',
    images: ['/og-image.svg'],
  },
};

const LAYERS = [
  {
    letter: 'M',
    name: 'Mission',
    tag: 'Layer 1',
    why: 'The single, unambiguous statement of what success looks like. Most prompts fail here, they describe activity, not outcome. The model needs to know the destination, not just the journey.',
    include: [
      'The end goal in one sentence',
      'Who will use or judge the output',
      'What "good" looks like vs. "great"',
      'The stakes, why this matters',
    ],
    example: `## MISSION
Produce a 500-word executive summary that convinces a non-technical CFO to approve a $200K AI infrastructure budget. Success means the CFO understands the ROI without needing a technical background.`,
    failure:
      '"Write a summary of our AI infrastructure needs." → A technically accurate but strategically useless document because the model didn\'t know the audience was a CFO or the goal was budget approval.',
  },
  {
    letter: 'A',
    name: 'Agent',
    tag: 'Layer 2',
    why: 'The persona, identity, and mental model the AI adopts. This is not decoration, it fundamentally shifts vocabulary, reasoning style, assumptions, and confidence. A lawyer thinks differently than a poet.',
    include: [
      'Professional role and seniority level',
      'Domain expertise and worldview',
      'How they approach problems',
      'Their relationship to the user',
    ],
    example: `## AGENT
You are a Principal Product Manager at a Series B SaaS company with 8 years of experience. You think in frameworks, speak plainly to executives, and always tie recommendations to revenue or retention metrics. Direct, never hedges unnecessarily.`,
    failure:
      'The model responds as a generic "helpful assistant", wishy-washy, overly balanced, lacking the confident stance a true expert would provide.',
  },
  {
    letter: 'S',
    name: 'Situation',
    tag: 'Layer 3',
    why: 'The full context the model needs to be calibrated to your reality, not a generic case. Without it, the model invents assumptions, and those assumptions are often wrong.',
    include: [
      'Background on the problem',
      'Relevant history or prior decisions',
      'Current state vs. desired state',
      'Key stakeholders and their positions',
      'Constraints (budget, time, politics)',
    ],
    example: `## SITUATION
We are a 40-person B2B SaaS company. Our NPS dropped from 52 to 31 over the last two quarters. Our head of CS left last month. We have a board meeting in 3 weeks. The CEO wants a recovery plan but the engineering team is already at capacity. Budget is limited to $50K for Q3.`,
    failure:
      'The model gives textbook advice that is technically correct but completely impractical, recommending a 6-month overhaul when you need results in 3 weeks with no engineering bandwidth.',
  },
  {
    letter: 'T',
    name: 'Task',
    tag: 'Layer 4',
    why: 'The specific, decomposed action you need performed. Not "help me with X", but the exact steps, components, and deliverables broken into precise sub-tasks. Decomposition is the single most underused prompting technique.',
    include: [
      'Primary deliverable, stated precisely',
      'Sub-tasks numbered in order',
      'What to do AND what to decide',
      'Scope: what is in, what is out',
    ],
    example: `## TASK
1. Diagnose the top 3 root causes of the NPS drop
2. For each cause, propose one quick-win intervention (executable in under 2 weeks)
3. Draft a 5-slide board narrative: problem → cause → plan → metrics → ask
4. Flag any assumptions I should validate before presenting`,
    failure:
      '"Help me with our NPS problem" produces a 1,000-word essay that analyzes everything and decides nothing. The model picks the scope, and it is rarely the user\'s scope.',
  },
  {
    letter: 'E',
    name: 'Examples',
    tag: 'Layer 5',
    why: 'Showing beats telling. Few-shot examples communicate format, tone, depth, and style more efficiently than any description. This single layer can double output quality for structured or repeated tasks.',
    include: [
      '1-3 input → output pairs',
      'A "good" and "bad" example if stakes are high',
      'Examples that cover edge cases',
      'Label them clearly: [EXAMPLE 1], [EXAMPLE 2]',
    ],
    example: `## EXAMPLES
[GOOD OUTPUT EXAMPLE]
Root Cause: Onboarding friction
Evidence: 68% of detractors mentioned "hard to get started" in verbatim
Intervention: Launch a live onboarding session every Tuesday. Owner: CS. Timeline: 5 days.

[WEAK OUTPUT, AVOID]
"Improve the customer experience by making onboarding better."`,
    failure:
      'The model produces output at the right semantic level but wrong structural level, too long, wrong format, wrong tone, missing the specific fields you needed.',
  },
  {
    letter: 'R',
    name: 'Rules',
    tag: 'Layer 6',
    why: 'Explicit constraints and guardrails. What NOT to do is as important as what to do. Without rules, the model fills gaps with its defaults, which may be the opposite of what you need.',
    include: [
      'Hard prohibitions (never do X)',
      'Style constraints (no jargon, no hedging)',
      'Scope limits (do not address Y)',
      'Format constraints (no bullet points, etc.)',
    ],
    example: `## RULES
- Do NOT recommend hiring more CS staff (budget constraint)
- Do NOT use phrases like "it is important to note" or "it is worth mentioning"
- Do NOT hedge recommendations, state them directly
- Keep all interventions executable by existing team
- Maximum 3 bullet points per section`,
    failure:
      'The model recommends hiring a VP of CS (budget: $0), wraps every insight in "it is important to consider...", and produces a 2,000-word document you asked to be concise.',
  },
  {
    letter: '+',
    name: 'Think',
    tag: 'Bonus · Chain of Thought',
    why: 'Explicit instruction for the model to reason before responding. This is one of the highest-leverage techniques in all of prompt engineering, it measurably improves accuracy on complex tasks by forcing step-by-step reasoning.',
    include: [
      'Explicit "think step by step" instruction',
      'Reasoning structure (hypothesis → evidence → conclusion)',
      'Instruction to show work before final answer',
      'For complex tasks: "reason in a scratchpad first"',
    ],
    example: `## THINK
Before producing your final output, reason through the following:
1. What evidence supports each root cause hypothesis?
2. What could I be wrong about?
3. What would a skeptic challenge first?

Show this reasoning briefly, then deliver the final output.`,
    failure:
      'On complex analytical tasks, the model confidently produces a plausible-sounding but logically flawed analysis. It "sounds right" but skipped two inferential steps.',
  },
  {
    letter: '+',
    name: 'Eval',
    tag: 'Bonus · Self-Evaluation',
    why: 'Instruction for the model to judge its own output before delivering it. Creates a feedback loop within a single inference, catching errors, gaps, and quality issues before they reach you.',
    include: [
      'Criteria to self-grade against',
      'Instruction to flag uncertainty',
      'Ask for confidence scores on key claims',
      'Request: "what did I miss?"',
    ],
    example: `## EVAL
After drafting your response, score it on:
- Specificity (1-5): Are recommendations concrete and actionable?
- Feasibility (1-5): Are they executable given the constraints?
- Completeness (1-5): Have I addressed all sub-tasks?

If any score is below 4, revise before delivering.`,
    failure:
      'The model delivers vague recommendations with full confidence. "Improve communication with customers" passes without scrutiny. Self-eval would have caught it.',
  },
  {
    letter: '+',
    name: 'Output',
    tag: 'Bonus · Output Contract',
    why: 'The explicit contract for what the final response must look like, format, length, structure, delivery. This is different from Task (what to do) and Rules (what not to do), this is the exact shape of the deliverable.',
    include: [
      'Exact format (JSON, markdown, prose, table)',
      'Length or word count target',
      'Section headers and order',
      'What to include vs. omit',
      'Tone and register',
    ],
    example: `## OUTPUT
Format: Markdown with H2 headers
Length: 400-600 words total
Structure:
  ## Root Causes (3 max, evidence per item)
  ## Quick Wins (numbered list)
  ## Board Narrative (5 bullets, one per slide)
Tone: Direct, executive-ready. No preamble.`,
    failure:
      'You get a beautifully reasoned 1,800-word essay when you needed a 5-bullet board slide. The content is correct but the container is wrong.',
  },
];

const FULL_TEMPLATE = `## MISSION
[One sentence: what does success look like? Who judges it? What are the stakes?]

## AGENT
[Role, seniority, domain expertise, thinking style, relationship to user]

## SITUATION
[Background, current state, constraints, stakeholders, history, what has been tried]

## TASK
[Decomposed sub-tasks, numbered, in order. State exact deliverables. Define scope boundaries.]
1.
2.
3.

## EXAMPLES
[1-3 input → output pairs showing the pattern, format, and quality level you expect]
[GOOD EXAMPLE:]
[BAD EXAMPLE (optional but powerful):]

## RULES
[Hard constraints and prohibitions. What NOT to do, include, or assume.]
- Do NOT...
- Never use...
- Avoid...

## THINK
[Chain-of-thought activation. Tell the model how to reason before responding.]
Before responding, reason through: [steps]. Show briefly, then deliver final output.

## EVAL
[Self-evaluation criteria. Tell the model what to check before delivering.]
Score your output on [criteria]. If any score is below [threshold], revise first.

## OUTPUT
[Exact format, length, structure, tone, and section order of the final response]
Format: | Length: | Structure: | Tone:`;

export default function FrameworkPage() {
  return (
    <>
      <section className="container-page pt-16 pb-12 md:pt-24">
        <div className="max-w-3xl">
          <p className="heading-eyebrow mb-5">
            9 Layers · Supersedes CO-STAR · Works on any LLM
          </p>
          <h1 className="heading-display mb-6">The MASTER framework</h1>
          <p className="text-lg md:text-xl text-fg-muted leading-relaxed">
            A 9-layer system engineered from first principles to eliminate every
            root cause of prompt failure. Each layer addresses a specific
            failure mode. Use it scaled to your task, Full MASTER for
            high-stakes or reusable prompts, MASTER-lite when simpler is enough.
          </p>
        </div>
      </section>

      <section className="container-page pb-20 space-y-4">
        {LAYERS.map((layer, idx) => (
          <article key={idx} className="card p-6 md:p-8">
            <div className="grid md:grid-cols-[120px_1fr] gap-6">
              <div className="flex flex-col items-start gap-2">
                <div className="h-20 w-20 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-5xl font-bold font-mono text-accent">
                  {layer.letter}
                </div>
                <p className="heading-eyebrow !text-fg-subtle">{layer.tag}</p>
              </div>

              <div className="space-y-5">
                <header>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                    {layer.name}
                  </h2>
                  <p className="text-fg-muted leading-relaxed">{layer.why}</p>
                </header>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="card-elevated p-4">
                    <h3 className="heading-eyebrow mb-3">What to include</h3>
                    <ul className="space-y-1.5">
                      {layer.include.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm text-fg-muted flex items-start gap-2"
                        >
                          <span className="text-accent flex-shrink-0 font-mono mt-0.5">
                            →
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-elevated p-4">
                    <h3 className="heading-eyebrow !text-warn mb-3">
                      Without it
                    </h3>
                    <p className="text-sm text-fg-muted leading-relaxed">
                      {layer.failure}
                    </p>
                  </div>
                </div>

                <div className="bg-bg border-l-2 border-accent rounded-md overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-bg-surface/60">
                    <span className="heading-eyebrow !text-fg-muted">
                      Example
                    </span>
                    <CopyButton text={layer.example} />
                  </div>
                  <pre className="prose-prompt p-4 overflow-x-auto">
                    {layer.example}
                  </pre>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="container-page py-16">
        <div className="card-elevated p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
          <p className="heading-eyebrow mb-3">Complete Reference</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            The full MASTER template
          </h2>
          <p className="text-fg-muted mb-6 max-w-2xl">
            Copy this into a new prompt and fill in each section. For simpler
            tasks, use only Mission + Task + Output + one or two constraints
            (the MASTER-lite pattern).
          </p>
          <div className="bg-bg border border-border rounded-md overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-bg-surface/60">
              <span className="heading-eyebrow !text-fg-muted">
                Full MASTER template
              </span>
              <CopyButton text={FULL_TEMPLATE} />
            </div>
            <pre className="prose-prompt p-4 md:p-6 overflow-x-auto">
              {FULL_TEMPLATE}
            </pre>
          </div>
        </div>
      </section>
    </>
  );
}
