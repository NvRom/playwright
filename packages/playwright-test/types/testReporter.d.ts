// This file is generated by /utils/generate_types/index.js
/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { FullConfig, FullProject, TestStatus, TestError } from '@playwright/test';
export type { FullConfig, TestStatus, TestError } from '@playwright/test';

/**
 * `Suite` is a group of tests. All tests in Playwright Test form the following hierarchy:
 * - Root suite has a child suite for each [TestProject].
 *   - Project suite #1. Has a child suite for each test file in the project.
 *     - File suite #1
 *       - [TestCase] #1
 *       - [TestCase] #2
 *       - Suite corresponding to a
 *         [test.describe(title, callback)](https://playwright.dev/docs/api/class-test#test-describe) group
 *         - [TestCase] #1 in a group
 *         - [TestCase] #2 in a group
 *       - < more test cases ... >
 *     - File suite #2
 *     - < more file suites ... >
 *   - Project suite #2
 *   - < more project suites ... >
 *
 * Reporter is given a root suite in the
 * [reporter.onBegin(config, suite)](https://playwright.dev/docs/api/class-reporter#reporter-on-begin) method.
 */
export interface Suite {
  /**
   * Configuration of the project this suite belongs to, or [void] for the root suite.
   */
  project(): FullProject | undefined;
  /**
   * Returns the list of all test cases in this suite and its descendants, as opposite to
   * [suite.tests](https://playwright.dev/docs/api/class-suite#suite-tests).
   */
  allTests(): Array<TestCase>;

  /**
   * Location in the source where the suite is defined. Missing for root and project suites.
   */
  location?: Location;

  /**
   * Parent suite, missing for the root suite.
   */
  parent?: Suite;

  /**
   * Child suites. See [Suite] for the hierarchy of suites.
   */
  suites: Array<Suite>;

  /**
   * Test cases in the suite. Note that only test cases defined directly in this suite are in the list. Any test cases
   * defined in nested [test.describe(title, callback)](https://playwright.dev/docs/api/class-test#test-describe) groups are
   * listed in the child [suite.suites](https://playwright.dev/docs/api/class-suite#suite-suites).
   */
  tests: Array<TestCase>;

  /**
   * Suite title.
   * - Empty for root suite.
   * - Project name for project suite.
   * - File path for file suite.
   * - Title passed to [test.describe(title, callback)](https://playwright.dev/docs/api/class-test#test-describe) for a
   *   group suite.
   */
  title: string;

  /**
   * Returns a list of titles from the root down to this suite.
   */
  titlePath(): Array<string>;

  /**
   * The list of files or buffers attached to the suite. Root suite has attachments populated by
   * [globalInfo.attach(name[, options])](https://playwright.dev/docs/api/class-globalinfo#global-info-attach).
   */
  attachments: Array<{
    /**
     * Attachment name.
     */
    name: string;

    /**
     * Content type of this attachment to properly present in the report, for example `'application/json'` or `'image/png'`.
     */
    contentType: string;

    /**
     * Optional path on the filesystem to the attached file.
     */
    path?: string;

    /**
     * Optional attachment body used instead of a file.
     */
    body?: Buffer;
  }>;}

/**
 * `TestCase` corresponds to every [test.(call)(title, testFunction)](https://playwright.dev/docs/api/class-test#test-call)
 * call in a test file. When a single
 * [test.(call)(title, testFunction)](https://playwright.dev/docs/api/class-test#test-call) is running in multiple projects
 * or repeated multiple times, it will have multiple `TestCase` objects in corresponding projects' suites.
 */
export interface TestCase {
  /**
   * Expected test status.
   * - Tests marked as [test.skip(title, testFunction)](https://playwright.dev/docs/api/class-test#test-skip-1) or
   *   [test.fixme(title, testFunction)](https://playwright.dev/docs/api/class-test#test-fixme-1) are expected to be
   *   `'skipped'`.
   * - Tests marked as [test.fail()](https://playwright.dev/docs/api/class-test#test-fail-1) are expected to be `'failed'`.
   * - Other tests are expected to be `'passed'`.
   *
   * See also [testResult.status](https://playwright.dev/docs/api/class-testresult#test-result-status) for the actual status.
   */
  expectedStatus: TestStatus;
  /**
   * The list of annotations applicable to the current test. Includes annotations from the test, annotations from all
   * [test.describe(title, callback)](https://playwright.dev/docs/api/class-test#test-describe) groups the test belongs to
   * and file-level annotations for the test file.
   *
   * Annotations are available during test execution through
   * [testInfo.annotations](https://playwright.dev/docs/api/class-testinfo#test-info-annotations).
   *
   * Learn more about [test annotations](https://playwright.dev/docs/test-annotations).
   */
  annotations: Array<{
    /**
     * Annotation type, for example `'skip'` or `'fail'`.
     */
    type: string;

    /**
     * Optional description.
     */
    description?: string;
  }>;

