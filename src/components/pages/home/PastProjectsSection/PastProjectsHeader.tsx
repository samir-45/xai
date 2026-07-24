interface PastProjectsHeaderProps {
  eyebrow: string;
  heading: string;
}

export default function PastProjectsHeader({
  eyebrow,
  heading,
}: PastProjectsHeaderProps) {
  return (
    <div className="mx-auto max-w-[820px] text-center">
      <p className="text-[20px] font-semibold text-[#f58200]">{eyebrow}</p>
      <h2 className="mt-3 text-[34px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#111111] md:text-[42px]">
        {heading}
      </h2>
    </div>
  );
}
