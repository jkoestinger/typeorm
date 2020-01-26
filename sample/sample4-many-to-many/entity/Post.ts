import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "../../../src/index.ts";
import {PostDetails} from "./PostDetails.ts";
import {PostCategory} from "./PostCategory.ts";
import {PostAuthor} from "./PostAuthor.ts";
import {PostInformation} from "./PostInformation.ts";
import {PostImage} from "./PostImage.ts";
import {PostMetadata} from "./PostMetadata.ts";
import {JoinTable} from "../../../src/decorator/relations/JoinTable.ts";

@Entity("sample4_post")
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: String })
    title: string;

    @Column({ type: String })
    text: string;

    // Post has relation with PostCategory, however inverse relation is not set
    // (category does not have relation with post set)
    @ManyToMany(type => PostCategory, {
        cascade: true
    })
    @JoinTable()
    categories: PostCategory[];

    // Post has relation with PostDetails. Cascade insert here means if there is a new PostDetails instance set
    // on this relation, it will be inserted automatically to the db when you save this Post entity
    @ManyToMany(type => PostDetails, details => details.posts, {
        cascade: ["insert"]
    })
    @JoinTable()
    details: PostDetails[];

    // Post has relation with PostImage. Cascade update here means if there are changes to an existing PostImage, it
    // will be updated automatically to the db when you save this Post entity
    @ManyToMany(type => PostImage, image => image.posts, {
        cascade: ["update"]
    })
    @JoinTable()
    images: PostImage[];

    // Post has relation with PostMetadata. No cascades here means that when saving a Post entity, there will be
    // no creating/updating/destroying PostMetadata.
    @ManyToMany(type => PostMetadata, metadata => metadata.posts)
    @JoinTable()
    metadatas: PostMetadata[];

    // Post has relation with PostInformation. Full cascades here
    @ManyToMany(type => PostInformation, information => information.posts, {
        cascade: true
    })
    @JoinTable()
    informations: PostInformation[];

    // Post has relation with author. No cascades here means that when saving a Post entity, there will be
    // no creating/updating/destroying PostAuthor.
    @ManyToMany(type => PostAuthor, author => author.posts)
    @JoinTable()
    authors: PostAuthor[];

}
