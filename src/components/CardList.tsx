import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const [isOpenModal, setIsOpenModal] = useState(false);

  // TODO SELECTED IMAGE URL STATE
  const [selectedImage, setSelectedImage] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(url: string): void {
    setSelectedImage(url);
    setIsOpenModal(true);
  }

  return (
    <SimpleGrid flex="1" gridColumn={3} gap="10">
      {/* TODO CARD GRID */}
      {cards.map(card => {
        const { description, title, ts, url } = card;

        return (
          <Card
            key={card.id}
            data={{ description, title, ts, url }}
            viewImage={() => handleViewImage(url)}
          />
        );
      })}
      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage
        isOpen={isOpenModal}
        imgUrl={selectedImage}
        onClose={() => setIsOpenModal(false)}
      />
    </SimpleGrid>
  );
}
