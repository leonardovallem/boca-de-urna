export default class Party {
    name: string
    initials: string
    number: number
    picture: string | null
    primaryColor: string
    secondaryColor: string

    constructor(name: string, initials: string, number: number, picture: string | null, primaryColor: string, secondaryColor: string) {
        this.name = name
        this.initials = initials
        this.number = number
        this.picture = picture
        this.primaryColor = primaryColor
        this.secondaryColor = secondaryColor
    }
}