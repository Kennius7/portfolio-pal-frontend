"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/app/components/SiteHeader";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { useAuth, User, Portfolio } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
import { Shield, Eye, Save } from "lucide-react";
import { useGetAllUser } from "@/app/hooks/helpers";
import Link from "next/link";

function AdminPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<Portfolio | null>(null);
  const [saved, setSaved] = useState(false);
  const { data: allUsers = [] } = useGetAllUser();

  useEffect(() => {
    if (!user || (user && isAdmin)) {
      router.push("/");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUsers(allUsers);
    if (allUsers?.[0]) {
      setSelectedId(allUsers[0].id);
      setForm(allUsers[0].portfolio);
    }
  }, [allUsers, user, router, isAdmin]);

  if (!user || !isAdmin)
    return (
      <div className="min-h-screen">
        <SiteHeader />
      </div>
    );

  const select = (id: string) => {
    setSelectedId(id);
    const u = users.find((x) => x.id === id);
    if (u) setForm(u.portfolio);
  };

  //   const save = () => {
  //     if (!selectedId || !form) return;
  //     updateUserPortfolioById(selectedId, form);
  //     setUsers(listAllUsers());
  //     setSaved(true);
  //     setTimeout(() => setSaved(false), 1800);
  //   };

  const selected = users.find((u) => u.id === selectedId);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-accent" />
          <h1 className="text-3xl">Admin Console</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Manage all user portfolios on the platform.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-2xl bg-card p-4">
            <h3 className="px-2 text-sm font-semibold text-muted-foreground">
              {users.length} users
            </h3>
            <ul className="mt-3 space-y-1">
              {users.map((u) => (
                <li key={u.id}>
                  <button
                    onClick={() => select(u.id)}
                    className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
                      selectedId === u.id
                        ? "bg-gradient-brand shadow-glow"
                        : "hover:bg-background"
                    }`}
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-background text-sm font-bold">
                      {u.portfolio.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {u.portfolio.name}
                      </p>
                      <p className="truncate text-xs opacity-80">
                        @{u.username}
                        {isAdmin && " · admin"}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {form && selected ? (
            <section className="rounded-2xl bg-card p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl">
                    Editing: {selected.portfolio.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {selected.email} · @{selected.username}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/u/${selected.username}`}>
                    <Button variant="secondary">
                      <Eye className="mr-2 h-4 w-4" /> View
                    </Button>
                  </Link>
                  <Button
                    // onClick={save}
                    className="bg-gradient-brand shadow-glow"
                  >
                    <Save className="mr-2 h-4 w-4" />{" "}
                    {saved ? "Saved!" : "Save"}
                  </Button>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Tagline</Label>
                  <Input
                    value={form.tagline}
                    onChange={(e) =>
                      setForm({ ...form, tagline: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label>Short bio</Label>
                <Textarea
                  value={form.bioShort}
                  onChange={(e) =>
                    setForm({ ...form, bioShort: e.target.value })
                  }
                />
              </div>
              <div className="mt-4">
                <Label>Long bio</Label>
                <Textarea
                  value={form.bioLong}
                  onChange={(e) =>
                    setForm({ ...form, bioLong: e.target.value })
                  }
                />
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                Note: this is a frontend-only mock. When you wire Firebase +
                Vercel serverless functions, replace the
                <code className="mx-1">updateUserPortfolioById</code> call with
                an authenticated API request.
              </p>
            </section>
          ) : (
            <div className="rounded-2xl bg-card p-8 text-muted-foreground">
              Select a user to edit.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
