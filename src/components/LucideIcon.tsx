
import React from 'react';
import { 
  Scissors, 
  Droplets, 
  Hand, 
  Sparkles, 
  Palette, 
  Zap,
  LucideProps 
} from 'lucide-react';

const iconMap = {
  Scissors,
  Droplets,
  Hand,
  Sparkles,
  Palette,
  Zap,
};

interface LucideIconProps extends LucideProps {
  name: string;
}

const LucideIcon: React.FC<LucideIconProps> = ({ name, ...props }) => {
  const IconComponent = iconMap[name as keyof typeof iconMap];
  
  if (!IconComponent) {
    return <Scissors {...props} />;
  }
  
  return <IconComponent {...props} />;
};

export default LucideIcon;
