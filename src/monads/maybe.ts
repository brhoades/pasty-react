export interface ICaseOf<T> {
  readonly just: (T) => void;
  readonly nothing: () => void;
}

export default class Maybe<T> {
  constructor(private readonly data: T | null) {
  }

  public caseOf(caseOf: ICaseOf<T>): void {
    if (this.data === null) {
      caseOf.nothing();
    } else {
      caseOf.just(this.data);
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
