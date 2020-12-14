export default class Organ {
    constructor(readonly name: string, readonly value: number, readonly doseMax?: number) {
    }
}

export const ALL_ORGANS = [
    new Organ("cartilage", 1),
    new Organ("cœur", 3, 35),
    new Organ("foie", 1, 26),
    new Organ("grêle", 2, 50),
    new Organ("moelle", 2, 45),
    new Organ("ovaire", 1),
    new Organ("œil", 1, 35),
    new Organ("os", 3),
    new Organ("parotide", 2, 30),
    new Organ("poumon", 3),
    new Organ("rein", 3, 20),
    new Organ("rectum", 5),
    new Organ("système nerveux", 3),
    new Organ("testicule", 1),
    new Organ("thyroïde", 3),
    new Organ("tronc cérébral", 3, 50),
    new Organ("vessie", 2),
]