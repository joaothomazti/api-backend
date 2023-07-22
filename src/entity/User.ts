import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    fullName: string

    @Column({type: 'varchar', unique: true})
    username: string

    @Column({type: 'varchar', unique: true})
    email: string

    @Column({type: 'text'})
    password: string
}
