export interface ICaseOf<T> {
  readonly just: (T) => any;
  readonly nothing: () => any;
}

export default class Maybe<T> {
  constructor(private readonly data: T | null) {
  }

  public caseOf(caseOf: ICaseOf<T>): any {
    if (this.data === null) {
      return caseOf.nothing();
    } else {
      return caseOf.just(this.data);
    }
  }

  public isNothing(): boolean {
    return this.data === null;
  }

  public getData(): T {
    if (this.data === null) {
      throw Error("Getting data from Maybe that's null.");
    }

    return this.data;
  }
}
