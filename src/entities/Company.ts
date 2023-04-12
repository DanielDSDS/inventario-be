import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nit: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @ManyToOne(() => User, (user) => user.companies)
  user: User;

  @OneToMany(() => Product, (product) => product.company)
  products: Product[];
}
