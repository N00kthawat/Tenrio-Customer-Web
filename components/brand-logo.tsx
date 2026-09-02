import Image from 'next/image';

export type BrandLogoVariant = 'primary' | 'primary-light' | 'symbol' | 'symbol-light';

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
  alt?: string;
}

export function BrandLogo({ 
  variant = 'primary', 
  className = "", 
  alt = "Tenrio",
}: BrandLogoProps) {
  const getSrc = () => {
    switch (variant) {
      case 'primary': return '/brand/logo-primary.svg';
      case 'primary-light': return '/brand/logo-primary-light.svg';
      case 'symbol': return '/brand/logo-symbol.svg';
      case 'symbol-light': return '/brand/logo-symbol-light.svg';
      default: return '/brand/logo-primary.svg';
    }
  };

  const getDimensions = () => {
    return variant.includes('symbol') ? { width: 28, height: 28 } : { width: 120, height: 28 };
  };

  const { width, height } = getDimensions();

  return (
    <Image 
      src={getSrc()} 
      alt={alt} 
      className={["h-7 w-auto", className].filter(Boolean).join(" ")} 
      width={width}
      height={height}
      priority
    />
  );
}

export function ResponsiveBrandLogo({ 
  light = false, 
  className = "" 
}: { 
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={["flex items-center", className].filter(Boolean).join(" ")}>
      {/* Mobile: Symbol only */}
      <BrandLogo 
        variant={light ? 'symbol-light' : 'symbol'} 
        className="sm:hidden object-contain" 
      />
      {/* Desktop: Symbol + Text */}
      <div className="hidden sm:flex items-center gap-2.5">
        <BrandLogo 
          variant={light ? 'symbol-light' : 'symbol'} 
          className="object-contain" 
          alt="" // Hide from screen readers since the text is right next to it
        />
        <span className={["font-bold tracking-tight text-xl", light ? "text-white" : "text-slate-900"].join(" ")}>
          Tenrio
        </span>
      </div>
    </div>
  );
}
