import {Entity} from "../../../../src/decorator/entity/Entity.ts";
import {Column} from "../../../../src/decorator/columns/Column.ts";
import {PrimaryColumn} from "../../../../src/decorator/columns/PrimaryColumn.ts";

@Entity({ synchronize: false })
export class Album {

    @PrimaryColumn({ type: Number })
    id!: number;

    @Column({ type: String })
    name!: string;

}
