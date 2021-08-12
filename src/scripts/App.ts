import ServiceManager from './service/ServiceManager.js';

const main = async () => {
  await ServiceManager.initialize();
};

void main();