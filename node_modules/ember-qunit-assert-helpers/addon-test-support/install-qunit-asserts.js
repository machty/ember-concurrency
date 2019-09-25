import installAssertion from './asserts/assertion';
import installDeprecationAssert from './asserts/deprecation';
import installRunLoopAssert from './asserts/run-loop';
import installWarningAssert from './asserts/warning';

installAssertion();
installDeprecationAssert();
installRunLoopAssert();
installWarningAssert();
