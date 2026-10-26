export interface Review {
  id: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  drink: string;
}

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    author: 'Elena Rostova',
    role: 'Q-Grader & Coffee Sommelier',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'Yesterday',
    comment: 'The Gandhi Reserve Espresso is a masterclass in extraction geometry. The balance between lively citric acidity and rich dark cacao is sublime. Easily in my top 3 worldwide.',
    drink: 'Gandhi Reserve Espresso'
  },
  {
    id: 'rev-2',
    author: 'Marcus Vance',
    role: 'Creative Director, London',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '3 days ago',
    comment: 'Walking into [CODE WITH GANDHI] feels like entering a sanctuary. The 3D digital ordering experience is next-level, and that Silk Velvet Flat White has ruined all other coffee for me.',
    drink: 'Silk Velvet Flat White'
  },
  {
    id: 'rev-3',
    author: 'Sophia Chen',
    role: 'Architect & Interior Designer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '1 week ago',
    comment: 'The aesthetic coherence between the cafe space, the packaging, and this online experience is breathtaking. The Nitro Cold Brew cascade is hypnotic!',
    drink: 'Nitro Cold Brew Cascade'
  },
  {
    id: 'rev-4',
    author: 'Julian Thorne',
    role: 'Michelin Star Chef',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The Colombia Geisha Private Reserve paired with their cardamom bun is extraordinary. You can taste the obsessive attention to terroir and roasting curves.',
    drink: 'Colombia Geisha Private Reserve'
  }
];
