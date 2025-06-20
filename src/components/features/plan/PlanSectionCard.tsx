
'use client';

import React, { useState } from 'react';
import type { PlanSection } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Edit3, Save, Bot, MessageSquare, XCircle, Loader2 } from 'lucide-react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import AlterSectionDialog from './AlterSectionDialog';

interface PlanSectionCardProps {
  section: PlanSection;
  sectionNumber: number;
  onUpdateContent: (newContent: string) => void;
  onAlterSection: (command: string) => Promise<void>;
  isAltering: boolean;
  disabled?: boolean;
}

const PlanSectionCard: React.FC<PlanSectionCardProps> = ({ section, sectionNumber, onUpdateContent, onAlterSection, isAltering, disabled = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState(section.content);
  const [isAlterDialogOpen, setIsAlterDialogOpen] = useState(false);

  const handleSave = () => {
    if (disabled) return;
    onUpdateContent(editableContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditableContent(section.content);
    setIsEditing(false);
  };

  // Update local state if prop changes (e.g., after AI alteration)
  React.useEffect(() => {
    setEditableContent(section.content);
  }, [section.content]);

  return (
    <AccordionItem value={section.id} className="bg-card border-input-border rounded-lg shadow-md mb-4 overflow-hidden">
      <AccordionTrigger className="hover:no-underline px-6 py-4">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-xl font-headline font-semibold text-primary">
            {sectionNumber}. {section.title}
          </h3>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 pt-0">
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-foreground">
          {isEditing ? (
            <Textarea
              value={editableContent}
              onChange={(e) => setEditableContent(e.target.value)}
              rows={10}
              className="w-full border-input-border rounded-md p-2 focus:ring-primary focus:border-primary"
              aria-label={`Edit content for section ${section.title}`}
              disabled={disabled}
            />
          ) : (
            <div className="whitespace-pre-wrap break-words rounded-md p-2 min-h-[100px]" dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br />') }} />

          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-2 items-center justify-end">
          {isEditing ? (
            <>
              <Button onClick={handleSave} size="sm" variant="default" disabled={disabled}>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
              <Button onClick={handleCancel} size="sm" variant="outline" disabled={disabled}>
                <XCircle className="mr-2 h-4 w-4" /> Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} size="sm" variant="outline" disabled={disabled}>
              <Edit3 className="mr-2 h-4 w-4" /> Edit Manually
            </Button>
          )}
          <Button onClick={() => setIsAlterDialogOpen(true)} size="sm" variant="secondary" disabled={disabled || isAltering || isEditing}>
            {isAltering ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
            {isAltering ? 'Altering...' : 'Alter with AI'}
          </Button>
        </div>
      </AccordionContent>
      <AlterSectionDialog
        isOpen={isAlterDialogOpen}
        onClose={() => setIsAlterDialogOpen(false)}
        sectionTitle={section.title}
        currentContent={section.content}
        onAlterCommand={onAlterSection}
        isAltering={isAltering}
      />
    </AccordionItem>
  );
};

export default PlanSectionCard;
