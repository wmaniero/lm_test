import { IFontWeights } from '../../style/styledType';

export const isFamilyObject = (fontFamily: IFontWeights | string): fontFamily is IFontWeights => typeof (fontFamily as object) === 'object';
