import axios from 'axios';
import { ChangeEvent, useRef, useState } from 'react';

import { Button, InputBlock, RadioButton, Select, Textarea } from '../../components';
import { useLoader } from "../../context";
import { Alert } from "../../utils";
import { birthdayMask, cepMask, cpfMask, phoneMask } from '../../utils/mask';

import { SignUp } from './style';

const INITIAL_STATE_REGISTER = {
  name: "",
  email: "",
  birthday: "",
  phone: "",
  cpf: "",
  gender: "",
  cep: "",
  address: "",
  number: "",
  district: "",
  city: "",
  uf: "",
  deficient: "false",
  whichDeficiency: ""
};

export function Register() {
  const { handleLoader } = useLoader();

  const addressRef = useRef<HTMLInputElement>(null);
  const districtRef = useRef<HTMLInputElement>(null);

  const [register, setRegister] = useState(INITIAL_STATE_REGISTER);

  async function searchCep() {
    if (!register.cep) return;

    handleLoader(true);
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${register.cep}/json/`);

      if (data.erro) return Alert("CEP inválido", "error");

      const { localidade: city, logradouro: address, bairro: district, uf } = data;

      setRegister({ ...register, city, address, district, uf });

      !addressRef.current?.value
        ? addressRef.current?.removeAttribute('disabled')
        : addressRef.current?.setAttribute('disabled', 'false');

      !districtRef.current?.value
        ? districtRef.current?.removeAttribute('disabled')
        : districtRef.current?.setAttribute('disabled', 'false');
    } catch (error) {
      Alert("CEP inválido", "error");
    } finally {
      handleLoader(false);
    }
  }

  function handleChangeRegister(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setRegister({ ...register, [e.target.name]: e.target.value });
  }

  return (
    <SignUp>
      <div className="signup">
        <h1>Cadastre-se</h1>

        <form noValidate>
          <InputBlock label="Nome" title="Insira seu nome" id="nameRegister"
            name="name" value={register.name} onChange={handleChangeRegister}
          />
          <InputBlock type="email" label="E-mail" title="Insira seu e-mail" id="emailRegister"
            name="email" value={register.email} onChange={handleChangeRegister}
          />
          <div className="col-half">
            <InputBlock label="CPF" title="Insira seu CPF" id="cpfRegister"
              name="cpf" value={cpfMask(register.cpf)} onChange={handleChangeRegister}
            />
            <InputBlock label="Telefone/Celular" title="Insira seu telefone/celular" id="phoneRegister"
              name="phone" value={phoneMask(register.phone)} onChange={handleChangeRegister}
            />
          </div>
          <div className="col-half">
            <InputBlock label="Data de Nascimento" title="Insira sua data de nascimento" id="birthdayRegister"
              name="birthday" value={birthdayMask(register.birthday)} onChange={handleChangeRegister}
            />
            <Select label="Gênero" id="genderRegister"
              name="gender" value={register.gender} onChange={handleChangeRegister}
            >
              <option defaultChecked disabled value="">Selecione o gênero</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outros</option>
            </Select>
          </div>
          <div className="col-threequarter">
            <InputBlock label="CEP" title="Insira seu CEP" id="cepRegister"
              name="cep" value={cepMask(register.cep)} onChange={handleChangeRegister} maxLength={9}
            />
            <Button block type="button" variant="primary" onClick={searchCep} disabled={!cepMask(register.cep) || cepMask(register.cep).length !== 9}>
              Consultar CEP
            </Button>
          </div>
          <InputBlock label="Endereço" title="Insira seu endereço" id="addressRegister" ref={addressRef} disabled
            name="address" value={register.address} onChange={handleChangeRegister}
          />
          <div className="col-threequarter">
            <InputBlock label="Bairro" title="Insira seu bairro" id="districtRegister" ref={districtRef} disabled
              name="district" value={register.district} onChange={handleChangeRegister}
            />
            <InputBlock label="Número" title="Insira seu número" id="numberRegister" maxLength={5}
              name="number" value={register.number.replace(/\D/g, '')} onChange={handleChangeRegister}
            />
          </div>
          <div className="col-threequarter">
            <InputBlock label="Cidade" title="Insira sua cidade" id="cityRegister" disabled
              name="city" value={register.city} onChange={handleChangeRegister}
            />
            <InputBlock label="UF" title="Insira sua UF" id="ufRegister" disabled
              name="uf" value={register.uf} onChange={handleChangeRegister}
            />
          </div>
          <div className="set__deficiency">
            <span>Tem deficiência?</span>
            <div>
              <RadioButton id="deficientTrueRegister" label="Sim" type="radio" title="Sim, tenho deficiência"
                name="deficient" checked={register.deficient === "true"} value="true" onChange={handleChangeRegister}
              />
              <RadioButton id="deficientFalseRegister" label="Não" type="radio" title="Não, não tenho deficiência"
                name="deficient" checked={register.deficient === "false"} value="false" onChange={handleChangeRegister}
              />
            </div>
            <Textarea label="Qual(is) deficiência(s)?" id="whichDeficiencyRegister" disabled={register.deficient === "false"} title="Insira sua(s) deficiência(s)"
              name="whichDeficiency" value={register.whichDeficiency} onChange={handleChangeRegister}
            />
          </div>
          <Button variant="primary" type="button">
            Cadastrar
          </Button>
        </form>
      </div >
    </SignUp >
  );
}