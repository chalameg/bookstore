import { Router, Request, Response } from 'express';
import { TagService } from '../services/tagService';

const router = Router();
const tagService = new TagService();

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Tag management
 */

/**
 * @swagger
 * /api/tags:
 *   get:
 *     summary: Retrieves all tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: A list of tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 *       500:
 *         description: Internal Server Error
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const tags = await tagService.getAllTags();
    res.json(tags);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

/**
 * @swagger
 * /api/tags/{id}:
 *   get:
 *     summary: Retrieves a tag by its ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The tag ID
 *     responses:
 *       200:
 *         description: A single tag
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /api/tags:
 *   post:
 *     summary: Creates a new tag
 *     tags: [Tags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       201:
 *         description: Tag created successfully
 *       500:
 *         description: Internal Server Error
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const tag = await tagService.createTag(req.body);
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

/**
 * @swagger
 * /api/tags/{id}:
 *   put:
 *     summary: Updates an existing tag
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The tag ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       200:
 *         description: Tag updated successfully
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /api/tags/{id}:
 *   delete:
 *     summary: Deletes a tag
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The tag ID
 *     responses:
 *       204:
 *         description: Tag deleted successfully
 *       500:
 *         description: Internal Server Error
 */
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
