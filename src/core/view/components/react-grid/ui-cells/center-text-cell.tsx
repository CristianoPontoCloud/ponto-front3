export function CenterTextCell({ text, className }: { text: string, className?: string }) {
  return <div className={`w-full h-full flex justify-center items-center ${className ?? ''}`}>
    {text}
  </div>
}
