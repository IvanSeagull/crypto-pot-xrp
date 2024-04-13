import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const Donut = buildModule('Donut', (m) => {
  const Donut = m.contract('Donut');

  return { Donut };
});

export default Donut;
