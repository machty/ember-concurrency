import DOMAssertions from './assertions';
declare global {
    interface Assert {
        dom(target?: string | Element | null, rootElement?: Element): DOMAssertions;
    }
}
