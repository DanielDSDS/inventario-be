import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import { Company } from "./Company";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  email?: string;

  @Column()
  password?: string;

  @Column()
  role?: string;

  @OneToMany(() => Company, (company) => company.user)
  companies?: Company[];
}
