interface ServerDataConfig<ServerResponse extends {}> {
  fetch: () => Promise<ServerResponse>;
}

export class ServerData<ServerResponse extends {}> {
  private response: ServerResponse | undefined;
  private fetchPromise: Promise<ServerResponse> | undefined;
  private fetchError: Promise<any> | undefined;

  constructor(private readonly config: ServerDataConfig<ServerResponse>) {
    this.wrapFetch();
  }

  private async wrapFetch(force: boolean = false): Promise<void> {
    if (!this.response || force) {
      this.fetchPromise = this.config.fetch().then(
        (result) => this.onFetchPromiseResult(result),
        (error) => (this.fetchError = error)
      );
    }
  }

  private onFetchPromiseResult(result: ServerResponse): void {
    this.response = result;
    this.fetchPromise = undefined;
  }

  public get(): ServerResponse {
    if (this.fetchError) {
      throw this.fetchError;
    } else if (this.fetchPromise) {
      throw this.fetchPromise;
    }
    return this.response ?? ({} as ServerResponse);
  }

  public async refresh(force: boolean = false): Promise<void> {
    await this.wrapFetch(force);
  }
}
