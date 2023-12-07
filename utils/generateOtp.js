const generateOtp = () => {
  // const messageID = 'kFUwfusCq/+'
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `kFUwfusCq/+ ${digits}`;
}

module.exports = generateOtp;
