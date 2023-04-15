import { readFileSync, existsSync } from 'fs';
import { parse } from 'yaml';
import { log } from '#src/lib/log';
import appRootPath from 'app-root-path';

const { resolve } = appRootPath;

const getFromFile = (file) => {
  if (existsSync(file)) {
    const config = parse(readFileSync(file, 'utf8'));
    log.info('config file found :', file);
    return config;
  }
  log.error(file, 'not found');
  return undefined;
};

const getAvailableFile = (yamlfile, fallBackFiles = []) => {
  /*
  const processedFiles = [yamlfile, ...fallBackFiles];
  console.log('process files', processedFiles);
  processedFiles.map((file) => {
    processedFiles.push(resolve(file));
    return file;
  });
  */

  const processedFiles = [...fallBackFiles, yamlfile].map((file) => {
    const resolvedFile = resolve(file);
    console.log('resolved file:', resolvedFile);
    return resolvedFile;
  });

  const foundedFile = processedFiles.find((file) => existsSync(file));
  console.log('foundedFile', foundedFile);
  return foundedFile;
};

export default (yamlFile, options) => {
  console.log('option', options);
  if (options && !options?.fallBack) {
    throw new Error('fallBack option not found');
  } else {
    const foundedFile = getAvailableFile(yamlFile, options?.fallBack || '');
    if (foundedFile) return getFromFile(foundedFile);
    throw new Error('No YAML file was founded');
  }
};
