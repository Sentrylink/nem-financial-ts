#!/usr/bin/env ts-node

import * as Vars from './vars';

const program = require('commander');

program
  .version('0.0.1')
  .description('Financial instruments for the NEM blockchain.')

program.parse(process.argv)
