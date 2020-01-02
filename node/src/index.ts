#!/usr/bin/env ts-node

import * as APTypes from './types';

const commander = require('commander');
const program = new commander.Command();

program
  .version('0.0.1')
  .description('Financial instruments for the NEM blockchain.')
  .option('-d, --debug', 'output extra debugging')

program.parse(process.argv)

if (program.debug) console.log(program.opts());
