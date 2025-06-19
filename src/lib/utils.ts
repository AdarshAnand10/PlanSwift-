
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { PlanSection } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function parseMarkdownToSections(markdown: string): PlanSection[] {
  const sections: PlanSection[] = [];
  // Normalize line endings and split
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  let currentSection: PlanSection | null = null;
  let contentBuffer: string[] = [];

  for (const line of lines) {
    // Regex to match headings like # Title, ## Title, ### Title etc.
    const headingMatch = line.match(/^(#+)\s+(.*)/);

    if (headingMatch) {
      // If there's an existing section, push it before starting a new one.
      if (currentSection) {
        currentSection.content = contentBuffer.join('\n').trim();
        sections.push(currentSection);
        contentBuffer = [];
      }
      
      const level = headingMatch[1].length; // e.g., ## is level 2
      const title = headingMatch[2].trim();
      
      // For PlanSwift, we primarily care about H2 as section delimiters, but this is more general
      // For this app, we will treat any heading as a new section for simplicity
      currentSection = {
        id: generateUniqueId(),
        title: title,
        content: '', // Content will be built up by subsequent lines
      };
    } else if (currentSection) {
      // If it's not a heading line and we are in a section, add to content.
      contentBuffer.push(line);
    } else {
      // Lines before any heading (e.g. an intro paragraph before the first section)
      // We can choose to ignore them or put them in a default "Introduction" section
      // For now, let's create a default section if one doesn't exist.
      if (sections.length === 0 && line.trim() !== '') {
         currentSection = {
          id: generateUniqueId(),
          title: "Introduction", // Default title for content before first heading
          content: '',
        };
        contentBuffer.push(line);
      }
    }
  }

  // Push the last section if it exists
  if (currentSection) {
    currentSection.content = contentBuffer.join('\n').trim();
    sections.push(currentSection);
  }
  
  // If no sections were parsed but there was content, create a single section
  if (sections.length === 0 && markdown.trim() !== '') {
    return [{
      id: generateUniqueId(),
      title: 'Business Plan Overview',
      content: markdown.trim(),
    }];
  }

  return sections.filter(section => section.title || section.content);
}

// Debounce function
export function debounce<T extends (...args: any[]) => void>(func: T, delay = 300) {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
