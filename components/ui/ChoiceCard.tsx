import * as React from "react";

type Props = {
  title: string;
  description?: string;
  selected?: boolean;
  onClick?: () => void;
};

export function ChoiceCard({ title, description, selected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full rounded-xl border p-4 text-left transition",
        "hover:border-gray-400 hover:bg-gray-50",
        selected ? "border-black bg-gray-50" : "border-gray-200 bg-white",
      ].join(" ")}
    >
      <div className="font-medium">{title}</div>
      {description ? <div className="mt-1 text-sm text-gray-600">{description}</div> : null}
    </button>
  );
}
