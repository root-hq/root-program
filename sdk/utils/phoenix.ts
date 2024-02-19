export const getMarketAccountSize = (
  numOrdersPerSide: number,
  numSeats: number
): number => {
  const MARKET_HEADER_SIZE = 576;

  let totalSize = MARKET_HEADER_SIZE;

  if (numOrdersPerSide === 512 && numSeats === 128) {
    totalSize += 84368;
    return totalSize;
  } else if (numOrdersPerSide === 512 && numSeats === 1025) {
    totalSize += 213536;
    return totalSize;
  } else if (numOrdersPerSide === 512 && numSeats === 1153) {
    totalSize += 231968;
    return totalSize;
  } else if (numOrdersPerSide === 1024 && numSeats === 128) {
    totalSize += 149904;
    return totalSize;
  } else if (numOrdersPerSide === 1024 && numSeats === 2049) {
    totalSize += 426528;
    return totalSize;
  } else if (numOrdersPerSide === 1024 && numSeats === 2177) {
    totalSize += 444960;
    return totalSize;
  } else if (numOrdersPerSide === 2048 && numSeats === 128) {
    totalSize += 280976;
    return totalSize;
  } else if (numOrdersPerSide === 2048 && numSeats === 4097) {
    totalSize += 852512;
    return totalSize;
  } else if (numOrdersPerSide === 2048 && numSeats === 4225) {
    totalSize += 870944;
    return totalSize;
  } else if (numOrdersPerSide === 4096 && numSeats === 128) {
    totalSize += 543120;
    return totalSize;
  } else if (numOrdersPerSide === 4096 && numSeats === 8193) {
    totalSize += 1704480;
    return totalSize;
  } else if (numOrdersPerSide === 4096 && numSeats === 8321) {
    totalSize += 1722912;
    return totalSize;
  }

  return 0;
};
