interface ServicesOverviewHeaderProps {
  eyebrow: string;
  heading: string;
}

export default function ServicesOverviewHeader({
  eyebrow,
  heading,
}: ServicesOverviewHeaderProps) {
  return (
    <div className="text-center">
      {eyebrow ? (
        <p className="text-[20px] font-semibold text-[#f05a24]">{eyebrow}</p>
      ) : null}
      <h2
        className={
          eyebrow
            ? "mt-3 text-[34px] font-extrabold leading-tight tracking-[-0.03em] text-black md:text-[42px]"
            : "text-[34px] font-extrabold leading-tight tracking-[-0.03em] text-black md:text-[42px]"
        }
      >
        {heading}
      </h2>
    </div>
  );
}
