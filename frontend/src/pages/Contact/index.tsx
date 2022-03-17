import { AxiosError } from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { BsEnvelope, BsHouse, BsPhone } from 'react-icons/bs';

import { Button, InputBlock, Textarea, Title } from '../../components';
import { useLoader } from '../../context';
import { api } from '../../services/api';
import { Alert } from '../../utils';

import { ContactContainer, ContactData, ContactInfo } from './style';

const INITIAL_STATE_CONTACT = {
  name: "",
  email: "",
  description: "",
};

export function Contact() {
  const { handleLoader } = useLoader();

  const [contact, setContact] = useState(INITIAL_STATE_CONTACT);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setContact({ ...contact, [e.target.name]: e.target.value });
  }

  async function sendMessage(e: FormEvent) {
    e.preventDefault();

    handleLoader(true);
    try {
      await api.post('/solicitations', contact);

      Alert('Mensagem enviada com sucesso!!', 'success');

      setContact(INITIAL_STATE_CONTACT);
    } catch (error) {
      const message = typeof (error as AxiosError).response?.data.message === 'string'
        ? (error as AxiosError).response?.data.message
        : (error as AxiosError).response?.data.message[0];

      Alert(message, 'error');
    } finally {
      handleLoader(false);
    }
  }

  return (
    <>
      <Title title="Contate-nos" />
      <ContactContainer>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7314.096862684385!2d-46.639497!3d-23.566704!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59a33f9666e3%3A0xda9e218caa168b75!2sR.%20Maestro%20Cardim%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1640707688869!5m2!1spt-BR!2sbr" loading="lazy" />

        <div className="row gap-5 gap-lg-0">
          <ContactData as="form" className="col-lg-8 col-12" onSubmit={sendMessage} noValidate autoComplete="off">
            <div className="row gap-3 gap-lg-0">
              <div className="col-lg-6 col-12">
                <InputBlock label="Nome" title="Insira seu nome" id="nameContact"
                  name="name" value={contact.name} onChange={handleChange}
                />
              </div>
              <div className="col-lg-6 col-12">
                <InputBlock label="E-mail" type="email" title="Insira seu e-mail" id="emailContact"
                  name="email" value={contact.email} onChange={handleChange}
                />
              </div>
            </div>
            <Textarea label="Descrição" title="Insira sua descrição" id="descriptionContact"
              name="description" value={contact.description} onChange={handleChange}
            />
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </ContactData>
          <ContactData className="col-lg-4 col-12" as="address">
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
                <a href="mailto:contato@institutopluralidade.org.br">contato@institutopluralidade.org.br</a>
                <span>Envie-nos sua mensagem a qualquer momento!</span>
              </div>
            </ContactInfo>
          </ContactData>
        </div>
      </ContactContainer>
    </>
  );
}