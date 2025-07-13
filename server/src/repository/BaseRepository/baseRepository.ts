import { Model } from "mongoose";
import { IBaseRepository } from "../../interfaces/IBaseRepository/IBaseRepository";

export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(private _model: Model<T>) {
    this._model = _model;
  }

  async save(item:Partial<T>): Promise<T | null> {
    try {
      const newItem = new this._model(item);
      await newItem.save();
      return newItem as T;
    } catch (error) {
      console.log(
        "Error in BaseRepository while  saving the data :",
        error as Error
      );
      throw error;
    }
  }
}
