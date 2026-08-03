import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Company, CompanyStatus } from "@/lib/buildings";

const STATUS_STYLES: Record<CompanyStatus, string> = {
  Active: "bg-green-100 text-green-700",
  Prospect: "bg-orange-100 text-orange-700",
};

type CompanyCardProps = {
  company: Company;
  onRemove?: () => void;
};

export function CompanyCard({ company, onRemove }: CompanyCardProps) {
  return (
    <Card size="sm">
      <CardContent className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">{company.name}</span>
          <span className="text-sm text-muted-foreground">
            {company.companyNumber}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={cn(STATUS_STYLES[company.status])}>
            {company.status}
          </Badge>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Remove ${company.name}`}
            onClick={onRemove}
          >
            <X className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
