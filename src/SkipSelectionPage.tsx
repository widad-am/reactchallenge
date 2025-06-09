import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PageWrapper } from './components/Layout/PageWrapper';
import { ContentWrapper } from './components/Layout/ContentWrapper';
import { SearchBar } from './components/Search/SearchBar';
import { SkipCard } from './components/Card/SkipCard';
import { ImageModal } from './components/Modal/ImageModal';
import { Loader } from './components/Common/Loader';
import { ErrorMessage } from './components/Common/ErrorMessage';
import { Disclaimer } from './components/Common/Disclaimer';

const API_URL = "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft";

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  text-align: left;
  letter-spacing: -1.5px;
  color: #fff;

  @media (max-width: 600px) {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }
`;

const Subtitle = styled.p`
  color: #b0b6c3;
  text-align: left;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  max-width: 700px;

  @media (max-width: 600px) {
    font-size: 1rem;
    margin-bottom: 2rem;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.8rem;
  width: 100%;
  margin: 0 auto 3rem auto;
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    gap: 1.2rem;
    margin-bottom: 2rem;
  }
`;

interface Skip {
  id: string;
  size: number;
  price_before_vat: number;
  vat: number;
  hire_period_days: number;
  allowed_on_road: boolean;
}

export const SkipSelectionPage: React.FC = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>('');
  const [search, setSearch] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentModalImageUrl, setCurrentModalImageUrl] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch skips');
        return res.json();
      })
      .then((data) => {
        setSkips(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredSkips = skips.filter((skip) => {
    const query = search.toLowerCase();
    return (
      `${skip.size} Yard${skip.size > 1 ? 's' : ''}`.toLowerCase().includes(query) ||
      String(skip.size).includes(query) ||
      String(Math.round(skip.price_before_vat * (1 + skip.vat / 100))).toLowerCase().includes(query)
    );
  });

  const handleImageClick = (imageUrl: string) => {
    setCurrentModalImageUrl(imageUrl);
    setShowImageModal(true);
  };

  const handleCloseModal = () => {
    setShowImageModal(false);
    setCurrentModalImageUrl('');
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <Title>Our Flexible Skip Plans</Title>
        <Subtitle>
          Select the perfect skip size for your project. Our transparent pricing includes VAT and
          flexible hire periods.
        </Subtitle>

        <SearchBar value={search} onChange={setSearch} />

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <Grid>
            {filteredSkips.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                isSelected={skip.id === selectedId}
                onSelect={setSelectedId}
                onImageClick={handleImageClick}
              />
            ))}
          </Grid>
        )}

        <Disclaimer />
      </ContentWrapper>

      {showImageModal && (
        <ImageModal
          imageUrl={currentModalImageUrl}
          onClose={handleCloseModal}
        />
      )}
    </PageWrapper>
  );
}; 