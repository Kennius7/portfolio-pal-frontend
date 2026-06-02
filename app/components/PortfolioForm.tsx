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
    <div className="mt-8 grid gap-6 rounded-3xl bg-card p-8">
      <h2 className="text-xl">Basics</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Display name</Label>
          <Input
            value={portfolioForm.title || ""}
            onChange={(e) => updatePortfolio({ title: e.target.value })}
          />
        </div>
        <div>
          <Label>Tagline</Label>
          <Input
            value={portfolioForm.tagline || ""}
            onChange={(e) => updatePortfolio({ tagline: e.target.value })}
          />
        </div>
        <div>
          <Label>Greeting</Label>
          <Input
            value={portfolioForm.greeting || ""}
            onChange={(e) => updatePortfolio({ greeting: e.target.value })}
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            value={portfolioForm.email || ""}
            onChange={(e) => updatePortfolio({ email: e.target.value })}
          />
        </div>
        <div>
          <Label>WhatsApp</Label>
          <Input
            value={portfolioForm.whatsapp || ""}
            onChange={(e) => updatePortfolio({ whatsapp: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Label>Short bio</Label>
        <RichTextEditor
          value={portfolioForm.bioShort || ""}
          onChange={(value) => updatePortfolio({ bioShort: value })}
        />
      </div>
      <div>
        <Label>Long bio</Label>
        <RichTextEditor
          value={portfolioForm.bioLong || ""}
          onChange={(value) => updatePortfolio({ bioLong: value })}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Profile Picture</Label>
          <ImageUploader
            value={portfolioForm.avatarUrl ?? ""}
            onChange={(url) => updatePortfolio({ avatarUrl: url })}
          />
        </div>
        <div>
          <Label>Resume</Label>
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
