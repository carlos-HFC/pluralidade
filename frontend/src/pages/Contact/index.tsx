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
        <ContactData as="form" className="form" onSubmit={sendMessage} noValidate autoComplete="off">
          <div className="form__inputs">
            <InputBlock label="Nome" title="Insira seu nome" id="nameContact"
              name="name" value={contact.name} onChange={handleChange}
            />
            <InputBlock label="E-mail" type="email" title="Insira seu e-mail" id="emailContact"
              name="email" value={contact.email} onChange={handleChange}
            />
          </div>
          <Textarea label="Descrição" title="Insira sua descrição" id="descriptionContact"
            name="description" value={contact.description} onChange={handleChange}
          />
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </ContactData>
        <ContactData as="address" className="contact">
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
      </ContactContainer>
    </>
  );
}