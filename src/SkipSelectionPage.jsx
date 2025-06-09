import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { FaArrowRight, FaSearch } from "react-icons/fa";

const API_URL = "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft";

// Utility for pluralizing 'Yard'
function pluralizeYard(size) {
  return `${size} Yard${size > 1 ? 's' : ''}`;
}

// --- Styled Components for Fluid Plans UI --- //
const PageWrapper = styled.div`
  min-height: 100vh;
  background: #11131a; /* Darker, more consistent background */
  color: #f7f8fa;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  padding: 3rem 1rem;
  position: relative; /* For abstract elements */
  overflow: hidden;

  &::before, &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.3;
    z-index: 0;
  }

  &::before {
    width: 350px;
    height: 350px;
    background-color: #ff9966; /* Orange/peach blob */
    top: -50px;
    left: -100px;
  }

  &::after {
    width: 450px;
    height: 450px;
    background-color: #9933ff; /* Purple blob */
    bottom: -100px;
    right: -150px;
  }

  @media (max-width: 768px) {
    padding: 2rem 0.5rem;
    &::before {
      width: 250px;
      height: 250px;
      top: -30px;
      left: -80px;
    }
    &::after {
      width: 350px;
      height: 350px;
      bottom: -80px;
      right: -100px;
    }
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;

  @media (max-width: 600px) {
    padding: 0 0.8rem;
  }
`;

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
  margin: 0 auto 3rem auto; /* More space below grid */
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    gap: 1.2rem;
    margin-bottom: 2rem;
  }
`;

const Card = styled.button`
  background: rgba(30, 34, 43, 0.7); /* Frosted glass effect base */
  backdrop-filter: blur(10px); /* Frosted glass */
  border: 1px solid rgba(48, 53, 63, 0.5); /* Subtle border */
  border-radius: 1rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align content to start */
  cursor: pointer;
  position: relative;
  min-height: 280px; /* Ensure consistent card height */
  outline: none;
  text-align: left;
  transition: all 0.3s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(31, 200, 193, 0.2), rgba(67, 233, 123, 0.1));
    opacity: 0; /* Hidden by default */
    transition: opacity 0.3s ease-out;
    z-index: -1;
  }

  ${(props) =>
    props.selected &&
    css`
      background: rgba(31, 200, 193, 0.1); /* Lighter when selected */
      border: 2px solid #1fc8c1; /* Stronger border */
      box-shadow: 0 12px 40px #1fc8c166; /* More prominent glow */
      transform: translateY(-8px) scale(1.03);
      &::before {
        opacity: 1;
      }
    `}
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      filter: grayscale(1);
      pointer-events: none;
      background: rgba(30, 34, 43, 0.4);
      border-color: rgba(48, 53, 63, 0.3);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `}
  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
    transform: translateY(-5px) scale(1.015);
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.5);
    border-color: #1fc8c1; /* Highlight border on hover */
  }

  @media (max-width: 600px) {
    padding: 1.5rem;
    min-height: 250px;
  }
`;

const SkipImageWrapper = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1e26; /* Dark background */
  border-radius: 50%; /* Circular */
  box-shadow: inset 0 0 8px rgba(0,0,0,0.4), 0 2px 5px rgba(0,0,0,0.2);
  margin-bottom: 1rem;
  overflow: hidden;
  border: 1px solid rgba(48, 53, 63, 0.5);
  transition: all 0.2s ease-out;

  ${(props) =>
    props.selected &&
    css`
      border-color: #1fc8c1;
      box-shadow: inset 0 0 10px rgba(31,200,193,0.6), 0 3px 8px rgba(31,200,193,0.4);
    `}
`;

const SkipImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  display: block;
  filter: brightness(1.1) contrast(1.1);
  transition: all 0.2s ease-out;
`;

