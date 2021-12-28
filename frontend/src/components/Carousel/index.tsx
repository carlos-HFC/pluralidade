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

const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7].sort(() => Math.random() - .5);

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
    <S.Slider>
      <S.Prev>
        <button onClick={() => handleChangeImage('prev')} title="Imagem anterior">
          <BsChevronCompactLeft />
        </button>
      </S.Prev>
      <S.Images>
        {images.map((image, i) => (
          <S.Image key={i} title={`Imagem do carrossel #${i + 1}`} active={i === index}>
            <img src={image} alt={`Carousel banner ${i + 1}`} loading="lazy" />
          </S.Image>
        ))}
      </S.Images>
      <S.Dots>
        {images.map((_, i) => <S.Dot key={i} title={`Dot #${i + 1}`} active={i === index} onClick={() => setIndex(i)} />)}
      </S.Dots>
      <S.Next>
        <button onClick={() => handleChangeImage('next')} title="Imagem seguinte">
          <BsChevronCompactRight />
        </button>
      </S.Next>
    </S.Slider>
  );
}