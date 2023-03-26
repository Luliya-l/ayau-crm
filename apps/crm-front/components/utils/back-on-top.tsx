import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const BackOnTop = (): JSX.Element => {
  const [isDown, setIsDown] = useState(false);
  const handleScroll = (): void => {
    if (scrollY > 20) {
      setIsDown(true);
    } else {
      setIsDown(false);
    }
  };
  const backOnTop = (): void => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  return (
    <>
      <Button
        variant='back-on-top'
        type="button"
        onClick={backOnTop}
        className={`${
          !isDown ? 'd-none' : ''
        } rounded-circle btn-floating btn-lg m-0 p-0 position-fixed`}
        style={{ right: '10%', bottom: '100px', zIndex: '9999', width: '55px', height: '55px' }}
      >
        <i className="bi bi-arrow-up"></i>
      </Button>
    </>
  );
};

export default BackOnTop;
