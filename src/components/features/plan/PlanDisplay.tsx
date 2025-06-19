'use client';

import React from 'react';
import type { BusinessPlan, PlanSection } from '@/types';
import PlanSectionCard from './PlanSectionCard';
import { Accordion } from '@/components/ui/accordion';

interface PlanDisplayProps {
  plan: BusinessPlan;
  onSectionUpdate: (sectionId: string, newContent: string) => void;
  onSectionAlter: (sectionId: string, command: string) => Promise<void>; // Alter using AI
  isAlteringSection: (sectionId: string) => boolean;
}

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, onSectionUpdate, onSectionAlter, isAlteringSection }) => {
  if (!plan.sections || plan.sections.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-muted-foreground">This plan has no sections yet.</p>
        <p className="text-sm text-muted-foreground">Try generating the plan or adding sections.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={plan.sections.map(s => s.id)} className="w-full">
        {plan.sections.map((section, index) => (
          <PlanSectionCard
            key={section.id}
            section={section}
            sectionNumber={index + 1}
            onUpdateContent={(newContent) => onSectionUpdate(section.id, newContent)}
            onAlterSection={(command) => onSectionAlter(section.id, command)}
            isAltering={isAlteringSection(section.id)}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default PlanDisplay;