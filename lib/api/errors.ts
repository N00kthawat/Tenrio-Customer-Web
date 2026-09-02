export class ApiError extends Error {
  public status: number;
  public data: Record<string, unknown>;

  constructor(status: number, data: Record<string, unknown>, message?: string) {
    const dataMessage = typeof data?.message === 'string' ? data.message : undefined;
    super(dataMessage || message || "API Error");
    this.status = status;
    this.data = data;
    this.name = "ApiError";
  }

  public get code(): string | undefined {
    return typeof this.data?.code === 'string' ? this.data.code : undefined;
  }
}
