import { IsArray, IsDecimal, IsNotEmpty, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    writer: string;

    @IsNotEmpty()
    @IsUrl()
    cover_image_url: string;

    @IsNotEmpty()
    point: number;

    @IsArray()
    tags: number[]; // Array of tag IDs
}
