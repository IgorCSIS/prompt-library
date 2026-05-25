import { CopyButton } from './CopyButton';
import { cn } from '@/lib/utils';

interface PromptBlockProps {
  text: string;
  label?: string;
  showCopy?: boolean;
  className?: string;
}

export function PromptBlock({
  text,
  label,
  showCopy = true,
  className,
}: PromptBlockProps) {
  return (
    <div className={cn('card-elevated overflow-hidden', className)}>
      {(label || showCopy) && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-bg-surface/50">
          {label && (
            <span className="heading-eyebrow !text-fg-muted">{label}</span>
          )}
          {showCopy && <CopyButton text={text} />}
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="prose-prompt">{text}</pre>
      </div>
    </div>
  );
}
