
import React from 'react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description:string }) => (
  <div className="flex flex-col items-center p-6 text-center bg-card rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="mb-2 text-xl font-headline font-semibold">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default FeatureCard;
