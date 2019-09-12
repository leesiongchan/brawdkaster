import Connector, { BroadcastMessage } from './connectors/connector';
import allSettled from 'promise.allsettled';

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

  public async broadcast<T extends BroadcastMessage>(message: T, options: BrawdkasterOptions = {}) {
    const connectors = !!options.only
      ? this.connectors.filter(connector => options.only!.includes(connector.getId()))
      : this.connectors;
    const broadcastPromises = connectors.map(connector => connector.broadcast(message));
    const results = await allSettled(broadcastPromises);

    return results.map((result, index) => ({
      [connectors[index].getId()]: result.status === 'fulfilled' ? result.value : result.reason,
    }));
  }
}

export default Brawdkaster;
