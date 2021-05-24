import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { Role } from './role.model';

@Seeder({
  model: Role,
  runOnlyIfTableIsEmpty: true
})
export class SeedRole implements OnSeederInit {
  run() {
    return [
      { type: "Aluno" },
      { type: "Admin" },
    ];
  }
}