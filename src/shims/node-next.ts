import { getRuntime } from '../_shims/node20-runtime';
import { setShims } from '../_shims/registry';

setShims(getRuntime());
