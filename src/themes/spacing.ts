import { moderateScale } from '@common/index';
import { Spacing } from './type';
export const SpacingDefault: Spacing = {
    none: 0,
    tiny: moderateScale(4),
    smaller: moderateScale(8),
    small: moderateScale(12),
    normal: moderateScale(16),
    large: moderateScale(20),
    medium: moderateScale(24),
    big: moderateScale(28),
    mediumPlush: moderateScale(32),
    huge: moderateScale(48),
    massive: moderateScale(52),
};
export type SpacingType = keyof typeof SpacingDefault;
