import { useEffect, useRef, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

import Img1 from '../../assets/img1.jpg';
import Img2 from '../../assets/img2.jpg';
import Img3 from '../../assets/img3.jpg';
import Img4 from '../../assets/img4.jpg';
import Img5 from '../../assets/img5.jpg';
import Img6 from '../../assets/img6.jpg';

import * as S from './style';

const images = [
  {
    img: Img1,
    alt: "Uma sala de aula cheia de alunos sentados em suas carteiras. Um professor, a frente da sala, está dando uma aula de matemática. Ele usa óculos, está com uma camisa verde escura e olhando para a lousa. A lousa está com 4 cálculos matemáticos diferentes e é iluminada por algumas luminárias próprias, presas no teto.",
  },
  {
    img: Img2,
    alt: "Um conjunto de seis pessoas reunidas. Uma mulher loira, com um suéter vinho, sorrindo e usando óculos, está sentada em uma cadeira onde, a sua frente, há uma mesa com um notebook. Uma mulher morena, utilizando uma blusa azul com detalhes em branco e verde, está sorrindo e apontando apontando para o notebook. Um homem moreno, com barba e bigode, vestindo uma camisa social azul escuro, está sentado ao lado da mulher sentada, também aponta para o notebook e sorri. Há uma mulher negra, atrás da mulher sentada com o notebook, de pé. Ela tem tranças no cabelo e está com uma camiseta cinza claro. Ao lado dela, há outra mulher, morena, utilizando uma camisa sozial listrada de branco e azul. Ela está de pé e sorrindo. Ao seu lado, um homem de barba grisalha, sorrindo e comemorando, está utilizando uma camisa sozial cinza.",
  },
  {
    img: Img3,
    alt: "Uma sala de aula cheia de alunos sentados em suas carteiras, enquanto há um professor em frente da sala explicando um conteúdo. O professor está com uma camisa social xadrez vermelha e azul. A sua frente, há um suporte onde está o notebook utilizado por ele. Na frente da sala, uma projeção da tela do notebook, mostrando uma notícia sobre a cidade de Las Vegas, em Nevada, nos EUA.",
  },
  {
    img: Img4,
    alt: "Um conjunto de cinco pessoas sentadas a mesa, todos com um notebook a sua frente. No centro da mesa, há um vaso de flores verdes. Do lado direito da mesa, há dois homens sentados. Um deles, de blusa marrom, tem uma garrafa plástica ao seu lado. Ao seu lado, o outro homem está com uma camiseta cinza, relógio preto e fones de ouvido branco, está conversando com ele. Na ponta da mesa, há uma pessoa onde aparece apenas os seus braços e está com um copo de vidro grande ao seu lado. Do lado esquerdo da mesa, há duas pessoas, uma mulher e um homem. O homem está com um headphone preto, camiseta cinza escuro e uma calça preta com listras brancas na lateral, além de um celular estar ao lado do notebook que ele utiliza. Ao seu lado, a mulher tem cabelos longos morenos e está com uma blusa cinza escuro e calça preta.",
  },
  {
    img: Img5,
    alt: "Um grupo de pessoas em uma sala. Da direira para esquerda, há um homem sentado, de pernas cruzadas. Ele veste uma camisa social azul escura, com uma calça jeans vinho e um tênis preto com cadarços laranjas. Ao seu lado, há outro homem, de óculos, algumas tatuagens em seus braços e barba cheia preta. Ele está com uma camiseta branco com algumas listras pretas, um jeans azul e um tênis preto com amarelo. Ele também segura uma pequena pasta azul em suas mãos. Seguindo para a esquerda, há um homem moreno, com uma camiseta azul clara e um blazer azul escuro e jeans preto. Também há um detalhe amarelo seu blazer, na altura do peito. Logo em seguida, um mulher com a mão esquerda no rosto. Ela tem cabelos castanhos, utiliza uma blusa cinza clara e tem algumas pulseiras em seu braço. Na mão direta, ela segura um copo. Ao seu lado, uma mulher, que também parece ser o foco da sala, tem cabelos castanhos claros. Ela está com uma camisa preta e uma blusinha branca por cima. Também está com um colar longo preto.",
  },
  {
    img: Img6,
    alt: "Pessoas em seus notebooks digitando",
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