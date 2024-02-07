import { Router, Request, Response } from 'express';
import { TagService } from '../services/tagService';

const router = Router();
const tagService = new TagService();

router.get('/', async (req: Request, res: Response) => {
  try {
    const tags = await tagService.getAllTags();
    res.json(tags);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const tag = await tagService.getTagById(id);
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).send('Tag not found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const tag = await tagService.createTag(req.body);
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const updatedTag = await tagService.updateTag(id, req.body);
    if (updatedTag) {
      res.json(updatedTag);
    } else {
      res.status(404).send('Tag not found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await tagService.deleteTag(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

export default router;
