import { Tokenizer, IpadicFeatures, builder } from "kuromoji";

export default class Analyzer {
  _analyzer: Tokenizer<IpadicFeatures> | null = null;
  init() {
    return new Promise((resolve, reject) => {
      builder({ dicPath: `dict/` }).build((error, tokenizer) => {
        if (error) reject(error);
        else {
          this._analyzer = tokenizer;

          resolve(true);
        }
      });
    });
  }
  parse(string = "") {
    if (string.trim() === "") return [];

    return this._analyzer!.tokenize(string);
  }
}
