export default abstract class AbstractNetClient {
  private static instances: Record<string, AbstractNetClient> = {};

  protected baseUrl = '';

  protected getLatency(availableRetryAttempts: number) {
    // Нужна какая-то убывающая функция, пусть пока будет такая
    return 500 * (1 / (availableRetryAttempts / 10));
  }

  public static getClient<NetClient extends AbstractNetClient>(
    Constrcuctable: new () => NetClient,
  ): NetClient {
    if (!this.instances[this.name]) {
      this.instances[this.name] = new Constrcuctable();
    }

    return <NetClient>this.instances[this.name];
  }
}
