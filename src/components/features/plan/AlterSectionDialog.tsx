'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Bot, Loader2 } from 'lucide-react';

interface AlterSectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  sectionTitle: string;
  currentContent: string; // For context, maybe not directly editable here
  onAlterCommand: (command: string) => Promise<void>;
  isAltering: boolean;
}

const AlterSectionDialog: React.FC<AlterSectionDialogProps> = ({
  isOpen,
  onClose,
  sectionTitle,
  currentContent,
  onAlterCommand,
  isAltering,
}) => {
  const [command, setCommand] = useState('');

  const handleSubmit = async () => {
    if (!command.trim()) return;
    await onAlterCommand(command);
    setCommand(''); // Clear command after submission
    // onClose(); // Optionally close dialog after successful alteration
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            Alter Section: <span className="text-accent">{sectionTitle}</span>
          </DialogTitle>
          <DialogDescription>
            Use natural language to tell the AI how you want to change this section.
            For example: "Make this section more concise" or "Add a paragraph about sustainability."
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="command" className="text-md">
              Your Command:
            </Label>
            <Textarea
              id="command"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="e.g., Rewrite this section to be more persuasive and add a point about market growth."
              rows={4}
              className="resize-none"
              disabled={isAltering}
            />
          </div>
          <div className="max-h-32 overflow-y-auto p-2 border border-input-border rounded-md bg-muted/50">
            <p className="text-xs text-muted-foreground font-medium mb-1">Current Section (for reference):</p>
            <p className="text-xs text-muted-foreground whitespace-pre-line truncate-3-lines">
              {currentContent.substring(0, 200)}{currentContent.length > 200 && '...'}
            </p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isAltering}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit} disabled={isAltering || !command.trim()}>
            {isAltering ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
            {isAltering ? 'Altering...' : 'Apply AI Edit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Helper CSS class for truncating text (if not using Tailwind plugin)
// Add this to your globals.css or a utility CSS file if needed
// .truncate-3-lines {
//   display: -webkit-box;
//   -webkit-line-clamp: 3;
//   -webkit-box-orient: vertical;
//   overflow: hidden;
// }

export default AlterSectionDialog;