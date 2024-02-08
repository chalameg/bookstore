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
        description: "A list of tags associated with the book.",
      },
    },
  },
};


export const customerSchema = {
  Customer: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The customer ID."
      },
      username: {
        type: "string",
        description: "The username of the customer."
      },
      points: {
        type: "number",
        description: "The points accumulated by the customer."
      }
    },
    required: ["username", "points"]
  }
};
