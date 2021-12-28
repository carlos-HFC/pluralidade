import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';

@Seeder({
  model: 'Role',
  runOnlyIfTableIsEmpty: true
})
export class SeedRole implements OnSeederInit {
  run() {
    return [
      { name: "Admin" },
      { name: "Aluno" },
    ];
  }
}