  /**
   * Location in the source where the test is defined.
   */
  location: Location;

  /**
   * Whether the test is considered running fine. Non-ok tests fail the test run with non-zero exit code.
   */
  ok(): boolean;

  /**
   * Testing outcome for this test. Note that outcome is not the same as
   * [testResult.status](https://playwright.dev/docs/api/class-testresult#test-result-status):
   * - Test that is expected to fail and actually fails is `'expected'`.
   * - Test that passes on a second retry is `'flaky'`.
   */
  outcome(): "skipped"|"expected"|"unexpected"|"flaky";

  /**
   * Suite this test case belongs to.
   */
  parent: Suite;

  /**
   * Contains the repeat index when running in "repeat each" mode. This mode is enabled by passing `--repeat-each` to the
   * [command line](https://playwright.dev/docs/test-cli).
   */
  repeatEachIndex: number;

  /**
   * Results for each run of this test.
   */
  results: Array<TestResult>;

  /**
   * The maximum number of retries given to this test in the configuration.
   *
   * Learn more about [test retries](https://playwright.dev/docs/test-retries#retries).
   */
  retries: number;

  /**
   * The timeout given to the test. Affected by
   * [testConfig.timeout](https://playwright.dev/docs/api/class-testconfig#test-config-timeout),
   * [testProject.timeout](https://playwright.dev/docs/api/class-testproject#test-project-timeout),
   * [test.setTimeout(timeout)](https://playwright.dev/docs/api/class-test#test-set-timeout),
   * [test.slow()](https://playwright.dev/docs/api/class-test#test-slow-1) and
   * [testInfo.setTimeout(timeout)](https://playwright.dev/docs/api/class-testinfo#test-info-set-timeout).
   */
  timeout: number;

  /**
   * Test title as passed to the [test.(call)(title, testFunction)](https://playwright.dev/docs/api/class-test#test-call)
   * call.
   */
  title: string;

  /**
   * Returns a list of titles from the root down to this test.
   */
  titlePath(): Array<string>;}

/**
 * A result of a single [TestCase] run.
 */
export interface TestResult {
  /**
   * The status of this test result. See also
   * [testCase.expectedStatus](https://playwright.dev/docs/api/class-testcase#test-case-expected-status).
   */
  status: TestStatus;
  /**
   * The list of files or buffers attached during the test execution through
   * [testInfo.attachments](https://playwright.dev/docs/api/class-testinfo#test-info-attachments).
   */
  attachments: Array<{
    /**
     * Attachment name.
     */
    name: string;

    /**
     * Content type of this attachment to properly present in the report, for example `'application/json'` or `'image/png'`.
     */
    contentType: string;

    /**
     * Optional path on the filesystem to the attached file.
     */
    path?: string;

    /**
     * Optional attachment body used instead of a file.
     */
    body?: Buffer;
  }>;

  /**
   * Running time in milliseconds.
   */
  duration: number;

  /**
   * First error thrown during test execution, if any. This is equal to the first element in
   * [testResult.errors](https://playwright.dev/docs/api/class-testresult#test-result-errors).
   */
  error?: TestError;

  /**
   * Errors thrown during the test execution.
   */
  errors: Array<TestError>;

  /**
   * When test is retries multiple times, each retry attempt is given a sequential number.
   *
   * Learn more about [test retries](https://playwright.dev/docs/test-retries#retries).
   */
  retry: number;

  /**
   * Start time of this particular test run.
   */
  startTime: Date;

  /**
   * Anything written to the standard error during the test run.
   */
  stderr: Array<string|Buffer>;

