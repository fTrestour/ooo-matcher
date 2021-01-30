/** Declaration file generated by dts-gen */

declare module "logic-solver" {
  export class AndFormula {
    constructor(operands: any);

    generateClauses(isTrue: any, t: any): any;
  }

  export class Assumption {
    constructor(formula: any);

    generateClauses(isTrue: any, t: any): any;
  }

  export class AtMostOneFormula {
    constructor(operands: any);

    generateClauses(isTrue: any, t: any): any;
  }

  export class Clause {
    constructor(...args: any[]);

    append(...args: any[]): any;
  }

  export class EqualBitsFormula {
    constructor(bits1: any, bits2: any, ...args: any[]);

    generateClauses(isTrue: any, t: any): any;
  }

  export class EquivFormula {
    constructor(A: any, B: any, ...args: any[]);

    generateClauses(isTrue: any, t: any): any;
  }

  export class ExactlyOneFormula {
    constructor(operands: any);

    generateClauses(isTrue: any, t: any): any;
  }

  export class Formula {
    constructor();

    generateClauses(isTrue: any, termifier: any): void;

    guid(): any;
  }

  export class FullAdderCarry {
    constructor(formula1: any, formula2: any, formula3: any, ...args: any[]);

    generateClauses(isTrue: any, t: any): any;
  }

  export class FullAdderSum {
    constructor(formula1: any, formula2: any, formula3: any, ...args: any[]);

    generateClauses(isTrue: any, t: any): any;
  }

  export class HalfAdderCarry {
    constructor(formula1: any, formula2: any, ...args: any[]);

    generateClauses(isTrue: any, t: any): any;
  }

  export class HalfAdderSum {
    constructor(formula1: any, formula2: any, ...args: any[]);

    generateClauses(isTrue: any, t: any): any;
  }

  export class ImpliesFormula {
    constructor(A: any, B: any, ...args: any[]);

    generateClauses(isTrue: any, t: any): any;
  }

  export class LessThanFormula {
    constructor(bits1: any, bits2: any, ...args: any[]);

    generateClauses(isTrue: any, t: any): any;
  }

  export class LessThanOrEqualFormula {
    constructor(bits1: any, bits2: any, ...args: any[]);

    generateClauses(isTrue: any, t: any): any;
  }

  export class OrFormula {
    constructor(operands: any);

    generateClauses(isTrue: any, t: any): any;
  }

  export class Solution {
    constructor(_solver: any, _assignment: any);

    evaluate(formulaOrBits: any): any;

    getFormula(): any;

    getMap(): any;

    getTrueVars(): string[];

    getWeightedSum(formulas: any, weights: any): any;

    ignoreUnknownVariables(): void;
  }

  export class Solver {
    constructor();

    forbid(...args: any[]): void;

    getVarName(vnum: any): any;

    getVarNum(vname: any, noCreate: any): any;

    maximizeWeightedSum(
      solution: any,
      costTerms: any,
      costWeights: any,
      options: any
    ): any;

    minimizeWeightedSum(
      solution: any,
      costTerms: any,
      costWeights: any,
      options: any
    ): any;

    require(...args: any[]): void;

    solve(): Solution | null;

    solveAssuming(formula: any): any;

    toNameTerm(t: any): any;

    toNumTerm(t: any, noCreate: any): any;
  }

  export class Termifier {
    constructor(solver: any);

    clause(...args: any[]): any;

    generate(isTrue: any, formula: any): any;

    term(formula: any): any;
  }

  export class XorFormula {
    constructor(operands: any);

    generateClauses(isTrue: any, t: any): any;
  }

  export const FALSE: string;

  export const NAME_FALSE: string;

  export const NAME_TRUE: string;

  export const NUM_FALSE: number;

  export const NUM_TRUE: number;

  export const TRUE: string;

  export function Bits(formulaArray: any): void;

  export function NotFormula(operand: any): void;

  export function and(...args: any[]): any;

  export function atMostOne(...args: any[]): any;

  export function constantBits(wholeNumber: any): any;

  export function disablingAssertions(f: any): any;

  export function equalBits(bits1: any, bits2: any): any;

  export function equiv(A: any, B: any, ...args: any[]): any;

  export function exactlyOne(...args: any[]): any;

  export function greaterThan(bits1: any, bits2: any): any;

  export function greaterThanOrEqual(bits1: any, bits2: any): any;

  export function implies(A: any, B: any, ...args: any[]): any;

  export function isBits(x: any): any;

  export function isClause(x: any): any;

  export function isFormula(x: any): any;

  export function isNameTerm(x: any): any;

  export function isNumTerm(x: any): any;

  export function isTerm(x: any): any;

  export function isWholeNumber(x: any): any;

  export function lessThan(bits1: any, bits2: any): any;

  export function lessThanOrEqual(bits1: any, bits2: any): any;

  export function not(operand: any): any;

  export function or(...args: any[]): any;

  export function sum(...args: any[]): any;

  export function variableBits(baseName: any, nbits: any): any;

  export function weightedSum(formulas: any, weights: any): any;

  export function xor(...args: any[]): any;

  export namespace isBits {
    const description: string;
  }

  export namespace isClause {
    const description: string;
  }

  export namespace isFormula {
    const description: string;
  }

  export namespace isNameTerm {
    const description: string;
  }

  export namespace isNumTerm {
    const description: string;
  }

  export namespace isTerm {
    const description: string;
  }

  export namespace isWholeNumber {
    const description: string;
  }
}