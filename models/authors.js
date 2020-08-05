module.exports = class authors {
  constructor(comments) {
    this.author = [...this.getAuthorsMap(comments)].reduce((a, e) =>
      e[1] > a[1] ? e : a
    );
  }

  getAuthorsMap(comments) {
    let authors = new Map();
    comments.forEach((element) => {
      if (authors.has(element.email))
        authors.set(element.email, authors.get(element.email) + 1);
      else authors.set(element.email, 1);
    });
    return authors;
  }
  getAuthor() {
    return this.author;
  }
};
