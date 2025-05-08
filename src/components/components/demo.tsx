import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

function Component() {
  const max = 12;
  const skipInterval = 2;
  const ticks = [...Array(max + 1)].map((_, i) => i);

  return (
    <div className="space-y-4 min-w-[300px]">
      <Label>Slider with ticks</Label>
      <div>
        <Slider defaultValue={[5]} max={max} aria-label="Slider with ticks" />
        <span
          className="mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium text-muted-foreground"
          aria-hidden="true"
        >
          {ticks.map((_, i) => (
            <span key={i} className="flex w-0 flex-col items-center justify-center gap-2">
              <span
                className={cn("h-1 w-px bg-muted-foreground/70", i % skipInterval !== 0 && "h-0.5")}
              />
              <span className={cn(i % skipInterval !== 0 && "opacity-0")}>{i}</span>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

export { Component };
