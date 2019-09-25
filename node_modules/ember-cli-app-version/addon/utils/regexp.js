export const versionRegExp = /\d+[.]\d+[.]\d+/;	// Match any number of 3 sections of digits separated by .
export const versionExtendedRegExp = /\d+[.]\d+[.]\d+-[a-z]*([.]\d+)?/;	// Match the above but also hyphen followed by any number of lowercase letters, then optionally period and digits
export const shaRegExp = /[a-z\d]{8}$/;	// Match 8 lowercase letters and digits, at the end of the string only (to avoid matching with version extended part)
