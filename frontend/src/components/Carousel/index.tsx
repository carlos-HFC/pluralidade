import { useEffect, useRef, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

import Img1 from '../../assets/img1.jpg';
import Img2 from '../../assets/img2.jpg';
import Img3 from '../../assets/img3.jpg';
import Img4 from '../../assets/img4.jpg';
import Img5 from '../../assets/img5.jpg';
import Img6 from '../../assets/img6.jpg';
import Img7 from '../../assets/img7.jpg';

import * as S from './style';

const images = [
  {
    img: Img1,
    alt: "Aula de matemática da classe",
  },
  {
    img: Img2,
    alt: "Mulher mostrando algo em seu notebook para demais pessoas",
  },
  {
    img: Img3,
    alt: "Professor explicando conteúdo com um slide",
  },
  {
    img: Img4,
    alt: "Auditório cheio com um slide sobre jogos",
  },
  {
    img: Img5,
    alt: "Roda de conversas conduzida por uma professora",
  },
  {
    img: Img6,
    alt: "Pessoas em seus notebooks digitando",
  },
  {
    img: Img7,
    alt: "Professor explicando conteúdo em uma sala de aula",
  },
].sort(() => Math.random() - .5);

export function Carousel() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    clearTimeout(timerRef.current as NodeJS.Timeout);

    timerRef.current = setTimeout(() => handleChangeImage('next'), 5000);

    return () => clearTimeout(timerRef.current as NodeJS.Timeout);
  }, [index]);

  function handleChangeImage(direction: 'prev' | 'next') {
    if (direction === 'next') {
      index === images.length - 1 ? setIndex(0) : setIndex(index + 1);
    }
    if (direction === 'prev') {
      index === 0 ? setIndex(images.length - 1) : setIndex(index - 1);
    }
  }

  return (
    <S.Slider aria-label="Show institute's images" aria-roledescription="carousel">
      <S.Prev>
        <button onClick={() => handleChangeImage('prev')} aria-label="Previous Slide" aria-controls="carousel-items">
          <BsChevronCompactLeft />
        </button>
      </S.Prev>
      <S.Images id="carousel-items" aria-live="off">
        {images.map((image, i) => (
          <S.Image key={i} role="group" aria-roledescription="slide" active={i === index} aria-label={`Image ${i + 1} of ${images.length}`}>
            <img src={image.img} alt={image.alt} loading="lazy" draggable="false" />
          </S.Image>
        ))}
      </S.Images>
      <S.Dots>
        {images.map((_, i) => (
          <S.Dot key={i} role="tablist" active={i === index} onClick={() => setIndex(i)} aria-current={i === index && "true"} aria-label={`Slide ${i + 1}`} />
        ))}
      </S.Dots>
      <S.Next>
        <button onClick={() => handleChangeImage('next')} aria-label="Next Slide" aria-controls="carousel-items">
          <BsChevronCompactRight />
        </button>
      </S.Next>
    </S.Slider>
  );
}