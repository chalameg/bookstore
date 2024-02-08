import { Tag } from "./Tag";

export interface Book{
    id: number;
    title: string;
    writer: string;
    cover_image_url: string;
    point: number;
    tags: Tag[]
}