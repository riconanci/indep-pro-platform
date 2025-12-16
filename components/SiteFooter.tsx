import { DisclaimerFooter } from "./DisclaimerFooter";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} Independent Pro Platform
        </div>
        <div className="mt-6">
          <DisclaimerFooter />
        </div>
      </div>
    </footer>
  );
}
