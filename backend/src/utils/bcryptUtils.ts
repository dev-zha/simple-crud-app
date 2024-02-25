import bcrypt from 'bcrypt';

// Hash password
export const hashData = async (data: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(data, salt);
};

// Verify password
export const compareHashData = async (data: string, hashedData: string) => {
  return bcrypt.compareSync(data, hashedData);
};
