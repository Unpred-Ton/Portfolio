/** The continuous form: content column between two tractor-feed strips. */
export function Paper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div aria-hidden="true" className="tractor absolute inset-y-0 left-0 w-[1.25rem] sm:w-strip" />
      <div aria-hidden="true" className="tractor absolute inset-y-0 right-0 w-[1.25rem] sm:w-strip" />
      <div className="mx-auto max-w-[80rem] px-[2rem] sm:px-[calc(var(--strip)+1.5rem)] lg:px-[calc(var(--strip)+3rem)]">
        {children}
      </div>
    </div>
  );
}
