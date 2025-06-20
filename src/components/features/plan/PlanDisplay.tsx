'use client';

import React from 'react';
import type { BusinessPlan } from '@/types';
import PlanSectionCard from './PlanSectionCard';
import { Accordion } from '@/components/ui/accordion';
import UpgradeCta from './UpgradeCta';

interface PlanDisplayProps {
  plan: BusinessPlan;
  isLocked: boolean;
  onSectionUpdate: (sectionId: string, newContent: string) => void;
  onSectionAlter: (sectionId: string, command: string) => Promise<void>;
  isAlteringSection: (sectionId: string) => boolean;
}

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, isLocked, onSectionUpdate, onSectionAlter, isAlteringSection }) => {
  if (!plan.sections || plan.sections.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-muted-foreground">This plan has no sections yet.</p>
        <p className="text-sm text-muted-foreground">Try generating the plan or adding sections.</p>
      </div>
    );
  }

  // Show first 4 sections for free users, otherwise show all
  const sectionsToShow = isLocked ? plan.sections.slice(0, 4) : plan.sections;
  const defaultOpenSections = isLocked ? sectionsToShow.map(s => s.id) : plan.sections.map(s => s.id);

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={defaultOpenSections} className="w-full">
        {sectionsToShow.map((section, index) => (
          <PlanSectionCard
            key={section.id}
            section={section}
            sectionNumber={index + 1}
            onUpdateContent={(newContent) => onUpdateContent(section.id, newContent)}
            onSectionAlter={(command) => onSectionAlter(section.id, command)}
            isAltering={isAlteringSection(section.id)}
            disabled={isLocked}
          />
        ))}
      </Accordion>
      
      {isLocked && <UpgradeCta />}
    </div>
  );
};

export default PlanDisplay;
