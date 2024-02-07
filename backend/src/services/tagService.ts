import { TagRepository } from "../repositories/tagRepository";
import { Tag } from "../entities/Tag";

export class TagService {
  private tagRepository: TagRepository;

  constructor() {
    this.tagRepository = new TagRepository();
  }

  async getAllTags(): Promise<Tag[]> {
    return this.tagRepository.findAll();
  }

  async getTagById(id: number): Promise<Tag | null> {
    return this.tagRepository.findById(id);
  }

  async createTag(tagDetails: Partial<Tag>): Promise<Tag> {
    return this.tagRepository.create(tagDetails);
  }

  async updateTag(id: number, tagDetails: Partial<Tag>): Promise<Tag | null> {
    return this.tagRepository.update(id, tagDetails);
  }

  async deleteTag(id: number): Promise<void> {
    return this.tagRepository.delete(id);
  }
}
