/* eslint-disable prettier/prettier */
import { Mail, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-nav text-sm">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <h4 className="mb-3 text-base font-bold">
            Portfolio <span className="text-gradient">Pal</span>
          </h4>
          <p className="text-muted-foreground">
            Multi-user portfolio platform. Sign up, build your portfolio, and share a unique link with clients.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-base font-bold">Information</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>About</li>
            <li>Skills</li>
            <li>Projects</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-base font-bold">Have Questions?</h4>
          <div className="flex flex-col item-start text-muted-foreground gap-2">
            <p className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> +234 (805) 554-9979</p>
            <p className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> shosanacodemia@gmail.com</p>
          </div>
          <div className="mt-3 flex gap-3 text-muted-foreground">
            {/* <Github className="h-5 w-5" /> */}
            {/* <Linkedin className="h-5 w-5" /> */}
          </div>
        </div>
      </div>
      <div className="border-t border-border/40 py-4 text-center text-xs text-muted-foreground">
        © 2022 Portfolio Pal. All rights reserved.
      </div>
    </footer>
  );
}
