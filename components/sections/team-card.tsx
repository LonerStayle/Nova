import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export function TeamCard({ name, role, bio, initials }: TeamCardProps) {
  return (
    <Card className="flex flex-col items-center p-6 text-center">
      <div
        aria-hidden="true"
        className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-gradient text-2xl font-bold tracking-tight text-white shadow-sm"
      >
        {initials}
      </div>
      <h3 className="mt-5 text-base font-semibold tracking-tight">{name}</h3>
      <Pill variant="mono" className="mt-2">
        {role}
      </Pill>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        {bio}
      </p>
    </Card>
  );
}
