type Props = {
  title: string;
  description?: string;
  disclaimer?: string;
  children: React.ReactNode;
};

export function CalculatorCard({
  title,
  description,
  disclaimer,
  children,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white">
      <div className="border-b p-5">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        )}
      </div>

      <div className="p-5">{children}</div>

      {disclaimer && (
        <div className="border-t bg-gray-50 px-5 py-3">
          <p className="text-xs text-gray-500">{disclaimer}</p>
        </div>
      )}
    </div>
  );
}
