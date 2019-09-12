export interface ConnectorConfig {
  id: string;
}

export interface BroadcastMessage {
  message: string;
}

export abstract class Connector<Config extends ConnectorConfig = ConnectorConfig> {
  protected readonly id: string;

  constructor(config: Config) {
    this.id = config.id;
  }

  public abstract broadcast<Message extends BroadcastMessage>(message: Message): any;

  public getId() {
    return this.id;
  }
}

export default Connector;
