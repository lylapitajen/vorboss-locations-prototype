"use client";

import { useEffect, useState, type ComponentProps } from "react";
import { Check, ChevronDown, Home, MapPinCheck, Plus, X } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyCard } from "@/components/CompanyCard";
import type { Building, Company } from "@/lib/buildings";

type BuildingDetailsDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  container?: ComponentProps<typeof DrawerContent>["container"];
  building: Building;
};

export function BuildingDetailsDrawer({
  open,
  onOpenChange,
  container,
  building,
}: BuildingDetailsDrawerProps) {
  const [companies, setCompanies] = useState<Company[]>(building.companies);

  useEffect(() => {
    setCompanies(building.companies);
  }, [building]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} modal="trap-focus" showSwipeHandle>
      <DrawerContent container={container}>
        <div className="flex min-h-0 flex-1 flex-col gap-4 px-4 pt-6 pb-12">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <DrawerTitle className="text-xl">{building.name}</DrawerTitle>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                {building.connected && (
                  <span className="inline-flex items-center gap-1">
                    <Check className="size-4" />
                    Connected
                  </span>
                )}
                {building.wayleaveAgreed && (
                  <span className="inline-flex items-center gap-1">
                    <Check className="size-4" />
                    Wayleave agreed
                  </span>
                )}
              </div>
            </div>
            <DrawerClose
              render={<Button variant="ghost" size="icon" aria-label="Close" />}
            >
              <X />
            </DrawerClose>
          </div>

          <div className="flex items-start justify-around">
            <ActionButton
              icon={<Plus className="size-4" />}
              label={
                <>
                  Add
                  <ChevronDown className="size-4" />
                </>
              }
              circleClassName="bg-vorboss-primary text-white"
            />
            <ActionButton
              icon={<MapPinCheck className="size-4" />}
              label="Log a visit"
              circleClassName="border border-border text-muted-foreground"
            />
            <ActionButton
              icon={<Home className="size-4" />}
              label="Mark as residential"
              circleClassName="border border-border text-muted-foreground"
            />
          </div>

          <Tabs defaultValue="companies" className="flex-1">
            <TabsList variant="line" className="w-full border-b border-border">
              <TabsTrigger value="companies">Companies</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="visits">Visits</TabsTrigger>
            </TabsList>
            <TabsContent value="companies" className="flex flex-col gap-2 pt-3">
              {companies.map((company) => (
                <CompanyCard
                  key={company.companyNumber}
                  company={company}
                  onRemove={() =>
                    setCompanies((prev) =>
                      prev.filter((c) => c.companyNumber !== company.companyNumber)
                    )
                  }
                />
              ))}
            </TabsContent>
            <TabsContent value="contacts">
              {building.contacts.length} contacts
            </TabsContent>
            <TabsContent value="notes">
              {building.notes.length} notes
            </TabsContent>
            <TabsContent value="visits">
              {building.visits.length} visits
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
