import React, { createContext, useContext, useState } from 'react';

export type Card = {
  id: string;
  cardHolder: string;
  number: string; // store masked or full for demo
  exp: string; // MM/YY
  cvv?: string;
};

type PaymentContextType = {
  cards: Card[];
  method?: string | null;
  selectedCardId?: string | null;
  addCard: (card: Card) => void;
  removeCard: (id: string) => void;
  selectCard: (id?: string | null) => void;
  setSelectedMethod: (id: string) => void;
};

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<Card[]>([
    { id: 'c1', cardHolder: 'Paty', number: '7236 xxxx xxxx 2345', exp: '08/26' },
  ]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(cards[0]?.id ?? null);
  const [method, setMethod] = useState<string | null>(null);

  function addCard(card: Card) {
    setCards(prev => [card, ...prev]);
    setSelectedCardId(card.id);
  }

  function removeCard(id: string) {
    setCards(prev => prev.filter(c => c.id !== id));
    setSelectedCardId(prev => (prev === id ? null : prev));
  }

  function selectCard(id?: string | null) {
    setSelectedCardId(id ?? null);
  }
  
  function setSelectedMethod(id?: string | null) {
    setMethod(id ?? null);
  }

  return (
    <PaymentContext.Provider value={{ cards, selectedCardId, addCard, removeCard, selectCard, method, setSelectedMethod }}>
      {children}
    </PaymentContext.Provider>
  );
};

export function usePayment() {
  const ctx = useContext(PaymentContext);
  if (!ctx) throw new Error('usePayment must be used within PaymentProvider');
  return ctx;
}

export default PaymentContext;
