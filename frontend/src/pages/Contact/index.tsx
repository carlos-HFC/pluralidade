import { BsEnvelope, BsHouse, BsPhone } from 'react-icons/bs';

import { Button, InputBlock, Textarea, Title } from '../../components';

import { ContactContainer, ContactData, ContactInfo } from './style';

export function Contact() {
  return (
    <>
      <Title title="Contate-nos" />
      <ContactContainer className="container">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7314.096862684385!2d-46.639497!3d-23.566704!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59a33f9666e3%3A0xda9e218caa168b75!2sR.%20Maestro%20Cardim%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1640707688869!5m2!1spt-BR!2sbr" title="Mapa com a localização do Instituto Pluralidade" loading="lazy" />

        <div className="row">
          <ContactData as="form" className="col-md-8 col-12">
            <div className="row">
              <div className="col-md-6 col-12">
                <InputBlock label="Nome" />
              </div>
              <div className="col-md-6 col-12">
                <InputBlock label="E-mail" type="email" />
              </div>
            </div>
            <Textarea label="Descrição" />
            <Button variant="primary">
              Enviar
            </Button>
          </ContactData>
          <ContactData className="col-md-4 col-12">
            <ContactInfo>
              <div>
                <BsHouse />
              </div>
              <div>
                <span>Rua Maestro Cardim, 000</span>
                <span>Bela Vista, São Paulo - SP</span>
              </div>
            </ContactInfo>
            <ContactInfo>
              <div>
                <BsPhone />
              </div>
              <div>
                <span>+55 11 98451 7815</span>
                <span>Seg a Sex, das 7h as 20h</span>
              </div>
            </ContactInfo>
            <ContactInfo>
              <div>
                <BsEnvelope />
              </div>
              <div>
                <span>contato@institutopluralidade.org.br</span>
                <span>Envie-nos sua mensagem a qualquer momento!</span>
              </div>
            </ContactInfo>
          </ContactData>
        </div>
      </ContactContainer>
    </>
  );
}