  /**
   * Anything written to the standard output during the test run.
   */
  stdout: Array<string|Buffer>;

  /**
   * List of steps inside this test run.
   */
  steps: Array<TestStep>;

  /**
   * Index of the worker where the test was run. If the test was not run a single time, for example when the user interrupted
   * testing, the only result will have a `workerIndex` equal to `-1`.
   *
   * Learn more about [parallelism and sharding](https://playwright.dev/docs/test-parallel) with Playwright Test.
   */
  workerIndex: number;}

/**
 * Result of the full test run.
 */
export interface FullResult {
  /**
   * Status:
   *   - 'passed' - everything went as expected.
   *   - 'failed' - any test has failed.
   *   - 'timedout' - the global time has been reached.
   *   - 'interrupted' - interrupted by the user.
   */
  status: 'passed' | 'failed' | 'timedout' | 'interrupted';
}

/**
 * Test runner notifies the reporter about various events during test execution. All methods of the reporter are optional.
 *
 * You can create a custom reporter by implementing a class with some of the reporter methods. Make sure to export this
 * class as default.
 *
 * ```ts
 * // my-awesome-reporter.ts
 * import { Reporter } from '@playwright/test/reporter';
 *
 * class MyReporter implements Reporter {
 *   onBegin(config, suite) {
 *     console.log(`Starting the run with ${suite.allTests().length} tests`);
 *   }
 *
 *   onTestBegin(test) {
 *     console.log(`Starting test ${test.title}`);
 *   }
 *
 *   onTestEnd(test, result) {
 *     console.log(`Finished test ${test.title}: ${result.status}`);
 *   }
 *
 *   onEnd(result) {
 *     console.log(`Finished the run: ${result.status}`);
 *   }
 * }
 * export default MyReporter;
 * ```
 *
 * Now use this reporter with [testConfig.reporter](https://playwright.dev/docs/api/class-testconfig#test-config-reporter).
 * Learn more about [using reporters](https://playwright.dev/docs/test-reporters).
 *
 * ```ts
 * // playwright.config.ts
 * import { PlaywrightTestConfig } from '@playwright/test';
 *
 * const config: PlaywrightTestConfig = {
 *   reporter: './my-awesome-reporter.ts',
 * };
 * export default config;
 * ```
 *
 * Here is a typical order of reporter calls:
 * - [reporter.onBegin(config, suite)](https://playwright.dev/docs/api/class-reporter#reporter-on-begin) is called once
 *   with a root suite that contains all other suites and tests. Learn more about [suites hierarchy][Suite].
 * - [reporter.onTestBegin(test, result)](https://playwright.dev/docs/api/class-reporter#reporter-on-test-begin) is
 *   called for each test run. It is given a [TestCase] that is executed, and a [TestResult] that is almost empty. Test
 *   result will be populated while the test runs (for example, with steps and stdio) and will get final `status` once
 *   the test finishes.
 * - [reporter.onStepBegin(test, result, step)](https://playwright.dev/docs/api/class-reporter#reporter-on-step-begin)
 *   and [reporter.onStepEnd(test, result, step)](https://playwright.dev/docs/api/class-reporter#reporter-on-step-end)
 *   are called for each executed step inside the test. When steps are executed, test run has not finished yet.
 * - [reporter.onTestEnd(test, result)](https://playwright.dev/docs/api/class-reporter#reporter-on-test-end) is called
 *   when test run has finished. By this time, [TestResult] is complete and you can use
 *   [testResult.status](https://playwright.dev/docs/api/class-testresult#test-result-status),
 *   [testResult.error](https://playwright.dev/docs/api/class-testresult#test-result-error) and more.
 * - [reporter.onEnd(result)](https://playwright.dev/docs/api/class-reporter#reporter-on-end) is called once after all
 *   tests that should run had finished.
 *
 * Additionally,
 * [reporter.onStdOut(chunk, test, result)](https://playwright.dev/docs/api/class-reporter#reporter-on-std-out) and
 * [reporter.onStdErr(chunk, test, result)](https://playwright.dev/docs/api/class-reporter#reporter-on-std-err) are called
 * when standard output is produced in the worker process, possibly during a test execution, and
 * [reporter.onError(error)](https://playwright.dev/docs/api/class-reporter#reporter-on-error) is called when something
 * went wrong outside of the test execution.
 */
