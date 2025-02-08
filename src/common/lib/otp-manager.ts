import { OtpTypesEnum } from "../types"
import { hashPassword } from "./cryptography";

export const generateOtp = async (key: string, salt: string) => {
    const str = `${key}${'super-secret'}${OtpTypesEnum.REGISTER}${Math.floor(Date.now() / (3 * 60 * 1000))}`;
    const hash = await hashPassword(str, salt);
    return hash.slice(0, 6);
}
