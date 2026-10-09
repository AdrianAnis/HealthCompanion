import Image from "next/image"

type EmptyStateProps = {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed bg-card p-10 text-center">
      <span className="flex size-24 items-center justify-center rounded-full bg-primary">
        <Image src="/grafis/robot-companion.svg" alt="" width={64} height={64} unoptimized className="pet-float size-16 object-contain" />
      </span>
      <h2 className="mt-4 type-heading">{title}</h2>
      <p className="mt-1 max-w-sm text-muted-foreground">{description}</p>
    </div>
  )
}
