export interface ConnectorConfig {
  name: string;
}

export interface BroadcastMessage {
  message: string;
}

export abstract class Connector<Config extends ConnectorConfig = ConnectorConfig> {
  protected readonly name: string;

  constructor(config: Config) {
    this.name = config.name;
  }

  public abstract broadcast<Message extends BroadcastMessage>(message: Message): any;

  public getName() {
    return this.name;
  }
}

export default Connector;
