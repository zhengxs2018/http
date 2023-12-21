import { getRuntime } from '../_shims/node18-runtime';
import { setShims } from '../_shims/registry';

setShims(getRuntime());
