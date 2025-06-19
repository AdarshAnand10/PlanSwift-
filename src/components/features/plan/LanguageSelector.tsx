'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SUPPORTED_LANGUAGES } from '@/lib/constants';
import { Label } from '@/components/ui/label';
import { Languages } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (newLanguage: string) => void;
  disabled?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="language-select" className="text-sm font-medium text-muted-foreground flex items-center">
        <Languages className="h-4 w-4 mr-2 text-accent" />
        Plan Language
      </Label>
      <Select
        value={currentLanguage}
        onValueChange={onLanguageChange}
        disabled={disabled}
      >
        <SelectTrigger id="language-select" className="w-full md:w-[200px] bg-card">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;