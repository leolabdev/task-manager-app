import bcrypt from "bcrypt";

// export async function hashPassword(password: string): Promise<string> {
//     const saltRounds = 10;
//
//     // const hashedPassword = await new Promise((resolve, reject) => {
//     //     bcrypt.hash(password, saltRounds, function(err, hash) {
//     //         if (err) reject(err)
//     //         resolve(hash)
//     //     });
//     // })
//     //
//     // return hashedPassword
//
// }
export const hashPassword = async function(password: string){
    const saltRounds = 10;
    return  await bcrypt.hash(password,10);
}