const Badge = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: linear-gradient(90deg, #1fc8c1 0%, #43e97b 100%); /* Green gradient */
  color: #1a1e26;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.2em 0.8em;
  border-radius: 1em;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const SecondaryBadge = styled(Badge)`
  background: linear-gradient(90deg, #9933ff 0%, #cc66ff 100%); /* Purple gradient */
`;

const Checkmark = styled.div`
  /* Checkmark will be a subtle visual change in selected state, not a separate element */
  display: none; /* Removed as a separate element */
`;

const CardTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  text-align: left;
  letter-spacing: -0.8px;
  color: #fff;
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

const CardDetails = styled.div`
  color: #c0c6d4;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  text-align: left;
  flex-grow: 1; /* Pushes content down */
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }
`;

const Price = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  color: #1fc8c1; /* Primary color */
  margin-bottom: 0.3rem;
  text-align: left;
  letter-spacing: -1.5px;
  position: relative;
  z-index: 1;

  ${(props) =>
    props.secondary &&
    css`
      color: #cc66ff; /* Secondary color for certain cards */
    `}

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const PriceDetails = styled.p`
  color: #b0b6c3;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  text-align: left;
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }
`;

const CardButton = styled.button`
  background: #1fc8c1; /* Primary button color */
  color: #1a1e26;
  font-weight: 700;
  font-size: 1.05rem;
  padding: 0.8em 1.5em;
  border-radius: 1.2em;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  width: 100%;
  transition: all 0.2s ease-out;
  box-shadow: 0 4px 15px rgba(31, 200, 193, 0.3);
  position: relative;
  z-index: 1;

  ${(props) =>
    props.secondary &&
    css`
      background: #cc66ff; /* Secondary button color */
      box-shadow: 0 4px 15px rgba(204, 102, 255, 0.3);
    `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(31, 200, 193, 0.4);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(31, 200, 193, 0.2);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const NotAllowed = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3em;
  background: rgba(230, 126, 34, 0.2); /* Subtle warning background */
  color: #e67e22;
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 0.5rem;
  padding: 0.15em 0.6em;
  border-radius: 0.4em;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  width: fit-content;
  position: relative;
  z-index: 1;
`;

const Loader = styled.div`
  margin: 4rem auto;
  border: 4px solid #232733;
  border-top: 4px solid #1fc8c1;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMsg = styled.div`
  color: #e67e22;
  text-align: center;
  margin: 2rem 0;
  font-size: 1.05rem;
`;

// New Styled Component for Disclaimer Text
const DisclaimerText = styled.p`
  color: #7a7f8a; /* Muted text color */
  font-size: 0.85rem;
  text-align: center;
  margin-top: 3rem; /* Space from the grid */
  padding: 0 1rem; /* Padding to prevent text from hitting edges */
  line-height: 1.5;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1; /* Ensure it stays above background blobs */

  @media (max-width: 600px) {
    font-size: 0.8rem;
    margin-top: 2rem;
    padding: 0 0.8rem;
  }
`;

// New Styled Components for Image Modal
const ImageModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ImageModalContent = styled.div`
  background: #1a1e26;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 0.5rem;
`;

const ImageModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.2s ease-out;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const SearchBarWrapper = styled.div`
  width: 100%;
  max-width: 480px; /* Slightly wider */
  margin: 0 auto 3rem auto; /* Adjusted spacing */
  display: flex;
  align-items: center;
  background: rgba(40, 44, 52, 0.8); /* Darker, frosted background */
  backdrop-filter: blur(5px); /* Frosted effect */
  border-radius: 2.5em; /* More rounded */
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.3);
  padding: 0.5em 1.5em; /* Adjusted padding */
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    max-width: 100%;
    margin-bottom: 2.5rem;
    padding: 0.4em 1.2em;
  }
`;

const SearchIcon = styled(FaSearch)`
  color: #aeb6c4; /* Muted icon color */
  font-size: 1.1em;
  margin-right: 0.8em;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.05rem;
  color: #f7f8fa; /* Light text color */
  padding: 0.6em 0;
  outline: none;
  &::placeholder {
    color: #8a94a6;
    font-weight: 400;
    letter-spacing: 0.1px;
  }
