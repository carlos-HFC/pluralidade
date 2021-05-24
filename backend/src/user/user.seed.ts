import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';

import { User } from './user.model';

@Seeder({
  model: User,
  unique: ['email', 'cpf', 'rg'],
  runOnlyIfTableIsEmpty: true
})
export class SeedUser implements OnSeederInit {
  run() {
    return [
      {
        name: "Carlos Henrique Faustino Cardoso",
        email: "chfcchfc96@gmail.com",
        password: "123456789",
        birthday: "1996-12-21",
        cpf: "42391786816",
        rg: "385716886",
        gender: "M",
        cep: "02275060",
        address: "Travessa Vera Lucia Lourenço Fita",
        number: "02",
        complement: "Casa 2",
        district: "Vila Germinal",
        city: "São Paulo",
        uf: "SP",
        phone: "11952109660",
        deficient: false,
        roleId: 2
      },
      {
        name: "Pedro Ferreira Candido",
        email: "pedroferreirac@hotmail.com",
        password: "123456789",
        birthday: "1997-05-09",
        cpf: "99053881093",
        rg: "429719723",
        gender: "M",
        cep: "03189160",
        address: "Rua Cipriana Martinez Zonta",
        number: "28",
        district: "Vila Oratório",
        city: "São Paulo",
        uf: "SP",
        phone: "11934114411",
        deficient: false,
        roleId: 1
      },
      {
        name: "Analu Daniela Cavalcanti",
        email: "faustino.chfc@gmail.com",
        password: "123456789",
        birthday: "2001-08-22",
        cpf: "37141108017",
        rg: "161572479",
        gender: "F",
        cep: "03430050",
        address: "Rua Valentim Xavier",
        number: "422",
        district: "Vila Carrão",
        city: "São Paulo",
        uf: "SP",
        phone: "11991041467",
        deficient: false,
        roleId: 1
      },
    ];
  }
}

