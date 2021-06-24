import { getConnectionOptions, getConnection } from 'typeorm';
import * as argon from 'argon2';

export const toPromise = <T>(data: T): Promise<T> => {
  return new Promise<T>((resolve) => {
    resolve(data);
  });
};

export const getDbConnectionOptions = async (connectionName = 'default') => {
  const options = await getConnectionOptions(
    process.env.NODE_ENV || 'development',
  );
  return {
    ...options,
    name: connectionName,
  };
};

export const getDbConnection = async (connectionName = 'foodzup') => {
  return await getConnection(connectionName);
};

export const runDbMigrations = async (connectionName = 'foodzup') => {
  const conn = await getDbConnection(connectionName);
  await conn.runMigrations();
};

export const comparePasswords = async (userPassword, currentPassword) => {
  console.log({ userPassword, currentPassword });

  return await argon.verify(userPassword, currentPassword);
};
