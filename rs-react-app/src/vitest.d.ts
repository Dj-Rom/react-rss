import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'

declare global {
    namespace Vi {
        interface Assertion extends TestingLibraryMatchers<any, void> {}
    }

    var IS_REACT_ACT_ENVIRONMENT: boolean
}