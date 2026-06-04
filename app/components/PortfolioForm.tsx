import dynamic from "next/dynamic";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Portfolio } from "../types/types";
import RichTextEditor from "./RichTextEditor";
import ImageUploader from "./HandleImageUpload";
import { usePortfolioForm } from "../hooks/usePortfolioForm";

const FileUploader = dynamic(() => import("./HandleFileUpload"), {
  ssr: false,
});

interface PortfolioFormProps {
  portfolioForm: Portfolio;
}

function PortfolioForm({ portfolioForm }: PortfolioFormProps) {
  const { updatePortfolio } = usePortfolioForm();

  return (
    <div className="mt-6 grid gap-5 rounded-3xl bg-card p-5 sm:mt-8 sm:gap-6 sm:p-8">
      <h2 className="text-lg sm:text-xl">Basics</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="pf-title">Display name</Label>
          <Input
            id="pf-title"
            value={portfolioForm.title || ""}
            onChange={(e) => updatePortfolio({ title: e.target.value })}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="pf-slug">Slug</Label>
          <Input
            id="pf-slug"
            value={portfolioForm.slug || ""}
            onChange={(e) => updatePortfolio({ slug: e.target.value })}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="pf-tagline">Tagline</Label>
          <Input
            id="pf-tagline"
            value={portfolioForm.tagline || ""}
            onChange={(e) => updatePortfolio({ tagline: e.target.value })}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="pf-greeting">Greeting</Label>
          <Input
            id="pf-greeting"
            value={portfolioForm.greeting || ""}
            onChange={(e) => updatePortfolio({ greeting: e.target.value })}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="pf-email">Email</Label>
          <Input
            id="pf-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={portfolioForm.email || ""}
            onChange={(e) => updatePortfolio({ email: e.target.value })}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="pf-whatsapp">WhatsApp</Label>
          <Input
            id="pf-whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={portfolioForm.whatsapp || ""}
            onChange={(e) => updatePortfolio({ whatsapp: e.target.value })}
          />
        </div>
      </div>

      {/* ── Bio fields: full width ── */}
      <div className="grid gap-1.5">
        <Label htmlFor="pf-bio-short">Short bio</Label>
        <RichTextEditor
          value={portfolioForm.bioShort || ""}
          onChange={(value) => updatePortfolio({ bioShort: value })}
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="pf-bio-long">Long bio</Label>
        <RichTextEditor
          value={portfolioForm.bioLong || ""}
          onChange={(value) => updatePortfolio({ bioLong: value })}
        />
      </div>

      {/* ── Media uploaders: stack on mobile, side-by-side on sm+ ── */}
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="pf-avatar">Profile picture</Label>
          <ImageUploader
            value={portfolioForm.avatarUrl ?? ""}
            onChange={(url) => updatePortfolio({ avatarUrl: url })}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="pf-resume">Resume</Label>
          <FileUploader
            value={portfolioForm.resumeUrl ?? ""}
            onChange={(url) => updatePortfolio({ resumeUrl: url })}
          />
        </div>
      </div>
    </div>
  );
}

export default PortfolioForm;
