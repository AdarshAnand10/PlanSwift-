'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, FileType } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportButtonsProps {
  planName: string;
  onExportPDF: () => void;
  disabled?: boolean;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ planName, onExportPDF, disabled = false }) => {
  const { toast } = useToast();

  const handleExportWord = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Exporting to Word (.docx) format will be available in a future update.",
      variant: "default",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button onClick={onExportPDF} variant="outline" disabled={disabled} className="bg-card hover:bg-secondary/80">
        <FileText className="mr-2 h-4 w-4 text-accent" />
        Export to PDF
      </Button>
      <Button onClick={handleExportWord} variant="outline" disabled={disabled} className="bg-card hover:bg-secondary/80">
        <FileType className="mr-2 h-4 w-4 text-accent" />
        Export to Word (Soon)
      </Button>
    </div>
  );
};

export default ExportButtons;