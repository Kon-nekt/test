module.exports = class Words {
  constructor(comments) {
    this.popularWords = this.MapToObj(this.getWordsMap(comments));
  }

  getWordsMap(comments) {
    let popWords = new Map();
    //Разбиваем каждый body на слова и создаем коллекцию где считаем их
    comments.forEach((element) => {
      let sentence = element.body.split(/[\s\n]/);
      sentence.forEach((word) => {
        if (popWords.has(word)) popWords.set(word, popWords.get(word) + 1);
        else popWords.set(word, 1);
      });
    });
    let orderedWords = new Map(
      [...popWords.entries()].sort((a, b) => b[1] - a[1])
    );
    return orderedWords;
  }

  MapToObj(Map) {
    let obj = Object.create(null);
    let keys = Array.from(Map.keys());
    for (let i = 0; i < 5; i++) {
      obj[keys[i]] = Map.get(keys[i]);
    }
    return obj;
  }

  getPopularWords() {
    return this.popularWords;
  }
};
