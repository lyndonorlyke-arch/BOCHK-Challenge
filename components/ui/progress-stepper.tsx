export function ProgressStepper({
  steps,
  currentStep = 1
}: {
  steps: string[];
  currentStep?: number;
}) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step, index) => {
        const isDone = index < currentStep;
        const isCurrent = index === currentStep;
        return (
          <li key={step} className="flex items-center gap-3 rounded-lg border border-bank-line bg-white p-3">
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                isDone ? "bg-bank-red text-white" : isCurrent ? "bg-bank-navy text-white" : "bg-bank-bg text-bank-muted"
              }`}
            >
              {index + 1}
            </span>
            <span className="text-sm font-bold text-bank-navy">{step}</span>
          </li>
        );
      })}
    </ol>
  );
}
