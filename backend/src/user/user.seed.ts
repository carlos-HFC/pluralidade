import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';

@Seeder({
  model: 'User',
  unique: ['email', 'cpf'],
  runOnlyIfTableIsEmpty: true,
})
export class SeedUser implements OnSeederInit {
  run() {
    return [
      {
        name: "Carlos Henrique Faustino Cardoso",
        email: "chfcchfc96@gmail.com",
        emailVerified: true,
        password: "123456789",
        birthday: "1996-12-21",
        cpf: "75315711021",
        gender: "M",
        cep: "05367000",
        address: "Rua Narciso Freitas Vieira, 04",
        district: "Jardim dos Cataldis",
        city: "São Paulo",
        uf: "SP",
        phone: "11952109660",
        deficient: false,
        roleId: 1
      },
      {
        name: "Pedro Ferreira Candido",
        email: "pedroferreira_@teste.com",
        emailVerified: true,
        password: "123456789",
        birthday: "1997-05-09",
        cpf: "45608130006",
        gender: "M",
        cep: "03189160",
        address: "Rua Cipriana Martinez Zonta, 17",
        district: "Vila Oratório",
        city: "São Paulo",
        uf: "SP",
        phone: "1123456543",
        deficient: false,
        roleId: 2
      },
    ];
  }
}

