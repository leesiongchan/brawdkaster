import Connector, { BroadcastMessage } from './connectors/connector';

interface BrawdkasterConfig {
  connectors: Connector[];
}

interface BrawdkasterOptions {
  only?: string[];
}

class Brawdkaster {
  private readonly connectors: Connector[];

  constructor(config: BrawdkasterConfig) {
    this.connectors = config.connectors;
  }

  public broadcast<T extends BroadcastMessage>(message: T, options: BrawdkasterOptions = {}) {
    const broadcastPromises = this.connectors.map(connector => connector.broadcast(message));

    return Promise.all(broadcastPromises);
  }
}

export default Brawdkaster;
