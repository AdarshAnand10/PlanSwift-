'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { INDUSTRIES } from '@/lib/constants';
import type { IndustryTemplate } from '@/types';
import { Building } from 'lucide-react';

interface IndustryTemplateSelectorProps {
  selectedTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
}

const IndustryTemplateSelector: React.FC<IndustryTemplateSelectorProps> = ({
  selectedTemplateId,
  onSelectTemplate,
}) => {
  return (
    <RadioGroup
      value={selectedTemplateId}
      onValueChange={onSelectTemplate}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {INDUSTRIES.map((template: IndustryTemplate) => (
        <Label htmlFor={template.id} key={template.id} className="cursor-pointer">
          <Card className={`transition-all hover:shadow-lg ${selectedTemplateId === template.id ? 'border-primary ring-2 ring-primary shadow-lg' : 'border-input-border'}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium font-headline">{template.name}</CardTitle>
              <RadioGroupItem value={template.id} id={template.id} className="hidden" />
              <Building className={`h-6 w-6 ${selectedTemplateId === template.id ? 'text-primary' : 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{template.description}</p>
            </CardContent>
          </Card>
