export const bookSchema = {
    Book: {
      type: "object",
      required: ["title", "author"],
      properties: {
        id: { type: "integer", description: "The book ID." },
        title: { type: "string", description: "The title of the book." },
        writer: { type: "string", description: "The writer of the book." },
        cover_image_url: { type: "string", description: "cover image path." },
        point: { type: "number", description: "price of the book." },
        tags: {
          type: "array",
          items: { type: "integer" },
          description: "A list of tags associated with the book."
        }
      },
    },
  };
  
  