`;

function formatPrice(price, vat) {
  const total = Math.round(price * (1 + vat / 100));
  return `£${total}`;
}

export default function SkipSelectionPage() {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentModalImageUrl, setCurrentModalImageUrl] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch skips");
        return res.json();
      })
      .then((data) => {
        // Assuming data is an array of skips
        setSkips(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const selectedSkip = skips.find((s) => s.id === selectedId);

  // Filter skips by search
  const filteredSkips = skips.filter((skip) => {
    const query = search.toLowerCase();
    return (
      pluralizeYard(skip.size).toLowerCase().includes(query) ||
      String(skip.size).includes(query) ||
      String(formatPrice(skip.price_before_vat, skip.vat)).toLowerCase().includes(query)
    );
  });

  const handleImageClick = (imageUrl) => {
    setCurrentModalImageUrl(imageUrl);
    setShowImageModal(true);
  };

  const handleCloseModal = () => {
    setShowImageModal(false);
    setCurrentModalImageUrl("");
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <Title>Our Flexible Skip Plans</Title>
        <Subtitle>
          Select the perfect skip size for your project. Our transparent pricing includes VAT and
          flexible hire periods.
        </Subtitle>

        <SearchBarWrapper>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search by size or price..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search skips"
          />
        </SearchBarWrapper>

        {loading ? (
          <Loader aria-label="Loading skips..." />
        ) : error ? (
          <ErrorMsg>{error}</ErrorMsg>
        ) : (
          <Grid>
            {filteredSkips.map((skip) => {
              const isSelected = skip.id === selectedId;
              const isDisabled = !skip.allowed_on_road;
              const isMostPopular = skip.size === 6; /* Example: make 6-yarder most popular */
              const isSpecial = skip.size === 8; /* Example: make 8-yarder special */

              return (
                <Card
                  key={skip.id}
                  selected={isSelected}
                  disabled={isDisabled}
                  aria-pressed={isSelected}
                  aria-disabled={isDisabled}
                  tabIndex={isDisabled ? -1 : 0}
                  onClick={() => {
                    if (!isDisabled) setSelectedId(isSelected ? null : skip.id);
                  }}
                  aria-label={
                    isDisabled
                      ? `${pluralizeYard(skip.size)} skip, not allowed on road`
                      : `${pluralizeYard(skip.size)} skip${isSelected ? ', selected' : ''}`
                  }
                >
                  {isMostPopular && <Badge>Most Popular</Badge>}
                  {isSpecial && <SecondaryBadge>2X The Requests</SecondaryBadge>}

                  <SkipImageWrapper selected={isSelected} onClick={(e) => {
                    e.stopPropagation(); /* Prevent card selection on image click */
                    handleImageClick(`/skips/${skip.size}-yarder-skip.jpg`);
                  }}>
                    <SkipImage
                      src={`/skips/${skip.size}-yarder-skip.jpg`}
                      alt={`Photo of a ${pluralizeYard(skip.size)} skip`}
                      onError={e => { e.target.src = "/skips/default.png"; }}
                    />
                  </SkipImageWrapper>

                  <CardTitle>{pluralizeYard(skip.size)} Skip</CardTitle>
                  <CardDetails>
                    Flexible & unlimited access to skip hire with a hyperfast
                    turnaround time.
                  </CardDetails>
                  <Price secondary={isSpecial}>
                    {formatPrice(skip.price_before_vat, skip.vat)}/hire
                  </Price>
                  <PriceDetails>
                    {skip.hire_period_days} day hire period
                  </PriceDetails>

                  {!skip.allowed_on_road && (
                    <NotAllowed>
                      <span aria-hidden="true" style={{ fontSize: '1.1em', marginRight: '0.3em' }}>⚠️</span>
                      Not Allowed On The Road
                    </NotAllowed>
                  )}

                  <CardButton secondary={isSpecial}>
                    Get Started <FaArrowRight />
                  </CardButton>
                </Card>
              );
            })}
          </Grid>
        )}

        <DisclaimerText>
          Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.
        </DisclaimerText>

      </ContentWrapper>

      {showImageModal && (
        <ImageModalOverlay onClick={handleCloseModal}>
          <ImageModalContent onClick={e => e.stopPropagation()}>
            <ImageModalCloseButton onClick={handleCloseModal}>&times;</ImageModalCloseButton>
            <ModalImage src={currentModalImageUrl} alt="Full size skip image" />
          </ImageModalContent>
        </ImageModalOverlay>
      )}

    </PageWrapper>
  );
} 