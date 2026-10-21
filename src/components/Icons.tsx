// Phosphor-style 256-viewbox paths copied from the E4 mockup.
type IconProps = { size?: number };

function Icon({ size, d }: IconProps & { d: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export const ExternalIcon = ({ size = 12 }: IconProps) => (
  <Icon
    size={size}
    d="M224 104a8 8 0 0 1-16 0V59.32l-66.33 66.34a8 8 0 0 1-11.32-11.32L196.68 48H152a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8Zm-40 24a8 8 0 0 0-8 8v72H48V80h72a8 8 0 0 0 0-16H48a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-72a8 8 0 0 0-8-8Z"
  />
);

export const ArrowRightIcon = ({ size = 14 }: IconProps) => (
  <Icon
    size={size}
    d="M221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z"
  />
);

export const CloseIcon = ({ size = 18 }: IconProps) => (
  <Icon
    size={size}
    d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128 50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z"
  />
);

export const ChevronDownIcon = ({ size = 18 }: IconProps) => (
  <Icon
    size={size}
    d="M213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32Z"
  />
);

export const PrevIcon = ({ size = 20 }: IconProps) => (
  <Icon size={size} d="M165.66 202.34a8 8 0 0 1-11.32 11.32l-80-80a8 8 0 0 1 0-11.32l80-80a8 8 0 0 1 11.32 11.32L91.31 128Z" />
);

export const NextIcon = ({ size = 20 }: IconProps) => (
  <Icon size={size} d="M181.66 133.66l-80 80a8 8 0 0 1-11.32-11.32L164.69 128 90.34 53.66a8 8 0 0 1 11.32-11.32l80 80a8 8 0 0 1 0 11.32Z" />
);

export const ThemeIcon = ({ size = 16 }: IconProps) => (
  <Icon size={size} d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192V40a88 88 0 0 1 0 176Z" />
);

export const MenuIcon = ({ size = 18 }: IconProps) => (
  <Icon
    size={size}
    d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8ZM40 72h176a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16Zm176 112H40a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16Z"
  />
);
