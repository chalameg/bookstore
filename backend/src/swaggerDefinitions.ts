export const bookSchema = {
    Book: {
      type: "object",
      required: ["title", "author"],
      properties: {
        id: { type: "integer", description: "The book ID." },
        title: { type: "string", description: "The title of the book." },
        author: { type: "string", description: "The author of the book." },
        publishedYear: { type: "integer", description: "The year the book was published." },
        genres: {
          type: "array",
          items: { type: "string" },
          description: "A list of genres associated with the book."
        }
      },
    },
  };
  
  