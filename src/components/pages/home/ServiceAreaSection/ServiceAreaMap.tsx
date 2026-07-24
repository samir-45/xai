interface ServiceAreaMapProps {
  mapQuery: string;
}

export default function ServiceAreaMap({ mapQuery }: ServiceAreaMapProps) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    mapQuery,
  )}&output=embed`;

  return (
    <div className="min-h-[430px] overflow-hidden bg-[#d9d9d9] md:min-h-[520px]">
      <iframe
        title="Google map showing Titan Flaggers service area"
        src={mapSrc}
        className="h-[430px] w-full border-0 md:h-[520px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
