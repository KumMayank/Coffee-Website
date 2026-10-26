export interface CoffeeOrigin {
  id: string;
  country: string;
  region: string;
  altitude: string;
  varietals: string;
  process: string;
  profile: string;
  harvest: string;
  color: string;
  flag: string;
  description: string;
  notes: string[];
  image: string;
}

export const COFFEE_ORIGINS: CoffeeOrigin[] = [
  {
    id: 'ethiopia',
    country: 'Ethiopia',
    region: 'Guji & Yirgacheffe',
    altitude: '1,950m – 2,250m',
    varietals: 'Heirloom Indigenous',
    process: 'Washed & Natural Anaerobic',
    profile: 'Floral, Bergamot, Wild Berries',
    harvest: 'November – February',
    color: '#C08A55',
    flag: '🇪🇹',
    description: 'The ancestral birthplace of Arabica. Grown beneath wild forest canopies in mineral-rich volcanic soil, yielding exquisite tea-like floral delicacy.',
    notes: ['Jasmine Floral', 'Sweet Bergamot', 'Dried Peach'],
    image: 'https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'colombia',
    country: 'Colombia',
    region: 'Huila & Nariño',
    altitude: '1,700m – 2,100m',
    varietals: 'Geisha, Pink Bourbon, Caturra',
    process: 'Double Fermented Honey',
    profile: 'Brown Sugar, Red Currant, Caramel',
    harvest: 'May – July & October – December',
    color: '#D4A373',
    flag: '🇨🇴',
    description: 'Micro-lots nestled between Andean volcanic mountain peaks where dramatic temperature shifts produce dense cherries with unmatched complex sweetness.',
    notes: ['Red Apple', 'Turbinado Sugar', 'Bright Lime Crema'],
    image: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sumatra',
    country: 'Indonesia',
    region: 'Aceh Highlands & Lake Toba',
    altitude: '1,400m – 1,700m',
    varietals: 'Ateng, Tim Tim, Bergendal',
    process: 'Giling Basah (Wet-Hulled)',
    profile: 'Cedar, Dark Chocolate, Molasses',
    harvest: 'September – December',
    color: '#8C5E35',
    flag: '🇮🇩',
    description: 'Cultivated in lush volcanic rainforests. The unique wet-hulling technique produces unparalleled syrupy mouthfeel and bold, herbal, earthy depths.',
    notes: ['Smoked Dark Cacao', 'Cedar Bark', 'Black Cherry'],
    image: 'https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'brazil',
    country: 'Brazil',
    region: 'Cerrado Mineiro',
    altitude: '1,100m – 1,300m',
    varietals: 'Yellow Bourbon, Mundo Novo',
    process: 'Natural Sun-Dried on Patios',
    profile: 'Hazelnut, Milk Chocolate, Marzipan',
    harvest: 'June – September',
    color: '#C99355',
    flag: '🇧🇷',
    description: 'Solar-drenched high plateaus with defined dry winters. Cherries dry whole in the sun, concentrating rich nutty undertones and dense body.',
    notes: ['Toasted Hazelnut', 'Velvety Praline', 'Creamy Cocoa'],
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80'
  }
];
