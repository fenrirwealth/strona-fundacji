import Image from 'next/image';

export type ArchiveItem = {
  year: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

type ArchiveCardProps = {
  item: ArchiveItem;
  priority?: boolean;
};

export function ArchiveCard({ item, priority = false }: ArchiveCardProps) {
  return (
    <article className="group relative mx-auto h-[500px] w-full max-w-[400px] shrink-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0A0A0A] shadow-[0_28px_90px_rgba(0,0,0,0.46)] lg:h-[650px] lg:w-[450px] lg:max-w-none">
      <Image
        src={item.image}
        alt={item.imageAlt}
        fill
        priority={priority}
        sizes="(max-width: 1023px) min(400px, 100vw), 450px"
        className="z-0 object-cover grayscale brightness-[0.4] transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:scale-105 lg:group-hover:grayscale-0 lg:group-hover:brightness-90"
      />

      <div
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/25 via-transparent to-black/85"
        aria-hidden="true"
      />

      <div className="absolute left-6 top-6 z-30 flex items-center gap-3 lg:left-8 lg:top-8">
        <span className="h-px w-8 bg-amber-500" aria-hidden="true" />
        <span className="text-xs font-bold tracking-[0.24em] text-amber-400">
          {item.year}
        </span>
      </div>

      <div className="absolute inset-x-4 bottom-4 z-30 rounded-2xl border border-white/15 bg-black/45 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:inset-x-5 sm:bottom-5 sm:p-6 lg:p-8">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400/85">
          {item.eyebrow}
        </p>
        <h2 className="font-display text-3xl font-medium leading-[1.02] tracking-[-0.035em] text-[#FFF9F0] lg:text-4xl">
          {item.title}
        </h2>
        <p className="mt-4 text-sm leading-6 text-white/60 lg:text-[15px] lg:leading-7">
          {item.description}
        </p>
      </div>
    </article>
  );
}
