
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
// Removed FileType icon as Word export is removed

interface ExportButtonsProps {
  planName: string;
  onExportPDF: () => void;
  disabled?: boolean;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ planName, onExportPDF, disabled = false }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button onClick={onExportPDF} variant="outline" disabled={disabled} className="bg-card hover:bg-secondary/80">
        <FileText className="mr-2 h-4 w-4 text-accent" />
        Export to PDF
      </Button>
      {/* "Export to Word" button removed */}
    </div>
  );
};

export default ExportButtons;