export interface Reporter {
  /**
   * Called once before running tests. All tests have been already discovered and put into a hierarchy of [Suite]s.
   * @param config Resolved configuration.
   * @param suite The root suite that contains all projects, files and test cases.
   */
  onBegin?(config: FullConfig, suite: Suite): void;
  /**
   * Called after all tests has been run, or testing has been interrupted. Note that this method may return a [Promise] and
   * Playwright Test will await it.
   * @param result Result of the full test run. - `'passed'` - Everything went as expected.
   * - `'failed'` - Any test has failed.
   * - `'timedout'` - The
   *   [testConfig.globalTimeout](https://playwright.dev/docs/api/class-testconfig#test-config-global-timeout) has been
   *   reached.
   * - `'interrupted'` - Interrupted by the user.
   */
  onEnd?(result: FullResult): void | Promise<void>;
  /**
   * Called on some global error, for example unhandled exception in the worker process.
   * @param error The error.
   */
  onError?(error: TestError): void;

  /**
   * Called when something has been written to the standard error in the worker process.
   * @param chunk Output chunk.
   * @param test Test that was running. Note that output may happen when no test is running, in which case this will be [void].
   * @param result Result of the test run, this object gets populated while the test runs.
   */
  onStdErr?(chunk: string|Buffer, test: void|TestCase, result: void|TestResult): void;

  /**
   * Called when something has been written to the standard output in the worker process.
   * @param chunk Output chunk.
   * @param test Test that was running. Note that output may happen when no test is running, in which case this will be [void].
   * @param result Result of the test run, this object gets populated while the test runs.
   */
  onStdOut?(chunk: string|Buffer, test: void|TestCase, result: void|TestResult): void;

  /**
   * Called when a test step started in the worker process.
   * @param test Test that the step belongs to.
   * @param result Result of the test run, this object gets populated while the test runs.
   * @param step Test step instance that has started.
   */
  onStepBegin?(test: TestCase, result: TestResult, step: TestStep): void;

  /**
   * Called when a test step finished in the worker process.
   * @param test Test that the step belongs to.
   * @param result Result of the test run.
   * @param step Test step instance that has finished.
   */
  onStepEnd?(test: TestCase, result: TestResult, step: TestStep): void;

  /**
   * Called after a test has been started in the worker process.
   * @param test Test that has been started.
   * @param result Result of the test run, this object gets populated while the test runs.
   */
  onTestBegin?(test: TestCase, result: TestResult): void;

  /**
   * Called after a test has been finished in the worker process.
   * @param test Test that has been finished.
   * @param result Result of the test run.
   */
  onTestEnd?(test: TestCase, result: TestResult): void;

  /**
   * Whether this reporter uses stdio for reporting. When it does not, Playwright Test could add some output to enhance user
   * experience.
   */
  printsToStdio?(): boolean;}

// This is required to not export everything by default. See https://github.com/Microsoft/TypeScript/issues/19545#issuecomment-340490459
export {};


/**
 * Represents a location in the source code where [TestCase] or [Suite] is defined.
 */
export interface Location {
  /**
   * Path to the source file.
   */
  file: string;

  /**
   * Line number in the source file.
   */
  line: number;

  /**
   * Column number in the source file.
   */
  column: number;
}

/**
 * Represents a step in the [TestRun].
 */
export interface TestStep {
  /**
   * Step category to differentiate steps with different origin and verbosity. Built-in categories are:
   * - `hook` for fixtures and hooks initialization and teardown
   * - `expect` for expect calls
   * - `pw:api` for Playwright API calls.
   * - `test.step` for test.step API calls.
   */
  category: string;

  /**
   * Running time in milliseconds.
   */
  duration: number;

  /**
   * Optional location in the source where the step is defined.
   */
  location?: Location;

  /**
   * Error thrown during the step execution, if any.
   */
  error?: TestError;

  /**
   * Parent step, if any.
   */
  parent?: TestStep;

  /**
   * Start time of this particular test step.
   */
  startTime: Date;

  /**
   * List of steps inside this step.
   */
  steps: Array<TestStep>;

  /**
   * User-friendly test step title.
   */
  title: string;

  /**
   * Returns a list of step titles from the root step down to this step.
   */
  titlePath(): Array<string>;
}


