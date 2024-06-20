export class UserMovieRatingAlreadyExistsError extends Error {
    constructor() {
        super('User movie rating already exists.')
    }
}