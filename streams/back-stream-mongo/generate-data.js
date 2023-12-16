import { createWriteStream } from 'node:fs'
import { faker } from '@faker-js/faker'

const writeStream = createWriteStream("./data/import.csv");

writeStream.write("name,email,age,salary,isActive\n");

for (let i = 0; i < 100000; i++) {
  const firstName = faker.name.firstName();
  const email = faker.internet.email(firstName);
  const age = ~~(Math.random() * 100);
  const salary = faker.finance.amount();
  const active = faker.datatype.boolean();

  const data = [
    firstName,
    email,
    age,
    salary,
    active
  ];
  writeStream.write(data.join(",").concat("\n"));
}

writeStream.end();