
'use client';

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  planName: string;
  price: string;
  features: string[];
  isFeatured?: boolean;
  buttonText: string;
  buttonGradient: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  planName,
  price,
  features,
  isFeatured = false,
  buttonText,
  buttonGradient,
}) => {
  const accentColor = isFeatured ? 'text-accent' : 'text-primary';

  return (
    <Card className={cn(isFeatured && "border-accent ring-2 ring-accent/50 shadow-lg")}>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-baseline">
          <CardTitle className={cn("font-headline text-xl", accentColor)}>{planName}</CardTitle>
          <p className={cn("text-2xl font-bold", isFeatured ? accentColor : 'text-foreground')}>{price}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <ul className="space-y-2 text-muted-foreground">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className={cn("h-5 w-5 mt-0.5 shrink-0", accentColor)} />
              <span dangerouslySetInnerHTML={{ __html: feature }} />
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className={cn("w-full text-white hover:opacity-90 transition-opacity", buttonGradient)}>
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
