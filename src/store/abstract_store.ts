export abstract class AbstractStore<Data extends {}, AdaptedData extends {}> {
  private currentData: Data;

  constructor(private readonly initialData: Data) {
    this.currentData = initialData;
  }

  public reset(): void {
    this.currentData = this.initialData;
  }

  public produceNewData(producer: (currentData: Data) => Data): void {
    this.currentData = producer(this.currentData);
  }

  public getCurrentDataAdapted(): AdaptedData {
    return this.adaptData(this.currentData);
  }

  protected abstract adaptData(data: Data): AdaptedData;
}
