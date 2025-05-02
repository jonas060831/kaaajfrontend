import { FC, JSX, useEffect, useState } from 'react';
import Button from '../Controls/buttons/Button';
import Icon from '../Icon/Icon';

type MultiPageContainerProps = {
  pages: JSX.Element[];
  name: string;
  functionOne?: (fn: () => void) => void;
};

const MultiPageContainer: FC<MultiPageContainerProps> = ({ pages, name, functionOne }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {

    setCurrentPage((prev) => {
      const newPage = (prev + 1) % pages.length;
      return newPage;
    });
  };

  const handlePrevious = () => {

    setCurrentPage((prev) => {
      const newPage = (prev - 1) % pages.length;
      return newPage;
    });
  };
  


  useEffect(() => {
    if (functionOne) functionOne(handleNext);
  }, [functionOne]); // better practice


  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <div
        style={{
            display: 'flex',
            width: `${pages.length * 100}%`,
            transform: `translateX(-${currentPage * (100 / pages.length)}%)`,
            transition: 'transform 0.3s ease-in-out',
        }}
      >
        {pages.map((page, index) => (
            <div
             key={index}
             style={{
              width: `${100 / pages.length}%`, // this makes each child page exactly fit
              flexShrink: 0,
             }}
            >
                {page}
            </div>
        ))}
      </div>

      {(name === 'createFirstAd' && currentPage !== 0 && currentPage !== 3) && (
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button
            title="Previous"
            onClick={handlePrevious}
            icon={<></>}
          />
          <Button
            title="Next"
            onClick={handleNext}
            icon={<></>}
          />
        </div>
      )}
    </div>
  );
};

export default MultiPageContainer;