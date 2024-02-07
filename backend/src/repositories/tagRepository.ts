import { AppDataSource } from "../data-source";
import { Tag } from "../entities/Tag";

export class TagRepository {
  async findAll(): Promise<Tag[]> {
    const tagRepository = AppDataSource.getRepository(Tag);
    return tagRepository.find();
  }

  async findById(id: number): Promise<Tag | null> {
    const tagRepository = AppDataSource.getRepository(Tag);
    return tagRepository.findOneBy({ id });
  }

  async create(tagDetails: Partial<Tag>): Promise<Tag> {
    const tagRepository = AppDataSource.getRepository(Tag);
    const tag = tagRepository.create(tagDetails);
    return tagRepository.save(tag);
  }

  async update(id: number, tagDetails: Partial<Tag>): Promise<Tag | null> {
    const tagRepository = AppDataSource.getRepository(Tag);
    await tagRepository.update(id, tagDetails);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    const tagRepository = AppDataSource.getRepository(Tag);
    await tagRepository.delete(id);
  }
}
