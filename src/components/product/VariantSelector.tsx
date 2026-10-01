import { colors, sizes, type ColorId, type SizeId } from "@/data/options";
import { findVariant, productColors, productSizes } from "@/lib/product-utils";
import type { ResolvedProduct, ResolvedVariant } from "@/types/product";
import { OptionGroup, type Option, type OptionState } from "./OptionGroup";

function stateOf(variants: (ResolvedVariant | undefined)[]): OptionState {
  const existing = variants.filter((v): v is ResolvedVariant => !!v);
  if (existing.length === 0) return "unavailable";
  return existing.some((v) => v.availability === "available") ? "available" : "sold-out";
}

type ColorProps = { product: ResolvedProduct; selected?: ColorId; onChange: (color: ColorId) => void };

export function ColorSelector({ product, selected, onChange }: ColorProps) {
  const options: Option[] = productColors(product).map((c) => ({
    value: c,
    label: colors[c].label,
    swatch: colors[c].swatch,
    // A colour is only marked sold out when every size in that colour is sold out.
    state: stateOf(product.variants.filter((v) => v.color === c)),
  }));
  return <OptionGroup legend="Color" options={options} selected={selected} onChange={(v) => onChange(v as ColorId)} />;
}

type SizeProps = {
  product: ResolvedProduct;
  color?: ColorId;
  selected?: SizeId;
  onChange: (size: SizeId) => void;
};

export function SizeSelector({ product, color, selected, onChange }: SizeProps) {
  const options: Option[] = productSizes(product).map((s) => ({
    value: s,
    label: sizes[s].short,
    sublabel: product.sizeNames?.[s],
    // Sizes that do not exist in the selected colour are disabled.
    state: stateOf([findVariant(product, color, s)]),
  }));
  return <OptionGroup legend="Size" options={options} selected={selected} onChange={(v) => onChange(v as SizeId)} />;
}

type Props = {
  product: ResolvedProduct;
  selectedColor?: ColorId;
  selectedSize?: SizeId;
  onColorChange: (color: ColorId) => void;
  onSizeChange: (size: SizeId) => void;
};

export function VariantSelector({ product, selectedColor, selectedSize, onColorChange, onSizeChange }: Props) {
  const showColors = productColors(product).length > 0;
  const showSizes = productSizes(product).length > 0;
  if (!showColors && !showSizes) return null;
  return (
    <div className="space-y-6">
      {showColors && <ColorSelector product={product} selected={selectedColor} onChange={onColorChange} />}
      {showSizes && <SizeSelector product={product} color={selectedColor} selected={selectedSize} onChange={onSizeChange} />}
    </div>
  );
}
